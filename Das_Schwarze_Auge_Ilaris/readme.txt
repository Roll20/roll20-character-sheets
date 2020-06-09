A custom Roll20 character sheet for Das Schwarze Auge: Ilaris (an alternative ruleset for roleplaying in Aventuria).

Currently only available in German, since the ruleset itself is so far not localized.

Ruleset is available for free at ilarisblog.wordpress.com!

---

Gebrauchsanweisung:

Das Character Sheet ist ausdrücklich kein Ersatz für Sephrasto oder generell die Charakterverwaltung. Die meisten Werte müssen aus einem bereits erstellten Charakterbogen übertragen werden.

Der Bogen verfügt über einen Globalen Modifikator oben rechts, der auf alle Proben-Würfe aufgeschlagen wird (positive Zahl bedeutet Bonus, negative Zahl bedeutet Malus), und jeweils globale Modifikatoren für den Kampf und Übernatürliches, und einen Schadensbonus für alle Würfe auf Waffenschaden. Das kann man für situative Modifikatoren verwenden.

Die Attribute werden einfach eingetragen; bei den Würfelwürfen (3d20 Median oder 1d20) werden die automatisch verdoppelt dazugezählt.

Die Fertigkeitswerte werden in das kleine Feld eingetragen, daneben ist Platz um Talente zu notieren; die Fertigkeiten haben jeweils vier Roll-Buttons, 3d20 Median und 1d20, jeweils mit und ohne Talent (t). Je nachdem, ob ein T-Button oder ein Nicht-T-Button gedrückt wird, wird der Talentierte Probenwert oder der Untalentierte benutzt. Die Basiswerte berechnet das Sheet automatisch.

Hohe Qualität kann stufenweise für alle Talentproben global eingestellt werden - Jede Stufe macht automatisch eine Modifikation von -4.
Für freie Fertigkeiten gibt es eine einfache Liste, und drei Buttons für 3d20 Median + 6/14/22 (für Unerfahren/Erfahren/Meisterlich) - komplizierter wollte ich das nicht machen.

Der Bogen enthält keine Kampftalente und -stile, stattdessen können einfach Waffen mit ihren finalen AT-, VT- und Waffenschadens-Werten (i.e., nach Anwendung der Boni aus Kampfstilen) eingetragen werden. Der eingetragene Schaden sollte der Waffenschaden sein, der KK-Schadensbonus wird automatisch addiert.

Manöver können einzeln zum AT-, VT-, FK- und Schadenswurf zugeschaltet werden. Beim Würfeln wird die Gesamt-Modifikation "öffentlich" angezeigt.

"Reaktionen" bedeutet, wie viele Reaktionen bereits erfolgt sind, ohne die Reaktion, auf die gerade gewürfelt wird.

Zauber/Liturgien werden einzeln eingetragen, mit ihren jeweiligen Probenwerten. Modifikationen funktionieren analog zu Kampfmanövern.


Limitationen:

Der Malus für weitere Reaktionen wird bei der VT automatisch eingerechnet, aber nicht bei anderen Aktionen, etwa bei Passierschlägen. Das sollte man selbstständig über den globalen Modifikator handhaben.

Die enthaltenen Formeln haben relativ viele Abhängigkeiten und sind - wie gesagt - quick and dirty gebaut. Deswegen funktionieren viele davon nicht, wenn nicht alle Werte eingetragen sind, etwa Behinderung, Geschwindigkeit oder einzelne Attribute. Ab 1.1.1 etwas mitigiert durch Checkboxen und Default-Werte.

Sonderfertigkeiten sind teilweise nicht integriert - Etwa der Bonus für mehrere Modifikationen bei Gildenmagier II oder für Manöver bei Parierwaffenkampf. Das muss man derzeit noch im Kopf oder durch die globalen Modifikatoren machen, auch weil IF/THEN-Operationen derzeit meinen Horizont etwas übersteigen.


Versionshistorie:

1.0.3: Überrennen und Reittier-GS hinzugefügt; Globale Kampf- und Magie-Modifikatoren hinzugefügt. MR-Probenwert-Berechnung gefixt.
1.0.4: Anzeigefehler VT-Gesamtmodifikator behoben.

1.1:
Eine Menge neue Features:
- Wundschwellen hinzugefügt - Keine Abhängigkeiten, rein informativ.
- Einschränkungen mit entsprechenden Modifikatoren per Dropdown auswählbar.
- Ja/Nein-Entscheidungen durch Checkboxen ersetzt.
- Kopflastig als Waffeneigenschaft hinzugefügt.
- Offensiver Kampfstil kann aktiviert werden, um den VT-Malus zu halbieren.
- "Präzision" kann jetzt nach geworfenen 16+-Würfen selbstständig angeklickt werden und addiert GE zum Schaden.
- "Gesegnete Waffe" kann bei bereits geweihten Waffen gegen Unheilige Gegner angeklickt werden und addiert 1d6 zum Schaden.
- Kommandos hinzugefügt, soweit sie Effekte für die Berechnung haben.
- "Ruhige Hand" kann aktiviert werden und verdoppelt den Bonus durch Zielen.
- Dropdown-Menüs für die wichtigsten FK-Modifikatoren
- Globaler Schadens-Modifikator hinzugefügt.
- Alle Werte standardmäßig auf Null gesetzt, um Fehler in den Formeln zu vermeiden.

1.1.1: Kleine Fixes.
1.1.2: Initiative-Makro hinzugefügt. Wenn das richtige Charakter-Token ausgewählt ist, wird die Initiative in den Turn Tracker übernommen.

1.2:
Noch mehr neue Features:
- CSS Design hinzugefügt, mit einem einfachen Hintergrund und Unterstützung für bunte Roll Templates.
- Schicksalspunkte sind einsetzbar um einen zusätzlichen Würfel zu allen Proben hinzuzufügen. Einfach den Haken setzen und eine Probe würfeln.
- Custom Roll Templates mit etwas mehr Information zu allen Würfen.
- "Präzision" und "Mühelose Magie/Liebling der Götter" können jetzt markiert werden, um sie aktiv abzufragen. Bei einem Wurf >15 wird dann ein Hinweis ausgegeben. Das Häkchen bei Präzision addiert dann GE zum Schaden.
- Große Mengen an Technical Debt beglichen.

1.2.1: Kleine Fixes & Layout-Anpassungen.

1.3:
Weitere Verbesserungen bei Roll-Templates:
- Manöver werden bei AT-, VT-, FK- und Schadens-Würfen aufgelistet.
- Modifikationen werden bei Zauber/Liturgie-Proben aufgelistet.
- Schicksalspunkte können jetzt auch doppelt angewählt werden, um einen weiteren Würfel zu addieren ("Eigenheiten einsetzen").

1.3.1: Präzision bei Fernkampfwaffen gefixt.

1.4: 
Noch einige neue Features:
- Der Bogen zeigt die berechneten, talentierten Probenwerte der Fertigkeiten jetzt an.
- Bei "Auflaufen lassen" kann eine Geschwindigkeit des Gegners eingetragen werden, die zu Schadenswürfen bei Nahkampfwaffen addiert wird wenn das Häkchen gesetzt ist.