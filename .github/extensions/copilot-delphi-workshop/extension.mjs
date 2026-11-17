import { resolve } from "node:path";
import { createCanvas, joinSession } from "@github/copilot-sdk/extension";
import { createProgressStore, loadWorkshop, startGuide } from "../../../guide/server.mjs";
import { isComplete } from "../../../guide/model.mjs";

let session;
const servers = new Map();

function getProgressPath() {
    return resolve(session?.workspacePath ?? process.cwd(), ".workshop", "progress.json");
}

const workshopCanvas = createCanvas({
    id: "copilot-delphi-workshop",
    displayName: "Copilot-Workshop · Delphi",
    description: "Führt durch acht Copilot-Übungen für Delphi- und Object-Pascal-Entwickler und speichert persönlichen Fortschritt im Checkout.",
    inputSchema: {
        type: "object",
        properties: {
            exerciseId: {
                type: "string",
                enum: ["setup", "completions", "chat", "agent", "instructions", "skills", "tools", "capstone"],
            },
        },
        additionalProperties: false,
    },
    actions: [
        {
            name: "get_workshop_status",
            description: "Liefert den Bestätigungsstatus der Übungen, ohne persönliche Notizen auszulesen.",
            inputSchema: { type: "object", properties: {}, additionalProperties: false },
            handler: async () => {
                const workshop = await loadWorkshop();
                const progress = await createProgressStore(getProgressPath(), workshop).read();
                const exercises = workshop.exercises.map((exercise) => ({
                    id: exercise.id,
                    title: exercise.title,
                    complete: isComplete(progress.exercises[exercise.id]),
                }));
                return {
                    title: workshop.title,
                    progressPath: ".workshop/progress.json",
                    revision: progress.revision,
                    completedExercises: exercises.filter((exercise) => exercise.complete).length,
                    totalExercises: exercises.length,
                    exercises,
                };
            },
        },
    ],
    open: async (ctx) => {
        let entry = servers.get(ctx.instanceId);
        if (!entry) {
            entry = await startGuide({ port: 0, progressPath: getProgressPath() });
            servers.set(ctx.instanceId, entry);
        }

        const url = new URL(entry.url);
        const initialExercise = ctx.input?.exerciseId;
        if (initialExercise) url.hash = `${initialExercise}/Verstehen`;

        return {
            title: "Copilot-Workshop · Delphi",
            status: "Acht Übungen · Fortschritt lokal im Checkout",
            url: url.href,
        };
    },
    onClose: async (ctx) => {
        const entry = servers.get(ctx.instanceId);
        if (!entry) return;

        servers.delete(ctx.instanceId);
        await new Promise((resolve, reject) => {
            entry.server.close((error) => error ? reject(error) : resolve());
        });
    },
});

session = await joinSession({ canvases: [workshopCanvas] });
