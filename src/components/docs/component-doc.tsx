import ReactMarkdown, { type Components } from "react-markdown";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { Accordion } from "@src/components/primitives/accordion";
import { Code } from "@src/components/primitives/code";
import { cn } from "@src/lib/cn";

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

// Identifiers made available to JSX in `tsx preview` markdown fences. Anything
// referenced by the example code (Button, Link, helper arrays, etc.) must be
// passed in here.
export type DocScope = Record<string, unknown>;

type ComponentDocProps = {
  // Path under `public/` to the markdown source. e.g. "design-system/components/button.md"
  path: string;
  scope: DocScope;
};

export function ComponentDoc({ path, scope }: ComponentDocProps) {
  const markdown = useMarkdown(path);
  if (markdown === null) return null;
  return <ComponentDocBody markdown={markdown} scope={scope} />;
}

function ComponentDocBody({ markdown, scope }: { markdown: string; scope: DocScope }) {
  const { header, sections } = useMemo(() => splitDocument(markdown), [markdown]);
  const tocItems = useMemo(() => buildToc(markdown), [markdown]);

  return (
    <div className="flex items-start gap-12">
      <article className="flex-1 min-w-0 flex flex-col gap-14">
        {header ? (
          <header className="flex flex-col gap-4">
            <RenderBody body={header} scope={scope} headerLead />
          </header>
        ) : null}
        {sections.map((section) => {
          const key = section.heading.toLowerCase();
          if (key === "examples") {
            return <ExamplesSection key={section.id} section={section} scope={scope} />;
          }
          if (key === "props") {
            return <PropsSection key={section.id} section={section} scope={scope} />;
          }
          return (
            <section key={section.id} id={section.id} className="flex flex-col gap-4 scroll-mt-12">
              <h2 className="text-style-heading-3 text-fg">{section.heading}</h2>
              <RenderBody body={section.body} scope={scope} />
            </section>
          );
        })}
      </article>
      <Toc items={tocItems} />
    </div>
  );
}

function useMarkdown(path: string) {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const url = `${import.meta.env.BASE_URL}${path}`;
    fetch(url)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`${r.status} ${url}`))))
      .then((t) => {
        if (!cancelled) setText(t);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        console.error("Failed to load component doc:", err);
        setText("# Failed to load\n\nThe documentation source could not be fetched.");
      });
    return () => {
      cancelled = true;
    };
  }, [path]);
  return text;
}

// -----------------------------------------------------------------------------
// Parsing
// -----------------------------------------------------------------------------

type DocSection = { id: string; heading: string; body: string };

