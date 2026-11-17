# 4. Instructions und Prompt Files

## Verstehen

Instructions beschreiben dauerhafte Projektregeln. Ein Prompt File startet bewusst eine wiederkehrende Aufgabe. Die `AGENTS.md` im Projektstamm enthält bereits allgemeine Projektregeln; diese Übung ergänzt eine neue Regel und vergleicht ihre Wirkung.

## Umsetzen

1. Die vorhandene `AGENTS.md` lesen und eine zusätzliche, darin noch nicht enthaltene Regel aus den Pascal-Units oder dem Build ableiten.
2. Einen kleinen Änderungsauftrag ohne diese neue Regel ausführen und die Beobachtung festhalten.
3. Die neue Regel in `AGENTS.md` ergänzen, denselben Auftrag wiederholen und die Ergebnisse vergleichen.
4. .github/prompts/test-review.prompt.md mit YAML-Frontmatter description und einem Review-Auftrag erstellen.
5. In VS Code bewusst aufrufen. In anderen Copilot-Oberflächen bei fehlender Prompt-File-Unterstützung den Inhalt in den Chat kopieren.

## Prompt

```text
Erstelle eine wiederverwendbare Test-Review-Vorlage für dieses
Object-Pascal-Projekt. Sie soll Akzeptanzkriterien, leere Arrays,
Alias-Effekte und tatsächlich ausgeführte Checks prüfen.
Keine Tests stillschweigend entfernen oder Erwartungen abschwächen.
Trenne dauerhaft geltende Regeln von dem manuell gestarteten Auftrag.
```

## Prüfen

- Die neue Instruction ist konkret, prüfbar und nicht bereits durch `AGENTS.md` abgedeckt.
- Das Prompt File liegt unter .github/prompts/ und wurde bewusst gestartet.
- Mein Vorher/Nachher-Nachweis zeigt, welche Regeln Copilot berücksichtigt hat.

## Tipp

Nicht behaupten, dass jede Copilot-Oberfläche dieselben Anpassungen unterstützt. Die Fundstelle und ein beobachteter Lauf sind besser als eine pauschale Aussage über automatische Wirkung.
