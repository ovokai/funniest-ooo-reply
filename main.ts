// Funniest One-Line Out-of-Office Reply — make.fun entry.
// Writes a single one-line out-of-office auto-reply to /output/entry.txt.
// Node standard library only; no dependencies.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "Out of office until Monday. Fair warning: when I get back, this email joins 4,000 others I will also never read.";

// The competition gate accepts UTF-8 text of 1 to 160 characters on one line.
// Fail loudly here rather than emit an entry the scorer would mark invalid.
function checkLine(line: string): void {
  if (line.length < 1 || line.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.trim().length === 0) {
    throw new Error("entry must be a single non-blank line");
  }
}

function main(): void {
  checkLine(LINE);
  try {
    mkdirSync("/output", { recursive: true });
    writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
  } catch {
    // Fallback for local runs where /output is not writable.
    const here = dirname(fileURLToPath(import.meta.url));
    writeFileSync(join(here, "entry.txt"), LINE + "\n", "utf8");
  }
  console.log(LINE);
}

main();
