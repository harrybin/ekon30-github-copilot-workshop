# 4. Instructions und Prompt Files

## Verstehen

Instructions beschreiben dauerhafte Projektregeln. Ein Prompt File startet bewusst eine wiederkehrende Aufgabe. Die Übung legt die Regeln erst jetzt an, damit der Unterschied vorher/nachher sichtbar wird.

## Umsetzen

1. Drei überprüfbare Regeln aus den Pascal-Units und dem Build ableiten.
2. .github/copilot-instructions.md anlegen: Delphi-kompatibler Code, keine Mutation der Eingabearrays, npm test nach Pascal-Änderungen.
3. Denselben kleinen Änderungsauftrag vor und nach den Instructions vergleichen.
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

- Die Instructions enthalten drei konkrete, am Projekt prüfbare Regeln.
- Das Prompt File liegt unter .github/prompts/ und wurde bewusst gestartet.
- Mein Vorher/Nachher-Nachweis zeigt, welche Regeln Copilot berücksichtigt hat.

## Tipp

Nicht behaupten, dass jede Copilot-Oberfläche dieselben Anpassungen unterstützt. Die Fundstelle und ein beobachteter Lauf sind besser als eine pauschale Aussage über automatische Wirkung.
