import { validateAgainst } from "./string/mod.ts";

const ws = Deno.args[0];

const base = ["string", "geo", "http", "number", "perf", "entity"] as const;

if (!validateAgainst(ws, [...base, "*"])) throw "Invalid project requested";

if (
  ws === "*"
) {
  console.log("build all!");
  console.log("runs in parallel for perf, logs may get messy");
  await Promise.all(
    base.map((b) => new Deno.Command("deno", { args: ["-A", "build.ts", b] }).spawn().output()),
  );
  console.log("done!");
  Deno.exit(0);
}

console.log(ws + " | building for npm...");

await new Deno.Command(
  "powershell",
  {
    args: [
      "-c",
      "copy",
      "rolldown.config.txt",
      `${ws}\\rolldown.config.ts`,
    ],
  },
).spawn().output();

const cnt = Deno.readTextFileSync(`${ws}\\rolldown.config.ts`);
const fixed = cnt.replace(
  '"$"',
  ws == "string" ? "['cli.ts', 'mod.ts']" : ws === "http" ? "['mod.ts','download.ts']" : "'mod.ts'",
);
Deno.writeTextFileSync(`${ws}\\rolldown.config.ts`, fixed);

Deno.chdir(ws);

await new Deno.Command(
  "npm",
  {
    args: ["install", "--save-dev", "typescript@latest", "rolldown@latest"],
  },
).spawn().output();

await new Deno.Command(
  "npx",
  {
    args: ["rolldown", "-c"],
  },
).spawn().output();

await new Deno.Command(
  "npm",
  {
    args: ["remove", "typescript", "rolldown"],
  },
).spawn().output();

Deno.chdir("..");

await new Deno.Command(
  "cmd",
  {
    args: ["/c", "del", `${ws}\\rolldown.config.ts`, `${ws}\\dist\\rolldown.config.*`, `${ws}\\dist\\*.map`],
  },
).spawn().output();
