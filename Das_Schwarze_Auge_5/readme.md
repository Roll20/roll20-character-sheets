## Roll20 Charakterbogen für Das Schwarze Auge 5

### UPDATE 29.04.2020

Es gibt jetzt eine wiki Seite für das Projekt
https://wiki.roll20.net/DSA5_Character_Sheet_ger

### UPDATE 12.04.2020

*Hinweis - die automatischen Berechnungen für Schmerz, LE, AE und KE sind nur aktiv bei normalen Charakteren.*
*Wenn in der Konfiguration "Gegnersheet" ausgewählt ist, sind die Berechnungen deaktiviert*

![Automatische Berechnung von LE, AE, KE](https://i.imgur.com/c6XbiHa.jpg)
 * **Berechnung der Maximalwerte für LE, AE, KE**: Es gibt eine neue Option in der Konfiguration, um jeweils für die LE, AE und KE automatisch den aktuellen Grundwert aus der Hauptseite als Maximalwert für LE_Wert, AE_Wert und KE_Wert zu setzen. Bei aktivierter Option werden die maximalwerte für den Token automatisch angepasst, wenn sich diese im Sheet ändern. Wenn man den Balken auf dem Token nicht sehen möchte (oder den Wert manuell festlegen möchte), kann man die Option deaktivieren.
 
 ![Automatische Berechnung von LE, AE, KE]( https://i.imgur.com/TETwU5h.jpg)
 * **Automatische Schmerzstufen**: Die Schmerzstufen werden automatisch berechnet. Dabei wird der LE_Grundwert und der LE_Wert zur Berechnung genommen. Vorteil Zäher Hund und Nachteil Zerbrechlich werden korrekt berücksichtigt. Für besondere Umstände (Schmerzen durch Gift, Schmerzen unterdrücken usw.) kann über den Modifikator die Schmerzstufe angepasst werden.

### UPDATE 08.04.2020
Der Charakterbogen wurde lange Zeit nicht gepflegt. Ich habe diesen übernommen, um einige Bugfixes einzupflegen, es wird aber keine aktive Weiterentwicklung geben.
Die Neuerungen / Bugfixes sind im Changelog zu sehen.

Der unten stehende Text wird zu Dokumentationszwecken stehen gelassen, ist aber insgesamt nicht mehr gültig.

Wenn es die Zeit zulässt, sind folgende Punkte noch auf meiner persönlichen ToDo-Liste:
 - Status-System ausbauen (automatisches Setzen von Handlungsunfähigkeit bei Schmerz 4 oder total 8 Status Stufen.

Folgende Fehler sind (mir) aktuell bekannt:
 - Beidhändiger Kampf reduziert die PA/AW Werte nicht
 - Beidhändiger Kampf reduziert den Passierschlag nicht
 - PA-Bonus der ausgerüsteten Nebenhand wird als Bonus auf die Hauptwaffe addiert. Parade mit Nebenhand aktuell nicht möglich via sheet.
 - Wenn Belastungsgewöhnung ausgeschaltet wird, wird die BE in den Rüstungen nicht angepasst. Wenn diese Option gesetzt und dann entfernt wird -> Rüstungen neu eintragen!

===============
===============

OLD TEXT - NOT VALID ANYMORE (only kept for documentation of lifecycle):

Auf dieser Seite wird euch in Zukunft eine Generelle Anleitung für den Charakterbogen erwarten. Dies ist vorallem für Nutzer gedacht die noch nie etwas mit dem Bogen auf Roll20 zu tun hatten.

Aktuell findet Ihr hier eine Erklärung der kürzlich eingeführten Features sowie weitere genrelle Informationen.

### Neue Features

![Beidhändiger Kampf](https://i.imgur.com/8ytS1Zu.png)
 * **Nebenhandwaffen**: Nebenhandwaffen wurden hinzugefügt. Diese können wie Schilde und Fernkampfwaffen unter den Anzeige Optionen eingeblendet werden. Die Aktivierung erfolgt wie bei Schilden. Berechnungen für falsche Hand und den Vorteil Beidhändigkeit sind hinterlegt. Parierwaffen sind aktuell noch nicht abbildbar.
 * **Beidhändiger Kampf:** Sobald eine Nebenwaffe ausgerüstet ist besteht die Möglichkeit mit der Schaltfläche 'Beidhändiger Kampf' eben jenen zu aktivieren. Abzüge durch Angriff mit 2 Waffen und Sonderfertigkeiten die dies Modifizieren werden berücksichtigt.
 
![Spezialmanöver](https://i.imgur.com/4n5EHku.png)
 * **Spezialmanöver:** Spezialmanöver haben nun (fast) alle ein eigenes Makro für die Chatausgabe. Dabei werden automatisch Erschwernisse bei der Berechnung berücksichtigt. Außerdem sind diese mit Basismanövern sofern dies Regeltechnisch geht kombinierbar. Spezialmanöver mit besonderen TP Berechnungen haben dafür auch ein eigenes Makro erhalten. Dieses Feature wird in Zukunft auch auf andere Teile des Bogens erweitert.
 * **Tooltips:** Spezialmanöver haben Tooltips mit den Informationen aus der Regelwiki erhalten.

![Globale Optionen](https://i.imgur.com/GpYN42a.png)
 * **Changelog/Anleitung/Bugtracker:** Mit einem Click wird euch der Link für den Changelog / Readme / Bugtracker im Chat angezeigt
 * **Chatausgabe:** Je nach Auswahl werden eure Proben im Chat für alle, dich und den GM oder nur für dich sichtbar
 * **Modifikator:** Alle Proben die zuvor nach einem Modifikator gefragt haben können mit der Wahl 'nein' sofort unmodifiziert gewürfelt werden ohne das sich ein Eingabefeld öffnet, entsprechende doppelte Würfelfelder wurden entfernt
 * **Inhaltliche Änderungen:** Alle weiteren Änderungen sind im [Changelog](https://github.com/Meteox/roll20-character-sheets/blob/master/Das_Schwarze_Auge_5/changelog.md) dokumentiert

### Updates

Wenn ich ein Update fertigstelle dauert es eine Weile bis dieses offen verfügbar ist. Roll20 fügt Updates in der Regel Montag oder Dienstag Ihrer Datenbank hinzu und veröffentlicht diese dann in der Regel Dienstags oder Mittwochs. Über diesen Veröffentlichungstermin habe ich keine Kontrolle.

Als Pro-Nutzer könnt Ihr über Github den aktuellen Quellcode in eure Kampagne einbinden ohne auf den öffentlichen Release zu warten.


### Testen von neuen Versionen

Aktuell veröffentliche ich fast täglich neue Versionen. Die aktuelle Version ist in meiner [öffentlichen Testkampagne](https://app.roll20.net/join/1206379/qP-T_Q) und in [Github](https://github.com/Meteox/roll20-character-sheets/tree/master/Das_Schwarze_Auge_5) einsehbar. 

### Kontakt

* [Discord](https://discord.gg/KT5qj9)
* Email: (gebhardthbs@web.de)
* [Patreon](https://www.patreon.com/user?u=118076)
