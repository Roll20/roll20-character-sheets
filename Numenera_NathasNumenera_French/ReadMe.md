**Note** : there's an english version of the very same sheet/macros/scripts, for those interested.
See [Numenera_NathasNumenera_English](https://github.com/Roll20/roll20-character-sheets/tree/master/Numenera_NathasNumenera_English).

Bas&eacute;e sur la feuille de personnage "Numenera" d&eacute;j&agrave; pr&eacute;sente sur Roll20 (merci aux auteurs initiaux), cette version a une mise en page et des attributs diff&eacute;rents, et peut être utilis&eacute;e avec des scripts d'API (voir ci-dessous).
Voir en fin de fichier pour les notes de versions.

# Utilisation basique :

## Mettre en place la feuille de personnage
1. Dans la campagne Roll20 concern&eacute;e, cliquer sur _"Voir les d&eacute;tails"_
2. Cliquer sur _"Campaign Settings"_
3. Descendre dans la page de Settings jusqu'&agrave; voir _"Character Sheet Template"_
4. Dans la liste d&eacute;roulante, choisir _"Numenera (Nathas Version French)"_

Alternative (permettant de modifier les sources &agrave; votre convenance) :

1. Dans la campagne Roll20 concern&eacute;e, cliquer sur _"Voir les d&eacute;tails"_
2. Cliquer sur _"Campaign Settings"_
3. Descendre dans la page de Settings jusqu'&agrave; voir _"Character Sheet Template"_
4. Dans la liste d&eacute;roulante, choisir _"Custom"_
5. Dans l'onglet _"HTML Layout"_, coller le contenu de ce [fichier HTML](NathasNumenera_tabs.htm)
6. Dans l'onglet _"CSS Styling"_, coller le contenu de ce [fichier CSS](NathasNumenera_tabs.css)
7. Descendre en bas de la page et cliquer sur _"Save Changes"_

## Cr&eacute;er un personnage
1. Cr&eacute;er un _"Character"_ dans le journal
2. Remplir le nom, et dans l'onglet _"Character Sheet"_, remplir &agrave; minima les 3 Attributs (Valeur et Max) : Robustesse, Vivacit&eacute; et Mental
3. (Optionnel) Modifier un pion (token) comme sur cette [image](NathasNumenera_setup_the_character_token.jpg) :
  1. S'assurer que le pion repr&eacute;sente le personnage
  2. S&eacute;lectionner l'attribut _"might"_ pour la bar 1
  3. S&eacute;lectionner l'attribut _"speed"_ pour la bar 2
  4. S&eacute;lectionner l'attribut _"intellect"_ pour la bar 3
4. S&eacute;lectionner le pion
5. Modifier le personnage (_"Edit"_) et cliquer _"Use Selected token"_ dans _"Default Token"_
6. Cliquer _"Save Changes"_
8. R&eacute;p&eacute;ter les &eacute;tapes 1 &agrave; 6 pour les autres personnages.

# Utilisation avanc&eacute;e :
1. Mettre en place le HTML et le CSS pour la feuille de personnage (cf. Utilisation basique)
2. Mettre en place les scripts API :
  1. Dans la page d'affichage du d&eacute;tail de la campagne concern&eacute;e, cliquer sur _"API Scripts"_
  2. S'il existe d&eacute;j&agrave; d'autres scripts que vous avez ajout&eacute;s, cliquer sur _"New Script"_
  3. Donner un nom au script dans _"Name"_ (par exemple : _"NathasNumenera"_)
  4. Dans la section noire de la page, coller le contenu de ce [script API](NathasNumenera_API.js)
  5. Cliquer sur _"Save Script"_
3. Pas besoin de cr&eacute;er de macros, tous les boutons rouge sur la feuille utilisent les fonctions de l'API.

# Notes de version

##Release 4.0 (Mars 2015)
*Plus besoin de macros ! Et des templates!*

La feuille int&egrave;gre directement les boutons n&eacute;cessaires &agrave; la plupart des jets, et l'affichages des r&eacute;sultats se fait dans le chat avec la nouvelle fonctions de _templates_ de Roll20.

Les valeurs variables n&eacute;cessaires aux jets sont inclues en tant qu'attributs dans la feuille de personnage, &eacute;vitant la n&eacute;cessit&eacute; de cr&eacute;er des macros avec demande

Boutons verts : jets libres sans apppel de l'API et accessible &agrave; tous les types de comptes Roll20.

Boutons rouges : jets avec appels de l'API (cf. ci-dessus) pour une mise &agrave; jour automatique des attributs et de la feuille de personnage (d&eacute;pense de points, actualisation de l'&eacute;tat etc.).

Les autres attributs restent identiques à la version précédente, donc il est possible de mettre à jour votre campagne avec la nouvelle feuille de personnage (HTML et CSS) et conserver les personnages existants.

##Release 3.0 (05/11/2014)
*Nouvelle feuille de personnage avec onglets* (lisibilit&eacute; am&eacute;lior&eacute;e).<br/>Trois onglets : Principale (attributs, attaques, comp&eacute;tences, capacit&eacute;s sp&eacute;ciales), Numen&eacute;ra & &Eacute;quipement, Avancements & Background.

Les attributs Roll20 restent identiques &agrave; la version pr&eacute;c&eacute;dente  (ainsi que les macros et fonctions API), donc il est possible de mettre &agrave; jour votre campagne avec la nouvelle feuille de personnage (HTML et CSS) et conserver les personnages existants.


## Version 2.7 (22/09/2014)
Pas de modification de la feuille de personnage.
D&eacute;placemet des fichiers de scripts API et de Macros vers Gist.
Am&eacute;liorations du Readme.
Modifications des fonctions [API](https://gist.github.com/NathaTerrien/14536ac9eea2ca30023c) et des [Macros](https://gist.github.com/NathaTerrien/3198c37d2aa1eaff3c89) :
1. Nouvelle fonction/macro pour appliquer des d&eacute;g&acirc;ts au PNJ (le "Character" doit avoir les attributs "Health" et "Armor")
2. &Eacute;volution de la fonction et macros de jets : gestions des efforts aux d&eacute;g&acirc;ts et am&eacute;lioration de l'affichage dans le Chat.

## Version 2.2 (23/08/2014)
Encodage HTML de tous les accents (ReadMe.md, NathasNumenera_Roll20_Macros_French.md, NathasNumenera_Roll20_API_French.js, NathasNumenera_Roll20_CharacterSheet_Layout_French.htm).

## Version 2.1 (29/07/2014)
1. Mise &agrave; jour de **NathasNumenera_Roll20_CharacterSheet_Layout_French.htm** :
  1. Section "Avancement" plus d&eacute;taill&eacute;es, avec un attribut par avancement et par tiers.
  2. Vous pouvez supprimer des personnages existants les attributs xp-stats, xp-edge etc... qui ne seront plus utilis&eacute;s.
2. Refonte et traduction du "ReadMe.md"
3. Nouvelle capture d'&eacute;cran / feuille
4. Mise &agrave; jour de sheet.json pour int&eacute;grer la nouvelle capture d'&eacute;cran
5. Remplacement du fichier texte (.txt) des macros par un fichier markdown (.md) pour une meilleure lisibilit&eacute; sur Github ("NathasNumenera_Roll20_Macros_French.md")


