"use client";

import { useEffect, useState } from "react";

/** Typewriter that cycles through phrases, with blinking caret. */
export function TypingText({
  words,
  typeSpeed = 68,
  deleteSpeed = 34,
  holdTime = 1700,
  className,
}: {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      // hold the full word, then start deleting
      t = setTimeout(() => setDeleting(true), holdTime);
    } else if (deleting && text === "") {
      // word fully deleted — advance to the next word
      t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, deleteSpeed);
    } else {
      t = setTimeout(
        () =>
          setText(
            deleting
              ? word.slice(0, text.length - 1)
              : word.slice(0, text.length + 1)
          ),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, holdTime]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span
        aria-hidden
        className="ml-1 inline-block h-[1em] w-[3px] translate-y-[0.12em] animate-caret rounded-full bg-brand align-baseline"
      />
    </span>
  );
}
