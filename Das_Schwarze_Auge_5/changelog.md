## 1.2.3
 - 09.10.2018

 ### Fixes
 - Versionsnummer korrigiert
 - editierbarer Eigenschaftsbasiswert ist nun auch im NPC Sheet ersichtlich


## 1.2.2
 - 26.09.2018

 ### Features
 - Zauber & Liturgie Bogen wurde überarbeitet, Infos zum Zauber/Liturgien/magische SF finden sich nun in einem eigenen Tooltip, Angaben wurden aus der Regelwiki kopiert
 - Anmerkungsfeld für Zauber/Liturgien/magische SF wurden hinzugefügt
 - Data-i18n Tags für die Übersetung des Charakterbogens in andere Sprachen wurden hinzugefügt, Tags für Subtags im Rolltemplate fehlen noch

 ### Visuelles
 - Hinweis für Erleichterungswürfe wurde hinzugefügt

## 1.2.1
 - 14.07.2018

 ### Bugfixes
 - Durch die Auswahl von Aura verbergen und Flugsalbe wurden bisher beide Sonderfertigkeiten aktiviert, Fehler wurde behoben 

## 1.2.0
 - 31.07.2018

 ### Features
 - Initiative Wurf wurde um 2 Nachkommastellen die dem INI-Basiswert entsprechen ergänzt. Also INI 12 entspricht nun 12.12 + 1W6. Sollten Durch würfeln identische Werte entstehen sind diese nun eher unterscheidbar. Zusätzlich ist dies auf 4 Nachkommastellen durch einen W99 erweiterbar. Dafür geht unter der Konfiguration auf den neuen Tab 'Hausregeln' auf die entsprechende Option. Weitere Informationen dazu findet man in der [Anfrage des Features](https://github.com/Meteox/roll20-character-sheets/issues/5)
 - Die unnützen "Max" Felder für Eigenschaften wurden gegen Mod Felder ausgetauscht. Damit sind nun temporäre Modifikationen der Werte abbildbar
 - Berechnungen für Dunkelsicht wurden implementiert, dabei wurden die Attributsnamen für Dunkelsicht verändert. Der Vorteil muss erneut ausgewählt werden sofern ihr über diesen verfügt.
 - Im Inventar ist nun eine Spalte um die Anzahl der Gegenstände darzustellen, wird zudem ein Gewicht angegeben erfolgt die Gewichtsberechnung in Höhe der Anzahl der Gegenstände
 - Attacken und TP-Wurf mit Schilden wurde implementiert

 ### Inhalte
 - Vor- und Nachteile Tab wurde überarbeitet, beinhaltet nun Toolstips mit Infos aus der Regelwiki & Angaben ob automatische Berechnungen stattfinden
 - Kampf im Wasser Regeln aus dem Aventurischen Kompendium implementiert
 - Basismanöver Unterlaufen wurde implementiert

 ### Visuelles
 - Fehlender Abstand im Talentbereich zwischen den Spalten BE und Stg. wurde hinzugefügt
 - Überlauf von Angaben in die nächste Zeile bei Zaubern & Ritalen behoben
 - Rolltemplate für Fernkampf-TP hinzugefügt

 ### Bugfixes


## 1.1.0
 - 17.07.2018

 ### Features
 - Automatische Berechnungen werden nun mit der Zeit von Auto-Calc Feldern in Worker Sheets umgewandelt, dies hat zur Folge das kompliziertere Berechnungen möglich sind.
 - Spezialmanöver haben nun (fast) alle ein eigenes Makro für die Chatausgabe. Dabei werden automatisch Erschwernisse bei der Berechnung berücksichtigt. Außerdem sind diese mit Basismanövern sofern dies Regeltechnisch geht kombinierbar. Spezialmanöver mit besonderen TP Berechnungen haben dafür auch ein eigenes Makro erhalten. Dieses Feature wird in Zukunft auch auf andere Teile des Bogens erweitert.
 - Tooltips wurden mit aus der Regelwiki verfügbaren Informationen erweitert. Aktuell betrifft dies nur die Spezialmanöver. Dieses Feature wird in Zukunft auch auf andere Teile des Bogens erweitert.
 - Durch den Klick auf 'Beritten' im Kampftab werden alle relevanten aktivierten SF, Manöver und Modifikatoren angezeigt/ausgeblendet. Modifikatoren werden während diese ausgeblendet sind ignoriert.
 - Kampf mit Nebenhand wurde hinzugefügt, Erläuterungen zur Benutzung findet ihr im [Readme](https://github.com/Meteox/roll20-character-sheets/blob/master/Das_Schwarze_Auge_5/readme.md)
 - Beihändiger Kampf wurde hinzugefügt, Modifikatoren durch Vorteil Beidhändig und die Beidhändiger Kampf SF werden berücksichtigt

 ### Inhalte
 - Zaubertricks aus VR03 AM1 wurden eingepflegt
 - Zauber aus VR03 AM1 wurden eingepflegt
 - Rituale aus VR03 AM1 wurden eingepflegt
 - Toolstips für Kampfstile eingefügt
 - Basis- & Spezialmanöver aus VR01 GRW, VR02 AK und VS01 AB1 wurden inkl. Berechnungen integriert
 - Kampfstile aus VR02 AK wurden inkl Berechnungen integriert
 - Spezialmanöver die einen Haltegriff vorraussetzen wurden zur leichteren Übersicht mit einem Handsymbol markiert.

 ### Visuelles
 - Der Tab 'Ausrüstung' unter 'Kampf' hat ein Facelift erhalten. Ungenutze Felder wurden entfernt und die Übersichtlichkeit verbessert.

 ### Bugfixes
 - Anzeige Fehler im Sonderfertigkeitentab behoben
 - Berechnung von Kampf im/unter Wasser zusammen mit Sonderfertigkeiten war inkorrekt, wurde mit Worker Sheet implementiert
 - HTML-Code bereinigt: Dateigröße um ~35% reduziert
 - Tooltip-Anzeigen sind wieder flexibel und der Text geht nicht über den Tooltip hinaus
 - Beim Lanzenangriff wurde fälschlicherweise eine Erschwernis von 2 mit einberechnet und angezeigt


## 1.0.0
 - 10.07.2018 
 
 ### Features 
 - Changelog wurde erstellt
 - Globale Option hinzugefügt um Proben an alle/GM/selbst zu senden 
 - Globale Option hinzugefügt um die Frage nach Modifikatoren bei Proben ein/aus zu schalten
 - visuelle Anzeige wofür automatische Berechnungen stattfinden inkl. Tooltip mit Hinweisen, bisher nur bei Aktivierung der Kampfsonderfertigkeiten
 - Versionsanzeige mit Verlinkung auf den Changelog
 - Verlinkung auf Anleitung (WIP)
 - Verlinkung auf Bugtracker
 
 ### Inhalt
 - Allgemeine Sonderfertigkeiten & Berufsgeheimnisse aus VR02 AK ergänzt, inkl. Tooltip Verweise bei den Talenten
 - Kampfsonderfertigkeiten aus VR02 AK ergänzt, Vermerkung von Automatischen Berechnungen in der Aktivierungsliste
 - FK-Talent Feuerspeien aus VR02 AK ergänzt
 - Auflistung der Kampfstile und erw. Kampf-SF aus VR02 VK ergänzt
 - Zaubertricks aus VR03 AM1 ergänzt
 - Der allgemeine Magietab wurde in Zaubertricks umgenannt, Magische Sonderfertigkeiten haben Ihren eigenen Tab erhalten, Auswahl der Tradition & Leiteigenschaft ist nun von allen Magie Tabs ersichtlich
 - Kampfstile und erw. Kampf-SF aus VR02 AK sind aktivierbar, automatische Berechnungen folgen
 - Kampfstile bis Hruruzat sind mit Berechnung implementiert

 ### Bugfixes 
 - visuelle Darstellung der Liturgien und Rituale Proben im Chat behoben 
 - Inkludierung von Manöver Modifikationen aus der Passierschlag AT entfernt
 - Fehler in der HTML-Syntax gehoben
 - doppelte Einträge im CSS entfernt / optimiert
 - weitere nicht notierte Bugfixes