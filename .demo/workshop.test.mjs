import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const readJson = async (path) => JSON.parse(await readFile(new URL(path, root), "utf8"));

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
  assert.match(normalizedPlan, /GitHub\.copilot/);
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
