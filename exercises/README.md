# Geführter Workshop

Für die Durchführung in der GitHub Copilot App den projektbezogenen **Copilot-Workshop · Delphi**-Canvas öffnen. Die Markdown-Dateien in diesem Ordner sind die gemeinsame Quelle für Canvas, Browser-Fallback und Offline-Leseweg.

Unter Windows in PowerShell, unter macOS im Terminal den Browser-Fallback mit `npm run guide` starten und die vollständige URL aus der Ausgabe öffnen. Der Canvas und der Browser-Fallback verwenden denselben lokalen Fortschritt in `.workshop/progress.json`.

0. [Setup](00-setup.md)
1. [Completions](01-completions.md)
2. [Chat](02-chat.md)
3. [Agent Mode](03-agent-mode.md)
4. [Instructions und Prompts](04-instructions-prompts.md)
5. [Skills und Agents](05-skills-agents.md)
6. [Tools und MCP](06-tools-mcp.md)
7. [Capstone](07-capstone.md)

Pausen sind nach Übung 2 und 4 vorgesehen. Die Live-MCP-Vertiefung ist optional; die lokale Tool-/Rechteanalyse bleibt Teil des Workshops.

Arbeite in Reihenfolge oder wähle einzelne Module. `npm test` ist der gemeinsame Qualitätscheck. Vor jeder Agent-Aufgabe: Änderungen committen oder anderweitig sichern; danach Diff, Tests und Annahmen prüfen.
