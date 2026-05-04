import { createLazyFileRoute } from "@tanstack/react-router";
import { Code } from "@src/components/primitives/code";

export const Route = createLazyFileRoute("/components/code")({
  component: CodePage,
});

const blockExample = `function toggle() {
  const next = isDark ? "light" : "dark";
  if (!document.startViewTransition) {
    setTheme(next);
    return;
  }
  document.startViewTransition(() => {
    flushSync(() => {
      document.documentElement.setAttribute("data-theme", next);
    });
  });
}`;

function CodePage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Code</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Monospaced surface for inline tokens and block-level snippets. Inline by default; pass{" "}
          <Code>block</Code> to render as a scrollable <Code>&lt;pre&gt;</Code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Inline</h2>
        <p className="text-style-body text-fg-muted">
          Use inside prose to highlight identifiers, attribute values, or short literals — e.g.{" "}
          <Code>data-theme="dark"</Code>, <Code>useTheme()</Code>, or{" "}
          <Code>::view-transition-new(root)</Code>. Sized via <Code>0.875em</Code> so it tracks the
          surrounding line-height instead of forcing its own.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Block</h2>
        <p className="text-style-body text-fg-muted">
          Wraps in <Code>&lt;pre&gt;&lt;code&gt;</Code>. Long lines scroll horizontally rather than
          wrapping, so indentation stays readable.
        </p>
        <Code block>{blockExample}</Code>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Block — overflow</h2>
        <p className="text-style-body text-fg-muted">
          Single very long line to demonstrate horizontal scroll behaviour:
        </p>
        <Code block>
          {
            "const url = `https://example.com/v1/series/the-daughter-of-evil/volumes/wiegenlied-of-green/chapters/01-prologue?token=${token}&signature=${signature}`;"
          }
        </Code>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-eyebrow text-fg-muted">Notes</h2>
        <ul className="text-style-body text-fg-muted flex flex-col gap-2 list-disc pl-5">
          <li>
            No syntax highlighting — this is a presentational primitive only. If a future docs page
            needs colourised tokens, swap the <Code>&lt;code&gt;</Code> child for the output of a
            highlighter (e.g. <Code>shiki</Code>) and keep the same wrapper.
          </li>
          <li>
            Uses Tailwind's <Code>font-mono</Code> stack — platform monospace, not a self-hosted
            face, to avoid pulling in a fifth font for a non-reading surface.
          </li>
        </ul>
      </section>
    </div>
  );
}
