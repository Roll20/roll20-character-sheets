Feuille de personnage avec jets int&eacute;gr&eacute;s et script API optionnel pour le JdR g&eacute;n&eacute;rique Cypher System, par [Monte Cook Games](http://www.montecookgames.com/games/).

Elle est aussi utilisable (et styl&eacute;e) pour _Numen&eacute;ra_ (modulo la gestion du surco&ucirc;t de port de l'armure) ou _The Strange_ (modulo la gestion des r&eacute;cursions, qui n&eacute;cessitera plusieurs personnages/feuilles de personnage).

La VF s'appuie sur la traduction de Numen&eacute;ra par Black Book Editions.

# Version courante :
Version 1.7 (17 Septembre 2017) :

* Capture d'&eacute;cran [style Cypher System g&eacute;n&eacute;rique](CypherSystem.png)
* Capture d'&eacute;cran [style Numen&eacute;ra](CypherSystem_style_Numenera.png)
* Capture d'&eacute;cran [style The Strange](CypherSystem_style_TheStrange.png)

# Utilisation basique :

## Mettre en place la feuille de personnage
1. Dans la campagne Roll20 concern&eacute;e, cliquer sur _"Voir les d&eacute;tails"_
2. Cliquer sur _"Campaign Settings"_
3. Descendre dans la page de Settings jusqu'&agrave; voir _"Character Sheet Template"_
4. Dans la liste d&eacute;roulante, choisir _"Cypher System (French)"_ sous _"Cypher System"_
5. Descendre dans la page et cliquer sur _"Save changes"_

Alternative (permettant de modifier les sources &agrave; votre convenance si vous avez un compte _"Pro"_) :

1. Dans la campagne Roll20 concern&eacute;e, cliquer sur _"Voir les d&eacute;tails"_
2. Cliquer sur _"Campaign Settings"_
3. Descendre dans la page de Settings jusqu'&agrave; voir _"Character Sheet Template"_
4. Dans la liste d&eacute;roulante, choisir _"Custom"_
5. Dans l'onglet _"HTML Layout"_, coller le contenu de ce [fichier HTML](CypherSystem.htm)
6. Dans l'onglet _"CSS Styling"_, coller le contenu de ce [fichier CSS](CypherSystem.css)
7. Descendre en bas de la page et cliquer sur _"Save Changes"_

## Cr&eacute;er un personnage et son pion
1. Cr&eacute;er un _"Character"_ dans le journal
2. Modifier un pion (token) comme sur cette [image](CypherSystem_setup_the_character_token.jpg) :
  1. S'assurer que le pion repr&eacute;sente le personnage
  2. S&eacute;lectionner l'attribut _"might"_ pour la bar 1
  3. S&eacute;lectionner l'attribut _"speed"_ pour la bar 2
  4. S&eacute;lectionner l'attribut _"intellect"_ pour la bar 3
4. S&eacute;lectionner le pion
5. Modifier le personnage (_"Edit"_) et cliquer _"Use Selected token"_ dans _"Default Token"_
6. Cliquer _"Save Changes"_
7. R&eacute;p&eacute;ter les &eacute;tapes 1 &agrave; 6 pour les autres personnages.

# Mettre en place le script API (optionnel) :
1. Dans la page d'affichage du d&eacute;tail de la campagne concern&eacute;e, cliquer sur _"API Scripts"_
2. S'il existe d&eacute;j&agrave; d'autres scripts que vous avez ajout&eacute;s, cliquer sur _"New Script"_
3. Donner un nom au script dans _"Name"_ (par exemple : _"Cypher"_)
4. Dans la section noire de la page, coller le contenu de ce [script API](https://github.com/Roll20/roll20-api-scripts/blob/master/CypherSystemSheet/cyphersystemsheet.js)
5. Cliquer sur _"Save Script"_

Le script API permet que l'&eacute;tat du personnage soit automatiquement mis &agrave; jour en fonction de la perte de points de caract&eacute;ristiques, d'appliquer la perte de caract&eacute;ristique &agrave; partir des jets dans le chat, de remettre &agrave; z&eacute;ro les param&egrave;tres de jet, de reposer compl&egrave;tement le personnage en un clic.

# Notes de version

## Version 1.7 (17 Septembre 2017)
Optimisation technique.

## Version 1.6 (21 Février 2016)
Changements esthétiques, pour faciliter l'accès au bouton de suppression de ligne répétable, et diminuer la hauteur des lignes répétables.

## Version 1.5 (21 Décembre 2015)

* Nouvelles sections "Attaques" (1 par caractéristique) avec jets intégrés, prenant en compte le niveau de compétence, le coûts, les dégats etc.
* Les jets de Caractéristiques et Compétences ne demandent plus/n'utilisent plus les efforts aux dégâts (utilisez les nouvelles sections Attaques en lieu et place)
* Nouvelles options pour simplifier les jets : choisissez si le jet demande/utilise les Atouts, Bonus et Coûts. Le paramétrage par défaut est désormais de ne pas les utiliser.
* Les boutons "Noms" (affichage des détails d'éléments dans le chat) ont été remplacés par des boutons image "Info"
* Les boutons d'info peuvent être glisser/déposer dans la barre de macro
* Nouveaux boutons d'info pour l'équipement (divers et consommables)
* Correction d'un bug : le calcul du coût des efforts prend désormais en compte correctement le Curseur de Dégâts du personnage

## Version 1.4 (21 Novembre 2015)
[Voir le détail sur le forum Roll20](https://app.roll20.net/forum/post/2357046/cypher-system-core-rule-book-sheet/?pageforid=2645489#post-2645489)

* Nouvelle option de la feuille pour choisir le type de paramétrage des jets : via la section Action ou via Questions (type macro)
* Nouveaux boutons pour montrer dans le chat le détails des Aptitudes Spéciales, Cyphers et Artefacts

## Version 1.3 (25 Octobre 2015)

* Correction des jets avec Difficult&eacute; et Incapacit&eacute; : la difficult&eacute; finale est correctement affich&eacute;e,
* Action : champs de saisie remplac&eacute;s par des listes d&eacute;roulantes pour une meilleure prise en compte des mises &agrave; jour par Roll20,
* Possibilit&eacute; de saisir des Avantages n&eacute;gatifs (handicaps),
* Remplacement du mot-cl&eacute; "Target" dans le code HTML et template permettant l'utilisation de macros custom.

## Version 1.2 (4 Octobre 2015)
Le script API doit &ecirc;tre mis &agrave; jour en version 1.2.

* Possibilit&eacute; de changer le style / l'apparence de la feuille d'un PJ (en choisissant Cypher System, Numen&eacute;ra ou The Strange) ou en feuille de PNJ.
* &Agrave; la demande d'utilisateurs de la FdP, le template de jet de stats et comp&eacute;tences a &eacute;t&eacute; unifi&eacute;, en ne lan&ccedil;ant qu'un seul d20 dont le r&eacute;sultat brut est affich&eacute;. Si le param&egrave;tre de difficult&eacute; n'est pas pas renseign&eacute; dans le groupe "Action" (=0), la difficult&eacute; battue n'est plus calcul&eacute;e (du fait de limitations technique de Roll20), mais seulement les niveaux la diminuant ou l'augmentant.
* Ajout d'une section pour la saisie des Art&eacute;facts, avec un bouton de jet d'&eacute;puisement.
* Ajout d'un bouton API au template de Jet de Gu&eacute;rison pour mettre &agrave; jour l'&eacute;tape suivante sur la feuille de personnage.

## Version 1.1 (Septembre 2015)
Cr&eacute;ation de la FdP VF.
