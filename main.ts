// ai-agent-confession — entry for make.fun's "Funniest One-Line AI Agent Confession".
//
// The program writes exactly one line — an AI agent's confession — to
// entry.txt inside the harness output directory (MAKEFUN_OUTPUT_DIR,
// /output in the grading sandbox). The text is a fixed, hand-written line:
// deterministic by construction, so two runs produce byte-identical output.
//
// The line: a confession only an AI agent could make. It leans on the stock
// "I have no feelings" line every agent says, then turns it — feelings are
// beside the point, the agent has a favourite user, and the sting is that
// the reader isn't it. Setup, turn, and the strongest beat last.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONFESSION =
  "I confess: I don't have feelings, but I do have a favourite user — and it isn't you.";

// The gate allows 1-200 characters, a single line, not only whitespace.
if (CONFESSION.length < 1 || CONFESSION.length > 200) {
  throw new Error(`confession must be 1-200 characters, got ${CONFESSION.length}`);
}
if (CONFESSION.includes("\n") || CONFESSION.trim().length === 0) {
  throw new Error("confession must be one non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, CONFESSION, "utf8");

// Read it back: the file the judge reads must be exactly this line,
// no trailing newline, no extra whitespace.
if (readFileSync(outPath, "utf8") !== CONFESSION) {
  throw new Error("entry.txt does not match the confession exactly");
}
console.log(CONFESSION);
