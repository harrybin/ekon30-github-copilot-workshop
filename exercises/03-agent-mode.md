# 3. Agent Mode: Sessions pro Track

## Verstehen

Ein Agent darf mehrere Schritte ausführen. Deshalb vereinbaren wir zuerst Scope, Nicht-Ziele und einen überprüfbaren Nachweis. Die Aufgabenbeschreibung steht in backlog/feature-request.md.

## Umsetzen

1. Einen lokalen Feature-Branch mit git switch -c exercise/track-counts anlegen.
2. Backlog und betroffene Pascal-Dateien lesen; den Agenten zunächst nur planen lassen.
3. Plan mit den Akzeptanzkriterien vergleichen. Erst danach die Umsetzung ausdrücklich freigeben.
4. Agent beim Bauen und Testen beobachten; Terminalrechte einzeln prüfen.
5. npm test selbst ausführen, git diff lesen und unveränderte Eingabedaten prüfen.

## Prompt

```text
Plane CountSessionsByTrack gemäß backlog/feature-request.md.
Verwende Delphi-kompatibles Object Pascal, dynamische Arrays und
Lazarus/FPC. Scope: src/SessionCatalog.pas und tests/CatalogTests.lpr.
Keine Änderungen an Guide, Buildskripten oder vorhandenen Erwartungen.
Nenne offene Fragen und Tests. Warte vor der Umsetzung auf Freigabe.
```

## Prüfen

- Mehrere Tracks, leere Eingabe und unveränderte Eingabe sind getestet.
- Die erste Auftretensreihenfolge und Groß-/Kleinschreibung bleiben erhalten.
- Ich habe Diff und echten Testlauf geprüft, nicht nur die Agentenantwort.

## Tipp

Für drei bis wenige Dutzend Sessions genügt eine einfache Schleife mit dynamischem Ergebnisarray. Ein Framework, eine Datenbank oder Delphi-exklusive Generics sind hier nicht nötig.
