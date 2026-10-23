"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Token = { t: string; c: string };

/* Syntax palette (always-dark editor, independent of site theme) */
const K = "#c792ea"; // keywords
const T = "#82aaff"; // types
const S = "#c3e88d"; // strings
const C = "#5c6773"; // comments
const M = "#ffcb6b"; // methods
const P = "#89ddff"; // punctuation
const N = "#f78c6c"; // numbers
const V = "#eeffff"; // identifiers

const CODE: Token[][] = [
  [{ t: "public class", c: K }, { t: " AdarshGupta ", c: T }, { t: ": ", c: P }, { t: "Developer", c: T }],
  [{ t: "{", c: P }],
  [{ t: "    public string", c: K }, { t: " Role ", c: V }, { t: "=> ", c: P }, { t: '"Full Stack & .NET"', c: S }, { t: ";", c: P }],
  [{ t: "    public string", c: K }, { t: "[]", c: P }, { t: " Stack ", c: V }, { t: "= { ", c: P }, { t: '"C#"', c: S }, { t: ", ", c: P }, { t: '"React"', c: S }, { t: " };", c: P }],
  [],
  [{ t: "    public override void", c: K }, { t: " Build", c: M }, { t: "(", c: P }, { t: "Idea", c: T }, { t: " idea)", c: V }],
  [{ t: "    {", c: P }],
  [{ t: "        var", c: K }, { t: " app ", c: V }, { t: "= ", c: P }, { t: "Craft", c: M }, { t: "(idea)", c: V }],
  [{ t: "            .WithCleanCode()", c: M }],
  [{ t: "            .WithGreatUI();", c: M }],
  [{ t: "        Deploy", c: M }, { t: "(app); ", c: V }, { t: "// ship it!", c: C }],
  [{ t: "    }", c: P }],
  [{ t: "}", c: P }],
];

const LINE_MS = 340;
const HOLD_MS = 4200;

export function CodeWindow() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const total = CODE.length;
    let timer: ReturnType<typeof setTimeout>;
    if (visible < total) {
      timer = setTimeout(() => setVisible((v) => v + 1), LINE_MS);
    } else {
      timer = setTimeout(() => setVisible(0), HOLD_MS);
    }
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, rotate: -0.5 }}
      className="relative w-full min-w-0 max-w-xl"
    >
      {/* glow under the window */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,var(--brand-soft),transparent)] blur-xl" />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e1420] shadow-2xl shadow-black/40">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] bg-[#111827] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <span className="inline-block h-3 w-3 rounded-[3px] bg-[#512BD4]" />
            AdarshGupta.cs
          </span>
          <span className="ml-auto hidden rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300 sm:block">
            ● build passing
          </span>
        </div>

        {/* code body */}
        <div className="min-h-[336px] overflow-x-auto p-5 font-mono text-[12.5px] leading-6 sm:text-[13.5px]">
          {CODE.slice(0, visible).map((tokens, i) => (
            <motion.div
              key={`${i}-${visible === 0 ? "loop" : "run"}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex whitespace-pre"
            >
              <span className="w-7 select-none pr-3 text-right text-slate-600">{i + 1}</span>
              <span>
                {tokens.map((tok, j) => (
                  <span key={j} style={{ color: tok.c }}>
                    {tok.t}
                  </span>
                ))}
                {i === visible - 1 && visible <= CODE.length && (
                  <span className="ml-0.5 inline-block h-4 w-[7px] animate-caret bg-slate-300 align-middle" />
                )}
              </span>
            </motion.div>
          ))}
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between border-t border-white/[0.07] bg-[#111827] px-4 py-2 font-mono text-[10px] text-slate-500">
          <span>C# 12 · .NET 8</span>
          <span className="flex items-center gap-3">
            <span>UTF-8</span>
            <span className="text-[#ffcb6b]">Ln {visible}, Col 1</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
