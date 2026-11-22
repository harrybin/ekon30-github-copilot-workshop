import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const readJson = async (path) => JSON.parse(await readFile(new URL(path, root), "utf8"));

test("workspace and dev container recommend Copilot Chat without the deprecated extension", async () => {
  const workspace = await readJson(".vscode/extensions.json");
  const container = await readJson(".devcontainer/devcontainer.json");
  const normalize = (ids) => ids.map((id) => id.toLowerCase()).sort();
  const recommendations = normalize(workspace.recommendations);
  assert.deepEqual(normalize(container.customizations.vscode.extensions), recommendations);
  assert.ok(recommendations.includes("github.copilot-chat"));
  assert.ok(!recommendations.includes("github.copilot"));
});

test("the act follows all workshop exercises and both breaks without writing files", async () => {
  const act = await readJson(".demo/01-delphi-workshop.json");
  const workshop = await readJson("guide/workshop.json");
  const expected = workshop.exercises.map(({ id }) => id);
  expected.splice(3, 0, "pause-1");
  expected.splice(6, 0, "pause-2");

  assert.deepEqual(act.scenes.map(({ id }) => id), expected);
  assert.equal(new Set(act.scenes.map(({ id }) => id)).size, act.scenes.length);
  assert.equal("timer" in act, false);
  assert.doesNotMatch(JSON.stringify(act), /\b\d+\s*(?:Min\.?|Minuten)\b/i);

  for (const scene of act.scenes) {
    if (scene.notes) await access(new URL(scene.notes.path, root));
    const exercise = workshop.exercises.find(({ id }) => id === scene.id);
    if (exercise) {
      assert.deepEqual(scene.moves.at(-1), { action: "open", path: `exercises/${exercise.file}` });
    }
    for (const move of scene.moves) {
      assert.ok(["open", "showInfoMessage"].includes(move.action), `${scene.id}: ${move.action}`);
      if (move.action === "open") await access(new URL(move.path, root));
    }
  }
});

test("the presenter act is a separate, manual Copilot demo with no progress or command actions", async () => {
  const act = await readJson(".demo/02-presenter-capstone.json");
  const plan = await readFile(new URL(".demo/presenter-capstone.md", root), "utf8");
  const normalizedPlan = plan.replace(/\s+/g, " ");
  assert.deepEqual(act.scenes.map(({ id }) => id), [
    "prepare-presenter",
    "real-copilot-request",
    "inspect-and-test",
  ]);
  assert.equal("timer" in act, false);
  assert.match(normalizedPlan, /separaten Presenter-Checkout/i);
  assert.match(normalizedPlan, /weder eine vorgefertigte Copilot-Antwort/i);
  assert.match(normalizedPlan, /Copilot nicht angemeldet, nicht verfügbar/i);
  assert.match(normalizedPlan, /GitHub\.copilot-chat/);
  assert.match(normalizedPlan, /npm run test:fpc/);

  const openedPaths = new Set();
  for (const scene of act.scenes) {
    assert.equal(scene.notes.path, ".demo/presenter-capstone.md");
    await access(new URL(scene.notes.path, root));
    for (const move of scene.moves) {
      assert.equal(move.action, "open");
      assert.doesNotMatch(move.path, /\.workshop|progress\.json/i);
      openedPaths.add(move.path);
      await access(new URL(move.path, root));
    }
  }

  assert.ok(openedPaths.has("src/SessionCatalog.pas"));
  assert.ok(openedPaths.has("tests/CatalogTests.lpr"));
  assert.ok(openedPaths.has("exercises/07-capstone.md"));
});

test("demo initialization and reset preserve existing work and restore the recorded commit", () => {
  const temp = mkdtempSync(join(tmpdir(), "workshop-demo-test-"));
  const source = join(temp, "source");
  const script = fileURLToPath(new URL("scripts/demo-copy.mjs", root));
  const run = (cwd, command, args, expected = 0) => {
    const result = spawnSync(command, args, { cwd, encoding: "utf8" });
    assert.equal(result.status, expected, result.stderr || result.stdout);
    return result.stdout;
  };
  try {
    mkdirSync(source);
    run(source, "git", ["init", "-q"]);
    writeFileSync(join(source, "starter.txt"), "starter\n");
    run(source, "git", ["add", "starter.txt"]);
    run(source, "git", ["-c", "user.name=Test", "-c", "user.email=test@example.invalid", "commit", "-qm", "starter"]);
    writeFileSync(join(source, "starter.txt"), "source work\n");
    mkdirSync(join(source, ".workshop"));
    writeFileSync(join(source, ".workshop", "progress.json"), "source progress\n");
    run(source, process.execPath, [script, "reset"], 1);
    const first = run(source, process.execPath, [script, "init"]).match(/Open this folder in VS Code: (.+)/)[1].trim();
    assert.equal(readFileSync(join(first, "starter.txt"), "utf8").replace(/\r\n/g, "\n"), "starter\n");
    assert.equal(readFileSync(join(source, "starter.txt"), "utf8"), "source work\n");
    assert.equal(readFileSync(join(source, ".workshop", "progress.json"), "utf8"), "source progress\n");

    writeFileSync(join(first, "starter.txt"), "committed demo work\n");
    run(first, "git", ["add", "starter.txt"]);
    run(first, "git", ["-c", "user.name=Test", "-c", "user.email=test@example.invalid", "commit", "-qm", "demo work"]);
    writeFileSync(join(first, "starter.txt"), "uncommitted demo work\n");
    writeFileSync(join(first, ".workshop", "progress.json"), "demo progress\n");
    const second = run(first, process.execPath, [script, "reset"]).match(/Open this folder in VS Code: (.+)/)[1].trim();
    assert.notEqual(first, second);
    assert.equal(readFileSync(join(second, "starter.txt"), "utf8").replace(/\r\n/g, "\n"), "starter\n");
    assert.equal(readFileSync(join(first, "starter.txt"), "utf8"), "uncommitted demo work\n");
    assert.equal(readFileSync(join(first, ".workshop", "progress.json"), "utf8"), "demo progress\n");
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
