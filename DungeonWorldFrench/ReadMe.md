# Dungeon World VF

Feuille de Personnage en français pour [Dungeon World V1 et V2](http://dungeonworld.pbta.fr/).
Basée sur la feuille VO de Willem den Besten (Morenim) et Devindra Payment (@Ardnived) ... et considérablement modifiée.

# Version courante
3.5 [Capture d'écran](dwfr.png)

# Notes de version

## v3.5 (2019-01-29)

* Correction d'un bug dans le comptage des sorts préparés
* Amélioration esthétique des boutons de sections répétables

## v3.4 (2017-09-17)

* Optimisation technique

## v3.3 (2017-02-18)

* Correction d'une anomalie occasionnelle dans la totalisation automatique de l'encombrement

## v3.2 (2016-12-18)

* Dans les actions appropriées, ajout d'un modificateur en saisie, à ajouter au jet de dégâts
* Ajout d'une section "Divers"
* Déplacement de l'onglet "Notes" dans la section "Divers"
* Ajout d'une section répétable pour la gestion des Recrues dans la section "Divers"
* Correction d'une anomalie occasionnelle dans la totalisation automatique de l'encombrement
* Correction technique interne sur la gestion des retours à la ligne dans les Actions

## v3.1 (2016-11-21)

* Ajout de 2 options, pour des bonus interactifs aux jets et dégâts
* Ajout d'un onglet "Notes" ... pour noter des choses
* Info-bulle plus détaillée des jets dans le roll template / chat

## v3.0 (2016-08-12)

Adaptation pour [Dungeon World VF V2](http://www.500nuancesdegeek.fr/dungeon-world-v2/) :

* Ajout des nouvelles classes (+ Ranger devient Eclaireur)
* Ajout des nouvelles actions de base, spéciales et de départ
* Toutes les actions avec jets gèrent désormais les résultats 12+, 10+, 7 à 9, 6-

## v2.0 (2016-03-06)

Merci à Acritarche, Antoine P., MaxiMax, Eric Nieudan et les autres pour leur aide, tests et retours.

* Tous les jets effectués depuis les boutons de la feuille s'affichent désormais dans le chat via un template, indiquant le nom du personnage, le nom du jet/de l'Action/du Sort, le type de jet/d'Action, et éventuellement (selon le jet/la configuration) : le jet de caractéristique, le jet de dégâts, la description, 0 à 3 informations complémentaires, indicateur de réussite / le résultat du jet (10+ ou 7-9 ou 6-)
* Ajout d'un peu de couleurs (tirées du logo) sur la feuille et le template de jet
* Ajout d'une liste déroulante de sélection d'une classe. Si une autre classe que "Personnalisée" est choisie, les informations suivantes sont automatiquement affichées/renseignées (tout en restant modifiables) : nom de la classe, base de PV, base de Charge, Dégâts de base, nombre de sorts et les Actions de départ
* Actions :
  * onglets séparés pour les actions de Base, Spéciales, de Départ, Avancées et les Sorts
  * Actions de Bases et Spéciales pré renseignées, modifiables dans une certaine mesure
  * Actions de Départ pré renseignées, si une classe est choisie, et modifiables dans une certaine mesure
  * Possibilité d'ajouter des actions "customs" pour tous les types d'Actions / onglets.
* Actions custom et Avancées :
  * coche "oeil" pour afficher/masquer la  description de l'action dans le template de jet de l'action
  * coche pour faire un jet  2d6+choix carac (ou aucune/0) dans le template de jet de l'action
  * coche pour faire un jet de dégâts dans le template de jet de l'action
  * ajout de 3 zones de texte pour afficher le résultat du jet (si jet il y a) sur 10+, 7-9 et 6-.
* Sorts :
  * Ajout d'une zone de saisie pour le niveau du sort
  * Ajout d'une coche "Préparé" (si cochée/décochée, met à jour le total de niveaux de sorts préparés, cf. ci-dessous)
  * Ajout d'une zone de saisie du nombre à ajouter au niveau pour calculer le maximum de niveaux de sort "préparables" (et affichage de ce maximum, donc)
  * Ajout d'une zone non saisissable affichant le total des niveaux des sorts cochés "préparés"
  * Ajout d'un bouton de jet de sort (affiche un template dans le chat, contenant à minima le nom du personange, le nom du sort et plus, selon les options choisies, voir ci-dessous)
  * Ajout d'une coche "oeil" pour  pour afficher/masquer la  description du sort dans le template de jet du sort
  * Ajout d'une coche et d'une zone de saisie pour un jet associé au sort (dégâts, soins etc.). Si cochée, jet effectué et résultat affiché dans le template de jet du sort
* Ajout du copyright VO et VF des textes de Actions

## v1.1 (2016-02-28)
* Ajout du logo
* Affichage légèrement plus compact
* Ajout du nombre d'utilisations (courante et maximum) dans le matériel
* Affichage direct de la base de PV et de la base de Charge
* Reformatage des sorts sur la colonne de droite, sous les actions

## v1.0 (2016-02-21)
Création de la fiche.

Différences par rapport à la feuille VO :

* le total de charge est auto-calculé (et non modifiable)
* les ajustements de caractéristique sont calculés par sheet worker, donc la valeur finale est directement accessible dans les attributs
* quelques modifications de mise en page

A noter que les noms d'attributs VO sont conservés. Il doit donc être possible de remplacer la feuille VO par la feuille VF dans une campagne existante. Il conviendra juste de cocher/décocher les états (ou faire +1/-1 sur les caractéristiques) pour provoquer le recalcul les ajustements de caractéristiques.

De nombreuses améliorations visuelles et fonctionnelles sont envisageables sur cette feuille assez basique : les suggestions sont donc les bienvenues.