type Block =
  | { kind: "markdown"; text: string }
  | { kind: "fence"; lang: string; meta: string; code: string };

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Splits markdown text by code fences. Tracks a single-state "in fence" flag
// so headings inside fences don't trigger heading-based section splitting.
function splitFences(text: string): Block[] {
  const lines = text.split("\n");
  const blocks: Block[] = [];
  let buffer: string[] = [];
  let fence: { lang: string; meta: string; lines: string[] } | null = null;

  const flushMarkdown = () => {
    if (buffer.length === 0) return;
    blocks.push({ kind: "markdown", text: buffer.join("\n") });
    buffer = [];
  };

  for (const line of lines) {
    if (fence) {
      if (line.trim().startsWith("```")) {
        blocks.push({
          kind: "fence",
          lang: fence.lang,
          meta: fence.meta,
          code: fence.lines.join("\n"),
        });
        fence = null;
      } else {
        fence.lines.push(line);
      }
    } else {
      const m = /^```(\w*)\s*(.*)$/.exec(line);
      if (m) {
        flushMarkdown();
        fence = { lang: m[1] ?? "", meta: (m[2] ?? "").trim(), lines: [] };
      } else {
        buffer.push(line);
      }
    }
  }
  flushMarkdown();
  return blocks;
}

// Splits markdown by ATX heading at the given level. Returns the intro
// (everything before the first matching heading) plus one entry per heading.
// Fence-aware so fenced "## ..." lines aren't treated as headings.
function splitByHeading(text: string, level: 2 | 3) {
  const prefix = "#".repeat(level) + " ";
  const lines = text.split("\n");
  const items: DocSection[] = [];
  const introLines: string[] = [];
  let currentLines: string[] | null = null;
  let currentHeading = "";
  let inFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    if (!inFence && line.startsWith(prefix)) {
      if (currentLines !== null) {
        items.push({
          id: slugify(currentHeading),
          heading: currentHeading,
          body: currentLines.join("\n").trim(),
        });
      }
      currentHeading = line.slice(prefix.length).trim();
      currentLines = [];
    } else if (currentLines === null) {
      introLines.push(line);
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines !== null) {
    items.push({
      id: slugify(currentHeading),
      heading: currentHeading,
      body: currentLines.join("\n").trim(),
    });
  }
  return { intro: introLines.join("\n").trim(), items };
}

function splitDocument(md: string) {
  const { intro, items } = splitByHeading(md, 2);
  return { header: intro, sections: items };
}

type TocItem = { id: string; label: string; level: 2 | 3 };

function buildToc(md: string): TocItem[] {
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of md.split("\n")) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    if (line.startsWith("## ")) {
      const heading = line.slice(3).trim();
      items.push({ id: slugify(heading), label: heading, level: 2 });
    } else if (line.startsWith("### ")) {
      const heading = line.slice(4).trim();
      items.push({ id: slugify(heading), label: heading, level: 3 });
    }
  }
  return items;
}

// -----------------------------------------------------------------------------
// Rendering
// -----------------------------------------------------------------------------

function flattenText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { value?: string; children?: unknown[] };
  if (typeof n.value === "string") return n.value;
  if (Array.isArray(n.children)) return n.children.map(flattenText).join("");
  return "";
}

const proseComponents: Components = {
  h1: ({ children }) => <h1 className="text-style-heading-1 text-fg">{children}</h1>,
  h3: ({ children, node }) => {
    const id = node ? slugify(flattenText(node)) : undefined;
    return (
      <h3 id={id} className="text-style-eyebrow text-fg-muted scroll-mt-12 mt-2">
        {children}
      </h3>
    );
  },
  h4: ({ children, node }) => {
    const id = node ? slugify(flattenText(node)) : undefined;
    return (
      <h4 id={id} className="text-style-heading-4 text-fg scroll-mt-12 mt-2">
        {children}
      </h4>
    );
  },
  p: ({ children }) => <p className="text-style-body text-fg-muted">{children}</p>,
  ul: ({ children }) => (
    <ul className="text-style-body text-fg-muted flex flex-col gap-2 list-disc pl-5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="text-style-body text-fg-muted flex flex-col gap-2 list-decimal pl-5">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="text-style-lead text-fg-muted">{children}</blockquote>
  ),
  strong: ({ children }) => <strong className="font-medium text-fg">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ className, children }) => {
    // Fenced code blocks are pre-extracted by splitFences before react-markdown
    // sees the content, so this branch only runs for inline-code spans.
    if (className?.includes("language-")) {
      const text = typeof children === "string" ? children.replace(/\n$/, "") : "";
      return <Code block>{text}</Code>;
    }
    return <Code>{children}</Code>;
  },
};

const headerProseComponents: Components = {
  ...proseComponents,
  // The first paragraph in the header reads as the page lead.
  p: ({ children }) => <p className="text-style-lead text-fg-muted">{children}</p>,
};

function MarkdownProse({ children, headerLead }: { children: string; headerLead?: boolean }) {
  return (
    <ReactMarkdown components={headerLead ? headerProseComponents : proseComponents}>
      {children}
    </ReactMarkdown>
  );
}

function RenderBody({
  body,
  scope,
  headerLead,
}: {
  body: string;
  scope: DocScope;
  headerLead?: boolean;
}) {
  const blocks = splitFences(body);
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) => {
        if (block.kind === "markdown") {
          if (!block.text.trim()) return null;
          return (
            <MarkdownProse key={i} headerLead={headerLead}>
              {block.text}
            </MarkdownProse>
          );
        }
        return <FenceBlock key={i} block={block} scope={scope} />;
      })}
    </div>
  );
}

function FenceBlock({
  block,
  scope,
}: {
  block: Extract<Block, { kind: "fence" }>;
  scope: DocScope;
}) {
  const { lang, meta, code } = block;
  const metaTokens = meta.split(/\s+/).filter(Boolean);

  if (metaTokens.includes("preview")) {
    return <LiveExample code={code} scope={scope} />;
  }

  if (lang === "json" && meta === "props") {
    return <PropsTable rows={parseJson(code) as PropRow[]} />;
  }
  if (lang === "json" && meta === "keyboard") {
    return <KeyboardTable rows={parseJson(code) as KeyRow[]} />;
  }
  if (lang === "json" && meta === "data-attributes") {
    return <DataAttributesTable rows={parseJson(code) as DataAttrRow[]} />;
  }

  return <Code block>{code}</Code>;
}

// Wraps the code in a fragment so multiple sibling JSX elements can live in one
// fence. `transformCode` runs after the user code; we use it to wrap once,
// before sucrase compiles the JSX.
function LiveExample({ code, scope }: { code: string; scope: DocScope }) {
  return (
    <LiveProvider code={code} scope={scope} transformCode={(c) => `<>${c}</>`}>
      <div className="flex flex-col gap-3">
        <Preview>
          <LivePreview className="flex flex-wrap items-center gap-3" />
        </Preview>
        <Code block>{code}</Code>
        <LiveError className="text-sm font-mono text-[color:var(--color-accent-strong)] whitespace-pre-wrap" />
      </div>
    </LiveProvider>
  );
}

function parseJson(code: string): unknown {
  try {
    return JSON.parse(code);
  } catch {
    return [];
  }
}

// -----------------------------------------------------------------------------
// Special sections: Examples (accordion), Props (subcomponent blocks)
// -----------------------------------------------------------------------------

function ExamplesSection({ section, scope }: { section: DocSection; scope: DocScope }) {
  const { intro, items } = useMemo(() => splitByHeading(section.body, 3), [section.body]);
  const firstId = items[0]?.id;

  return (
    <section id={section.id} className="flex flex-col gap-4 scroll-mt-12">
      <h2 className="text-style-heading-3 text-fg">{section.heading}</h2>
      {intro ? <RenderBody body={intro} scope={scope} /> : null}
      <Accordion defaultValue={firstId ? [firstId] : []}>
        {items.map((item) => (
          <Accordion.Item key={item.id} value={item.id} id={item.id} className="scroll-mt-12">
            <Accordion.Header>
              <Accordion.Trigger>{item.heading}</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>
              <RenderBody body={item.body} scope={scope} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
}

function PropsSection({ section, scope }: { section: DocSection; scope: DocScope }) {
  const { intro, items } = useMemo(() => splitByHeading(section.body, 3), [section.body]);

  return (
    <section id={section.id} className="flex flex-col gap-8 scroll-mt-12">
      <h2 className="text-style-heading-3 text-fg">{section.heading}</h2>
      {intro ? <RenderBody body={intro} scope={scope} /> : null}
      {items.map((item) => (
        <div key={item.id} id={item.id} className="flex flex-col gap-3 scroll-mt-12">
          <h3 className="text-style-heading-4 text-fg">{item.heading}</h3>
          <RenderBody body={item.body} scope={scope} />
        </div>
      ))}
    </section>
  );
}

// -----------------------------------------------------------------------------
// Tables / Preview / ToC
// -----------------------------------------------------------------------------

function Preview({ children }: { children: ReactNode }) {
  return <div className="border border-border rounded-sm p-6 bg-bg">{children}</div>;
}

type PropRow = { prop: string; type: string; default: string; description: string };

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-border">
      <table className="w-full border-collapse text-style-body text-fg">
        <thead>
          <tr className="border-b border-border bg-surface">
            <Th>Prop</Th>
            <Th>Type</Th>
            <Th>Default</Th>
            <Th>Description</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.prop} className="border-b border-border last:border-b-0 align-top">
              <td className="px-4 py-3">
                <Code>{r.prop}</Code>
              </td>
              <td className="px-4 py-3">
                <Code>{r.type}</Code>
              </td>
              <td className="px-4 py-3">
                {r.default && r.default !== "—" ? (
                  <Code>{r.default}</Code>
                ) : (
                  <span className="text-fg-muted">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-fg-muted">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type DataAttrRow = { attribute: string; description: string };

function DataAttributesTable({ rows }: { rows: DataAttrRow[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-border">
      <table className="w-full border-collapse text-style-body text-fg">
        <thead>
          <tr className="border-b border-border bg-surface">
            <Th className="w-60">Attribute</Th>
            <Th>Description</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.attribute} className="border-b border-border last:border-b-0 align-top">
              <td className="px-4 py-3">
                <Code>{r.attribute}</Code>
              </td>
              <td className="px-4 py-3 text-fg-muted">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type KeyRow = { keys: string[]; description: string };

function KeyboardTable({ rows }: { rows: KeyRow[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-border">
      <table className="w-full border-collapse text-style-body text-fg">
        <thead>
          <tr className="border-b border-border bg-surface">
            <Th className="w-40">Keys</Th>
            <Th>Description</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.keys.join("+")} className="border-b border-border last:border-b-0 align-top">
              <td className="px-4 py-3">
                <span className="flex flex-wrap gap-1">
                  {r.keys.map((k) => (
                    <kbd
                      key={k}
                      className="inline-flex items-center justify-center font-mono text-xs px-2 py-0.5 rounded-sm border border-border bg-surface text-fg"
                    >
                      {k}
                    </kbd>
                  ))}
                </span>
              </td>
              <td className="px-4 py-3 text-fg-muted">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th
      className={cn("text-style-eyebrow text-fg-muted text-left px-4 py-2 font-normal", className)}
    >
      {children}
    </th>
  );
}

function Toc({ items }: { items: TocItem[] }) {
  return (
    <nav
      aria-label="On this page"
      className="hidden lg:flex w-48 shrink-0 sticky top-12 self-start flex-col gap-1"
    >
      <span className="text-style-eyebrow text-fg-muted mb-2">On this page</span>
      {items.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className={cn(
            "text-sm text-fg-muted hover:text-fg transition-colors py-0.5",
            "outline-accent outline-offset-2 focus-visible:outline-2 rounded-sm",
            it.level === 3 && "pl-3",
          )}
        >
          {it.label}
        </a>
      ))}
    </nav>
  );
}
