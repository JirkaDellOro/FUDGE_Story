# FUDGE_Story
A FUDGE module for the easy development of interactive stories, visual novels and simple adventure games


# References
- [APIs](https://jirkadelloro.github.io/FUDGE_Story/Documentation/Reference/#fudge-story-reference)
- [Pages-Link](https://jirkadelloro.github.io/FUDGE_Story/Tutorial_WS22/Tutorial_WS22.html)

## Bewertungskriterien
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU  

| Nr | Bezeichnung           | Inhalt |
|---:|-----------------------|------|
|    | Titel                 |   |
|    | Name                  |   |
|    | Matrikelnummer        |   |
|  1 | Konzeption     | Die Story der Visual Novel wird in einer kurzen Inhaltsangabe beschrieben und der Konzeption beigefügt. In dieser sind jegliche Diagramme (Decision-Tree-Diagrams), Scribbles sowie entweder ein Storyboard, ein Drehbuch oder Ähnliches enthalten.                                                                                                                            |
|  2 | Charaktersteckbriefe     | Kommen Archetypen zum Einsatz? Welche anderweitigen Charaktermodelle existieren (Steckbriefe)?                                                                                                                                                                                |
|  3 | Auswahlmöglichkeiten | Dialogoptionen stellen _branching plots_ zur Verfügung und lassen den Spieler zu einem gewissen Grad selbstbestimmt handeln. Sind derartige Entscheidungen vorhanden und unterscheidet sich der Dialog je nach getätigter Auswahl?                                                                                                                                                     |
|  4 | Branching paths      | Verzweigte Pfade bieten dem Spieler die Möglichkeit, seinen individuell präferierten Pfad zu verfolgen. Sind alle Variablen sinnvoll benannt und die Szenenhierarchie strukturiert und übersichtlich aufgebaut? Welche Szenen sind wie miteinander gekoppelt?                                                                                                                                                          |
|  5 | Transitions           | Transitions stellen Überblendungen z. B. zwischen Szenen dar und können leicht modifiziert werden. Kommen unterschiedliche Transitions zum Einsatz?                 |
|  6 |         Audio         | Sounds sind eingebunden und unterstützen oder ermöglichen die Wahrnehmung der Aktionen. Welche Ereignisse werden durch Geräusche akustisch unterstützt; durch welche Geräuschkulisse oder Musik die Atmosphäre? Gibt es ein auditiv geplantes Muster, bei dem zu ganz speziellen Events Sound / Musik abgespielt wird?                                         |
|  7 |         GUI            | Ein grafisches Interface gibt dem Nutzer die Möglichkeit, Einstellungen beim Programmstart oder während des Programmlaufs vorzunehmen. Was kann er dort tun? Wird z. B. auf ein Out-Of-Game-Menu oder ein sogenanntes Ingame-Menu zurückgegriffen? Alternativ kann eine Art von Skala, die sich unter bestimmten Bedingungen füllt oder leert (bspw. eine Lovebar / ein Love'O'Meter) eingebaut werden.[^1]      |
|  8 | Input-Feld(er)          | Input-Felder können verwendet werden, damit man dem Spieler die Option bietet, mithilfe einer Eingabe interne Zustände zu verändern. Wird dem Spieler die Möglichkeit gegeben z. B. seinen Namen einzugeben und wird dieser im Verlauf der Story verwendet? Sind weitere Input-Felder eingesetzt worden? Zu welchem Zweck?              |
| 9 | Animation      | Animationen können selbst definiert und auf Objekte angewendet werden. Wurden verschiedene Animationen bestimmt und kommen zur Verwendung?           |
| 10 | Styling          | Werden <b>alle</b> relevanten Elemente mithilfe von CSS gestylt und wurden zweckmäßig benannt?                |
| 11 | Creative Corner          | Umsetzung eines eigens konzipierten Alleinstellungsmerkmals (nach Absprache oder während der Konzeptvorstellungen)               |
| 12 | Enden            | Wurden verschiedene Spielenden eingebaut (mind. zwei)?                       |
|  A | Inventory- und Item-System     | Das Inventarsystem übernimmt das Management von hinzugefügten, konsumierbaren sowie nicht-konsumierbaren Items. Wird dieses System genutzt? Welche Items gibt es und was für Eigenschaften werden diesen zugeschrieben? Wozu existieren sie?|
|  B | Punkteverteilungssystem     | Ein Punktesystem kann bei den unterschiedlichsten Situationen zum Einsatz kommen. So können Punkte vergeben, abgezogen, berechnet und das Ergebnis ausgewertet werden. Gibt es hierfür ein geregeltes Schema, das die Punkteverteilung für das Verhalten des Spielers festlegt oder ähnliche Regeln?             |
|  C | Novel-Pages             | _Novel-Pages_ können eingesetzt werden, um weitere Textelemente mit ggf. besonderen Interaktionsmöglichkeiten auszustatten und einzublenden. Wie wurden Novel Pages umgesetzt und welche Interaktionsmöglichkeiten gibt es?                       |
|  D | Meter-bar             | Mithilfe des HTML-Elements `<meter>`  kann entweder ein skalarer Wert innerhalb eines bekannten Bereichs oder ein Bruchwert dargestellt werden (Anwendung finden kann dies zum Beispiel als Lovebar bzw. Love'O'Meter / damage-bar etc.). Wird dieses Element verwendet und unter welchen Bedingungen füllt sich die _meter-bar_ bzw. sinkt der Wert? Welchen Zweck erfüllt sie?



##  Abgabeformat

* Die vollständige Konzeption soll als .pdf-Dokument abgegeben werden.
  * Das Konzept enthält:
    * Decision-Tree-Diagrams
    * Charaktersteckbriefe
    * ggf. Scribbles, ein Drehbuch / eine Inhaltsangabe / ein Storyboard oder ähnlich
    * Vermerk zu selbstproduzierten Inhalten
* Platziere einen Link in der Readme-Datei deines VisualNovel-Repositories auf Github auf die fertige und in Github-Pages lauffähige Anwendung.
* Platziere ebenso Links zu den Stellen in deinem Repository, an denen der Quellcode und das Konzept-Dokument zu finden sind.
* Stelle zudem auf diese Art dort auch ein gepacktes Archiv <b>[Nachname_Vorname_VN-Titel]</b> zur Verfügung, das folgende Daten enthält
  * Das Konzept-Dokument 
  * Die Projektordner inklusive aller erforderlichen Dateien, also auch Bild- und Audiodaten


[^1]: siehe Punkt D "Meter-bar"
