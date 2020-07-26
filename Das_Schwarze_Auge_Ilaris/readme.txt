A custom Roll20 character sheet for Das Schwarze Auge: Ilaris (an alternative ruleset for roleplaying in Aventuria).

Currently only available in German, since the ruleset itself is so far not localized.

Ruleset is available for free at ilarisblog.wordpress.com!

---

Gebrauchsanweisung:

Das Character Sheet ist ausdrücklich kein Ersatz für Sephrasto oder generell die Charakterverwaltung. Die meisten Werte müssen aus einem bereits erstellten Charakterbogen übertragen werden.

Der Bogen verfügt über einen Globalen Modifikator oben rechts, der auf alle Proben-Würfe aufgeschlagen wird (positive Zahl bedeutet Bonus, negative Zahl bedeutet Malus), und jeweils globale Modifikatoren für den Kampf und Übernatürliches, und einen Schadensmodifikator für alle Würfe auf Waffenschaden. Das kann man jeweils für situative Modifikatoren verwenden.

Der Einsatz von Schicksalspunkten um zusätzliche Würfel zu erhalten funktioniert, indem man in der Kopfzeile den Haken "Schicksalspunkt" setzt. Sollte man eine Eigenheit nutzen und zwei Würfel dazubekommen, kann der zweite Haken zusätzlich gesetzt werden (für dann 5 Würfel bei 3d20-Median-Proben oder 3 Würfel bei 1d20-Proben).

Die Einschränkungen (Wunden/Erschöpfung) verursachen automatisch globale Wundmodifikatoren. Ist ein Charakter aus beliebigem Grund immun gegen Wundabzüge, kann der Haken bei "Kalte Wut" gesetzt werden, um die Abzüge pauschal auf 0 zu setzen.
Wundschwellen (mit oder ohne Trefferzonen) sind rein informativ und haben keine spezifischen Abhängigkeiten im Sheet.

Die Attribute werden mit ihren einfachen Werten eingetragen; bei den Würfelwürfen (3d20 Median oder 1d20) werden sie automatisch als verdoppelter Probenwert addiert.

Initiative berechnet sich automatisch aus Intuition und eventuellen Kampfreflexen (Haken bei "KR"). Durch klicken auf den Würfel daneben wird, wenn das eigene Token angewählt ist, automatisch die Initiative an den Roll20 Turn Tracker geschickt.

Geschwindigkeit wird nicht automatisch berechnet und muss selbst eingetragen werden.

Die Fertigkeitswerte werden in das kleine Feld eingetragen. Die Basiswerte berechnet das Sheet automatisch; der talentierte, berechnete Probenwert wird daneben angezeigt. Im Textfeld ist Platz um Talente zu notieren; die Fertigkeiten haben jeweils vier Roll-Buttons, 3d20 Median und 1d20, jeweils mit und ohne Talent (t). Je nachdem, ob ein T-Button oder ein Nicht-T-Button gedrückt wird, wird der Talentierte Probenwert oder der Untalentierte benutzt. 
Hohe Qualität kann stufenweise für alle Talentproben global eingestellt werden - Jede Stufe macht automatisch eine Modifikation von -4.
Für freie Fertigkeiten gibt es eine einfache Liste, die per "Add"-Button erweitert werden kann, und drei Buttons für 3d20 Median + 6/14/22 (für Unerfahren/Erfahren/Meisterlich) - komplizierter wollte ich das nicht machen.
Zusätzliche Fertigkeiten aus Hausregeln können frei zugeschaltet werden. Wenn die drei relevanten Attribute ausgewählt wurden, berechnet das Sheet automatisch den Basiswert und mit dem Fertigkeitswert den Probenwert.
Die profanen Vorteile "Scharfsinn", "Eindrucksvoll" und "Vorausschauend" sind in einer Zeile zusammengefasst und können in der passenden Situation (sine qua non!) in ihren zwei Stufen zugeschaltet werden. Sie geben dann +2 oder +4 auf ALLE (!) Fertigkeitsproben.

Der Bogen enthält keine Kampftalente und -stile, stattdessen können einfach Waffen mit ihren finalen AT-, VT- und Waffenschadens-Werten (i.e., nach Anwendung der Boni aus Kampfstilen) eingetragen werden. Der eingetragene Schaden sollte der Waffenschaden (nach eventuellen Boni aus Kraftvollem Kampf) sein, der KK-Schadensbonus wird automatisch addiert. Bei "Kopflastigen" Waffen kann der Haken bei "KL" gesetzt werden, dadurch wird der KK-Schadensbonus verdoppelt.

Manöver können einzeln zum AT-, VT-, FK- und Schadenswurf zugeschaltet werden. Beim Würfeln wird die Gesamt-Modifikation und die jeweils ausgewählten relevanten Manöver "öffentlich" angezeigt. 

