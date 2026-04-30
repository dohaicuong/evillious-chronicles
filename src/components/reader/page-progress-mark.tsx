import { useEffect, useRef, type ReactNode } from "react";
import { bumpChapterProgress } from "../../lib/progress";

type Props = {
  chapterId: string;
  pageIndex: number;
  totalPages: number;
  children: ReactNode;
};

/*
 * Wraps a single rendered page. When the page is more than half-scrolled
 * past the viewport top, marks `pageIndex + 1` as the highest page reached
 * for this chapter. Self-disconnects after firing — we only need the first
 * "user reached this page" signal.
 */
export function PageProgressMark({ chapterId, pageIndex, totalPages, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void bumpChapterProgress(chapterId, pageIndex + 1, totalPages);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [chapterId, pageIndex, totalPages]);

  return <div ref={ref}>{children}</div>;
}
