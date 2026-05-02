import { Link as BaseLink } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ComponentProps, JSX } from "react";
import { cn } from "@src/lib/cn";

/**
 * Routing-aware link with the design system's focus treatment baked in.
 *
 * Two shapes:
 * - Internal: pass `to` (and any TanStack Router prop — `params`, `search`,
 *   `activeOptions`, `preload`, `mask`, etc.). Renders TanStack `<Link>` so
 *   client-side navigation kicks in.
 * - External: pass `href` (no `to`). Renders a plain `<a>`. Add{" "}
 *   `target="_blank" rel="noopener noreferrer"` on the call site.
 *
 * Visuals (color, hover, layout) are intentionally left to the caller — the
 * primitive only owns transitions and a focus-visible outline keyed to the
 * local `--accent`. The outline lives on the element box (not text-decoration)
 * so it draws a single rectangle around card-wrapping links instead of
 * cascading through every nested text node — and it cascades cleanly under
 * `[data-sin]` because it reads `--color-accent` at the using element.
 */
type RouterLinkProps = ComponentProps<typeof BaseLink>;
type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  to?: never;
};
type Props = RouterLinkProps | ExternalLinkProps;

const base = [
  "transition-colors duration-150 rounded-sm",
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
].join(" ");

function isExternal(props: Props): props is ExternalLinkProps {
  return !("to" in props) && "href" in props;
}

export function Link(props: RouterLinkProps): JSX.Element;
export function Link(props: ExternalLinkProps): JSX.Element;
export function Link(props: Props): JSX.Element {
  if (isExternal(props)) {
    const { className, ...rest } = props;
    return <a className={cn(base, className)} {...rest} />;
  }
  const { className, ...rest } = props;
  return <BaseLink className={cn(base, className)} {...rest} />;
}
