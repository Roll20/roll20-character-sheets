# Chroniques Oubli&eacute;es Fantasy

_A french fantasy RPG based on the D20 system / OGL 3.5._

Chroniques Oubli&eacute;es Fantasy est un jeu de r&ocirc;le m&eacute;di&eacute;val-fantastique complet bas&eacute; sur le syst&egrave;me d20/OGL 3.5.

Cette feuilles de personnage inclue quelques jets et r&egrave;gles optionnelles.

Il est aussi possible d'utiliser cette fiche pour jouer avec l'ensemble de règles des Terres d'Arran.

Le jeu complet, des suppl&eacute;ments et des t&eacute;l&eacute;chargements gratuits sont disponibles sur le site de l&apos;&eacute;diteur [Black Book Editions](http://www.black-book-editions.fr/catalogue.php?id=13).

# Version courante
4.04 [Screenshot](co_v3.jpg)

# Notes de version
## v5.00 (2021-07-09)
* Ajout d'une partie dédiée pour l'interaction avec le script
* Ajout d'un type de dégâts drain
* Passage en legacy=false

## v4.04 (2021-02-01)
* Séparation des capacités en titre + texte
* Ajout d'un texte pour les voies

## v4.03 (2020-11-27)
* Possibilité de ne plus avoir le bonus de base en attaque égal au niveau

## v4.02 (2020-10-28)
* Ajout de l'équipement pour les PNJs
* Attributs plus fins pour les richesses

## v4.00 (2020-10-14)
* Support des règles des Terres d'Arran
* Ajout d'une ligne d'effets pour les consommables
* Affichage des compétences en mode édition et non-éditable pour un meilleur rendu.

## v3.7 (2020-09-16)
* Utilisation du même attribut en mode PJ et PNJ pour les PVs, les DM temporaires et la RD

## v3.6 (2020-09-11)
* Passage de cases à valeur pour les points de récupération

## v3.4 (2020-08-06)
* Utilisation des modificateurs dans les options d'attaque
 * avantage et désavantage
 * attaque automatique et sans dégâts
 * dégâts temporaires
 * un peu de logique sur les dés de dégâts
* Des options d'attaque communes à toutes les attaques (attaque de groupe, attaque risquée, attaque assurée,... )

## v3.3 (20020-06-19)
* Ajout d'options pour les attaques (pour l'instant utilisées par le script)

## v3.2 (2020-05-07)
* Ajout de l'armure et du bouclier chez les PNJs
* Suivi des PVs vers les pnj_pv pour les cas de mauvais lien d'attribut d'un PNJ
* Ajout du casque sur la fiche PJ
* Labelisation automatique des attaques
* Copie des attaques de PJ vers PNJ quand on change le type de personnage.

## v3.1 (2020-04-16)
* Ajout des couleurs introduites avec les boîtes Chroniques Oubliées
* Ajout d'un champ `degat2` dans le roll template (pour rajouter des dégâts non multipliés en cas de critique)
* Essai en enlevant un champ avec accant (créature) de la partie script, pour voir si c'est la cause de l'erreur de syntaxe quand on importe la fiche (pas d'erreur si on copie-colle)

## v3.0 (2020-01-21)
* Utilisation d'options pour l'affichage ou non des règles optionnelles, qui sont maintenant dans la partie caractéristique, et non équipement
* Capacités raciales et langues passent dans l'onglet capacités
* Ajout d'un onglet Options pour régler ce qu'une fiche particulière doit afficher
* Possibilité d'ajuster les points de chance

## v2.2 (2019-07-15)
* Ajout d'un bouton pour faire le jet d'épuisement magique
* Changement des noms de jets : ils commencent tous par "roll", pour être accessibles tels quels depuis les macros.

## v2.1 (2019-01-08)
* Ajout de la type de feuille de personnage PNJ
* Importation des stats depuis un statblock pour les PNJs

## v2.0 (2018-11-19)

* Ajout de tabs pour gagner de la place
* Possibilité d'afficher 3 voies de plus

## v1.9 (2017-10-02)

* Jets d'arme : la propriété spéciale est affichée dans le chat (permettant d'ajouter des jets avec "[[1d6+2]] dégâts de feu" par exemple)

## v1.8 (2017-09-17)

* Correction : les caractéristiques au-dessus de 30 ne provoquent plus de message d'avertissement

## v1.7 (2016-11-27)

* Ajout de l'état Normal ou Affaibli : les D20 des Tests deviennent des D12 à l'état Affaibli (y compris pour les Attaques et les Jets de Capacités)
* Ajout de zones de saisie des Malus d'Armure et Bouclier aux Tests de DEX
* Ajout d'une case à cocher pour l'Armure et le Bouclier : si cochée, la DEF tient compte de l'Armure ou du Bouclier, et le Malus de d'Armure correspondant s'applique aux Tests de DEX
* Modification des options de Tests  de Caractéristiques :
  * N-Normale : les Tests se font avec 1D20
  * S-Supérieure OU Héroïque : les Tests se font avec 2D20 dont on garde le meilleur
  * H-Supérieure ET Héroîque : les Tests se font avec 2D20 dont on garde le meilleur, et s'il est inférieur à 10, le jet "prend 10".

## v1.6 (2016-11-01)

* Légère refonte de la mise en page
* Ajout d'un champ "Portée" pour les Armes/Attaques
* Ajout d'une sélection de mode de jet pour les jets de capacités : Normal, garder le plus haut score, garder le score le plus faible (permet de gérer les jets avec caractéristiques supérieures par exemple)
* Ajout du nom du personnage sur le template de chat de tous les jets
* Ajout d'une zone de notes/divers

## v1.5 (2016-07-13)

* Ajout d'une zone texte de saisie des RD (Réductions de dégâts) à titre indicatif (pas d'effet mécanique)
* Ajout d'une section répétable de jets paramétrables (+description) dans la section Capacités (Voies)

## v1.4 (2016-07-09)

* Niveau renseigné par défaut à 1 sur un nouveau personnage, pour éviter les erreurs de jet de dés
* Quelques austements visuels
* Hébergement des images sur Github plutôt que G+

## v1.3 (2015-11-06)

* Gestion de la règle optionnelle des caractéristiques supérieures
* Affichage des dégâts doublés sur attaque critique

## v1.2 (2015-07-27)
Am&eacute;lioration de la lisibilit&eacute; des infos-bulles des jets de d&eacute;.

## v1.1 (2015-07-06)
Correction du jet de Dext&eacute;rit&eacute; et de l'info-bulle "R&eacute;cup&eacute;ration".

## v1.0 (2015-06-27).
Cr&eacute;ation.