Spezielle Manöver und Sonderfertigkeiten: 
Bei "Sturmangriff" oder "Überrennen" wird automatisch die volle modifizierte Geschwindigkeit (von Held oder Reittier) addiert; bei eventuell situativ bedingt niedrigerer Geschwindigkeit kann diese entweder manuell verringert werden, oder der Schaden zusätzlich über den globalen Schadensmodifikator reduzieren.
Bei "Auflaufen lassen" kann eine Geschwindigkeit für den Gegner eingetragen werden; diese wird, wenn der Schaden gewürfelt wird, addiert. Aufpassen dass man das Häkchen vor der nächsten regulären Attacke wieder entfernt.
Der Haken "Gesegnete Waffe" kann gesetzt werden, wenn ein Charakter mit dieser Sonderfertigkeit und einer bereits geweihten Waffe (sine qua non!) gegen ein unheiliges Wesen kämpft. Dadurch wird ein weiterer d6 Schaden verursacht.
Wenn das erste Häkchen bei "Präzision" gesetzt wird, berichtet das Roll Template automatisch, wenn ein Würfelwurf über 15 gewertet wird. Wenn das passiert, kann man manuell (!) das zweite Häkchen ("!") setzen, damit die GE zum Schaden addiert wird.

"Reaktionen" bedeutet, wie viele Reaktionen bereits erfolgt sind, ohne die Reaktion, auf die gerade gewürfelt wird.

Zauber/Liturgien werden einzeln eingetragen, mit ihren jeweiligen Probenwerten. Modifikationen funktionieren analog zu Kampfmanövern. "Mühelose Magie / Liebling der Gottheit" funktioniert analog zu Präzision und meldet gewertete Würfe über 15.

Die Charakter-Attributes "wounds" (Einschränkungen), "energy" (Karma/Astralenergie) und "schip" (Schicksalspunkte) eignen sich gut um als Token-Bars benutzt zu werden. Dazu muss das Token dem Charakter zugeordnet ("Represents Character") und dann der entsprechende Wert im Dropdownmenü bei den Bars ausgewählt werden. Dann verändern sich automatisch die Werte im Sheet mit den Werten des Tokens und umgekehrt. Bei Einschränkungen sollten die Werte im Sheet verändert werden - der Weg vom Token zum Sheet funktioniert wegen der Trennung in Wunden und Erschöpfung nicht.
"wounds" verhält sich dabei entgegengesetzt - Ein gesunder Charakter ohne Einschränkungen hat 8 "wounds", ein Charakter mit 8 Einschränkungen hat 0 "wounds". Sonst verhalten sich die Balken unintuitiv.

---

Limitationen:

Die enthaltenen Formeln haben relativ viele Abhängigkeiten und sind - wie gesagt - quick and dirty gebaut. Deswegen funktionieren viele davon nicht, wenn nicht alle Werte eingetragen sind, etwa Behinderung, Geschwindigkeit oder einzelne Attribute. Ab 1.1.1 etwas mitigiert durch Checkboxen und Default-Werte.

Sonderfertigkeiten sind teilweise nicht integriert - Etwa der Bonus für mehrere Modifikationen bei Gildenmagier II oder für Manöver bei Parierwaffenkampf. Das muss man derzeit noch im Kopf oder durch die globalen Modifikatoren machen, auch weil IF/THEN-Operationen derzeit meinen Horizont etwas übersteigen.

---

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
Neue Features:
- Der Bogen zeigt die berechneten, talentierten Probenwerte der Fertigkeiten jetzt an.
- Bei "Auflaufen lassen" kann eine Geschwindigkeit des Gegners eingetragen werden, die zu Schadenswürfen bei Nahkampfwaffen addiert wird wenn das Häkchen gesetzt ist.
- Wunden und Erschöpfungen werden jetzt unterschieden, zusammengefasst als "wounds" auslesbar.
- Wundmodifikatoren werden jetzt durch ein Sheetworker-Skript berechnet; das ermöglicht das Verwenden von "wounds" als Token-Wert.
- Schicksalspunkte aktuell/max hinzugefügt.
- Astralenergie/Karmeenergie aktuell/max hinzugefügt.
- Sonderfertigkeit "Kalte Wut" hinzugefügt, die automatisch alle Wundabzüge auf 0 setzt.
- Zusätzliche Zeilen für Freie Fertigkeiten einfügbar; ACHTUNG: Die in Version 1.3.1 eingetragenen Fertigkeiten werden aus dem Sheet entfernt. Sie können entweder neu eingetragen werden, oder die vorhandenen Attributes (unter dem Reiter "Attributes & Abilities) "ffertNUMMER" können manuell umbenannt werden in "repeating_freiefertigkeiten_NUMMER_ffert".
- Zusätzliche Fertigkeiten (i.e., aus Hausregeln) einfügbar.
- Trefferzonen-Wundschwellen hinzugefügt.
- Sonderfertigkeiten "Scharfsinn", "Eindrucksvoll" und "Vorausschauend" implementiert.
- Erklärende Tooltips zu den meisten Inputs und Buttons hinzugefügt.
- Schadensberechnung Hammerschlag gefixt (bisher wurde der KK-Schadensbonus nicht mitverdoppelt).
- Passierschläge hinzugefügt.
- Berechnung von Verteidigungswürfen gefixt.

1.4.1: Fix der Anzeige von "Meisterschuss" in den Roll Templates.

1.5:
Neue Features:
- Getrennte AE- und KE-Werte für geweihte Zauberer
- Optionale Sektion für Inventar und Notizen