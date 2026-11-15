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
  assert.equal(act.timer, workshop.exercises.reduce((total, exercise) => total + exercise.minutes, 20));

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
