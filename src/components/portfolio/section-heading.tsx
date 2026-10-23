"use client";

import { Reveal } from "./reveal";

export function SectionHeading({
  number,
  kicker,
  title,
  description,
  align = "left",
}: {
  number: string;
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      direction="up"
      className={align === "center" ? "text-center" : "text-left"}
    >
      <div
        className={`flex items-center gap-2.5 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="font-mono text-xs font-semibold tracking-widest text-brand">
          {number}.
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {kicker}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-brand to-transparent" />
      </div>
      <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px] ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
