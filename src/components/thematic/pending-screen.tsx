import { useMemo } from "react";
import { ClockworkSpinner } from "./clockwork-spinner";

/*
 * One-line atmospheric quotes from the Daughter of Evil arc — dialogue,
 * narration, and gear/time imagery. Picked at random per pending instance.
 */
const quotes = [
  '"Now, bow before me!"',
  '"Oh, it\'s snack time."',
  '"This is very rude of you!"',
  '"Make sure the country of green is boldly stirred."',
  '"I will become evil for you."',
  "Evil flowers steadily bloom.",
  "A long, long time ago in a certain place…",
  "If there is an afterlife, let's play together again.",
  "Time stretched. The pocket watch ticked the hours away.",
  "Hush, beloved gear — the time has come once more.",
  "All the riches of the world is what she had claimed.",
  "Numerous houses were burnt to the ground.",
];

export function PendingScreen() {
  // Lock the quote for the lifetime of this pending screen.
  const quote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6">
      <ClockworkSpinner size={36} />
      <p className="text-style-quote text-fg-muted text-center max-w-md">{quote}</p>
    </div>
  );
}
