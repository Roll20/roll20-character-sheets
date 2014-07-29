**Note** : there's an english version of the very same sheet/macros/scripts, for those interested.
See [Numenera_NathasNumenera_English](https://github.com/Roll20/roll20-character-sheets/tree/master/Numenera_NathasNumenera_English).

Basée sur la feuille de personnage "Numenera" déjà présente sur Roll20 (merci aux auteurs originaux), cette version a une mise en page et des attributs différents, et peut être utilisée avec des scripts d'API et macros associées (voir ci-dessous).
Voir en fin de fichier pour les notes de versions.

# Utilisation basique : 
## Mettre en place la feuille de personnage
1. Dans la campagne Roll20 concernée, cliquer sur _"Voir les détails"_
2. Cliquer sur _"Campaign Settings"_
3. Descendre dans la page de Settings jusqu'à voir _"Character Sheet Template"_
4. Dans la liste déroulante, choisir _"Custom"_
5. Dans l'onglet _"HTML Layout"_, coller le contenu de _"NathasNumenera_Roll20_CharacterSheet_Layout_French.htm"_
6. Dans l'onglet _"CSS Styling"_, coller le contenu de _"NathasNumenera_Roll20_CharacterSheet_CSS.css"_
7. Descendre en bas de la page et cliquer sur _"Save Changes"_
## Créer un personnage
1. Créer un _"Character"_ dans le journal
2. Remplir le nom, et dans l'onglet _"Character Sheet"_, remplir à minima les 3 Attributs (Valeur et Max) : Robustesse, Vivacité et Mental
3. Utiliser un pion (token)et : (voir la capture d'écran _"NathasNumenera_setup_the_character_token.jpg"_)
  1. S'assurer que le pion représente le personnage Make sure it representents the character you've created
  2. Sélectionner l'attribut _"might"_ pour la bar 1
  3. Sélectionner l'attribut _"speed"_ pour la bar 2
  4. Sélectionner l'attribut _"intellect"_ pour la bar
4. Sélectionner le pion
5. Modifier le personnage (_"Edit"_) et cliquer _"Use Selected token"_ dans _"Default Token"_
6. Cliquer _"Save Changes"_
8. Répéter les étapes 1 à 6 pour les autres personnages.

# Utilisation avancée : 
1. Mettre en place le HTML et le CSS pour la feuille de personnage (cf. Utilisation basique)
2. Mettre en place les scripts API :
  1. Dans la page d'affichage du détail de la campagne concernée, cliquer sur _"API Scripts"_
  2. S'il existe déjà d'autres scripts que vous avez ajoutés, cliquer sur _"New Script"_
  3. Donner un nom au script dans _"Name"_ (par exemple : _"NathasNumenera"_)
  4. Dans la section noire de script, coller le contenu de _"NathasNumenera_Roll20_API_French.js"_
  5. Cliquer sur _"Save Script"_
3. Démarrer la campagne et créer les macros (voir le fichier _"NathasNumenera_Roll20_Macros_French.txt"_)
4. Créer une personnage  et associer un pion (cf. Utilisation basique) 
5. **COMPLETER LA FEUILLE DE PERSONNAGE** (important) : en plus des Attributs (valeur et max), à minima renseigner les Atouts (même si égaux à 0), le bonus de Récupération, la réduction de Vivacité dûe à l'armure (même si égale à 0), l'état de Récuparation (cliquer sur "1 Action"), l'état général (cliquer sur "Normal")
6. Sélectionner le pion et tester une macro. Si rien ne passe, tenter de désactiver/réactiver le script API et recommencer.
7. Répéter les étapes 4 à 6 pour les autres personnages.

# Notes de version
## Version 2.0 (29/07/2014)
1. Mise à jour de **NathasNumenera_Roll20_CharacterSheet_Layout_French.htm** :
  1. Section "Avancement" plus détaillées, avec un attribut par avancement et par tiers.
  2. Vous pouvez supprimer des personnages existants les attributs xp-stats, xp-edge etc... qui ne seront plus utilisés.
2. Refonte et traduction du "ReadMe.md"
3. Nouvelle capture d'écran / feuille
4. Mise à jour de sheet.json pour intégrer la nouvelle capture d'écran
