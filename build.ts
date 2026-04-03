import { join } from "jsr:@std/path";
import { validateAgainst } from "./string/mod.ts";
import { allEqualK } from "./entity/mod.ts";

const ws = Deno.args[0];

const base = ["string", "geo", "http", "number", "perf", "entity"] as const;

if (!validateAgainst(ws, [...base, "--all"])) throw "Invalid project requested";

async function run(cmd: string, args: string[]): Promise<void> {
  const out = await new Deno.Command(cmd, { args }).output();
  const deco = new TextDecoder();
  const stdout = deco.decode(out.stdout).trim();
  const stderr = deco.decode(out.stderr);
  if (stdout != "") console.log(stdout);
  if (out.code !== 0) throw new Error(stderr);
}

if (ws === "--all") {
  console.log("build all!");
  console.log("runs in parallel for perf, logs may get messy");
  await Promise.all(
    base.map((b) => run("deno", ["-A", "build.ts", b, Deno.args.includes("--publish") ? "--publish" : ""])),
  );
  console.log("done!");
  Deno.exit(0);
}

console.log(`${ws} | building for npm...`);

const rolldownSrc = "rolldown.config.txt";
const rolldownDst = join(ws, "rolldown.config.ts");
const distDir = join(ws, "dist");

async function clean() {
  for (
    const pattern of [
      rolldownDst,
      join(distDir, "rolldown.config.d.ts"),
      join(distDir, "rolldown.config.d.ts.map"),
      join(distDir, "rolldown.config.js"),
    ]
  ) {
    await run("rm", ["-f", pattern]);
  }
}

await clean();
await run("rm", ["-rf", distDir]);

await run("cp", [rolldownSrc, rolldownDst]);

const rolldownContent = Deno.readTextFileSync(rolldownSrc);
const fixedRolldown = rolldownContent.replace(
  '"$"',
  ws === "string" ? "['cli.ts', 'mod.ts']" : ws === "http" ? "['mod.ts', 'download.ts']" : "'mod.ts'",
);
Deno.writeTextFileSync(rolldownDst, fixedRolldown);

Deno.chdir(ws);
await run("npm", ["install", "--save-dev", "typescript@latest", "rolldown@latest", "@types/node"]);
await run("npx", ["rolldown", "-c"]);
await run("npx", ["tsc"]);
await run("npm", ["remove", "typescript", "rolldown", "@types/node"]);

const denoJSON = JSON.parse(Deno.readTextFileSync("deno.json"));
const nodeJSON = JSON.parse(Deno.readTextFileSync("package.json"));
const changeMD = Deno.readTextFileSync("CHANGELOG.md").split("\n").find((n) => n.startsWith("## "))!.replace("## ", "");

if (!allEqualK([denoJSON.version, nodeJSON.version, changeMD])) {
  throw new Error(
    `VERSION MISMATCH FOR ${ws}! (Deno ${denoJSON.version} vs. Node ${nodeJSON.version} vs. CHANGELOG ${changeMD})`,
  );
} else {console.log(
    `Version match for ${ws} (Deno ${denoJSON.version} vs. Node ${nodeJSON.version} vs. CHANGELOG ${changeMD})`,
  );}

Deno.chdir("..");

await clean();
