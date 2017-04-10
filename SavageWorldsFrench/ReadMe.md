# Savage Worlds (french)

Feuille de personnage (FdP) avec jets intégrés pour **Savage Worlds** et **Deadlands Reloaded**, basée sur le Livre de Base (LdB) de la version éditée en français par [Black Book Editions](http://www.black-book-editions.fr/catalogue.php?id=58).

# Version courante
1.8 [Capture d'écran](sawofr.jpg)  
[Style Deadlands](sawofr_style_deadlands.png)

#Notes sur les Jets

##Pénalités
Les pénalités de jet dues aux Blessures, à la Fatigue et à l'Encombrement sont automatiquement prises en compte dans les 3 modes de jet (voir ci-dessous).  
Dans les 2 modes d'affichages par template, l'état du personnage peut être optionnellement affiché (activé par défaut), rappelant ces éventuelles pénalités :  
![Affichage des pénalités dans les jets avec template](sawofr_template_penalistes.png)

##Modes d'affichage des jets
La feuille permet 3 modes d'affichage des jets :  
![Choix du type de jet](sawofr_choixjet.png)  
Ces options sont détaillées ci-dessous.

Ce choix se fait par personnage, dans l'onglet Configuration, et peut être changé à tout moment (on peut passer de l'un à l'autre, au besoin).

Quel que soit le mode choisi, un modificateur ponctuel/circonstanciel est toujours demandé :  
![Modificateur au jet](sawofr_modificateur.png)  
Un modificateur du même type est demandé pour le jet de dégâts intégré aux jets d'attaques.

Dans le cas des Jets de Lancer, de Tir, ou d'armes/attaques utilisant une de ces compétences, la Portée est demandée et intégrée au jet :  
![Portée des Tirs et Lances](sawofr_portee.png)

Pour les jets de Tir, l'utilisation du Dé Joket est optionnelle (pour gérer les Cadences de Tir supérieures à 1) et son utilisation doit être confirmée :  
![Utilisation Dé Joker](sawofr_dejokerutil.png)

###Option 1 : Succès + Relances
Les jets demande une difficulté, ou une cible pour les jets d'attaques et dégâts si l'option est activée, avant de lancer les dés.  
![Demande d'une difficulté](sawofr_difficulte.png)  
Une cible dans Roll20 est un autre pion, lequel doit être associé à une feuille de personnage dont les caractéristiques ont été renseignées.  
![Choix d'une cible](sawofr_cible.png)

Le choix d'une cible ou le renseignement d'une difficulté permet de calculer et d'afficher la réussite du jet (d'attribut, de compétence, d'attaque ou de dégâts) avec les possibilités de résultat suivantes :

* Échec (0 succès+relances),
* Succès sans relance (1 succès+relances)
* Succès+Relances :
  * résultat de 2 : un succès et une relance
  * résultat de 3 : un sucècs et 2 relances
  * etc. (nombre de relances = résultat affiché -1)

Le détail du calcul (et du résultat individuel des dés) est visible dans l'info-bulle du jet :  
![Détail des calculs](sawofr_infobulleoption1.png)

Dans le cas des attaques, en cas de relance, 1d6 explosif est automatiquement ajouté aux jets de dégâts :  
![Template option 1](sawofr_templateoption1.png)  
NB : techniquement, aboutir à ce résultat contraint à lancer 2 fois le jet de dégâts (une fois avec, une fois sans le +1d6!!) et d'afficher l'un ou l'autre en fonction de la réussite de l'attaque (si relance donc). De fait, avec les dés 3D activés, cela peut apparaître un peu ... confus (beaucoup de dés sont lancés).

###Option 2 : Total des jets
La feuille ne demande pas d'autre renseignement que les éventuels Modificateurs circonstanciels (cf. ci-dessus), effectue le jet demandé (y compris dégâts s'il s'agit d'une arme/attaque) et affiche un template avec le total de chaque jet.  
Le détail du calcul (et du résultat individuel des dés) est visible dans l'info-bulle du jet.  
![Jet total et détail des calculs](sawofr_infobulleoption2.png)  
Au MJ et/ou aux joueurs de calculer la réussite ou l'échec, les relances éventuelles etc.

Dans le cas d'attaque, le d6 explosif de dégâts supplémentaires en cas de relance est directement lancé, et affiché à part (au MJ et/ou aux joueurs de le prendre en compte si nécessaire) :  
![Template option 2](sawofr_templateoption2.png)

###Option 3 : Jets bruts
La feuille ne demande pas d'autre renseignement que les éventuels Modificateurs circonstanciels (cf. ci-dessus), effectue le jet demandé (y compris dégâts s'il s'agit d'une arme/attaque) et l'affiche entièrement détaillé dans le chat, façon "macro", sans template.  
Dans le cas d'attaque, le d6 explosif de dégâts supplémentaires en cas de relance est directement lancé, et affiché à part (au MJ et/ou aux joueurs de le prendre en compte si nécessaire).  
![Jet option 3](sawofr_jetoption3.png)

#Autres Notes

## Mise en place des pions
Les 3 "barres"/propriétés visibles des pions peuvent être associées à n'importe quel attribut de la FdP, à votre convenance.  
Il n'y a (pour l'instant) aucun automatisme lié à ces propriétés.

##Raccourcis/barre de macro
Tous les boutons peuvent être glissés/déposés dans la barre de macro pour créer un bouton "raccourcis".  

##Pouvoirs
Aucun jet/automatisme n'est pour l'instant intégré dans la FdP concernant les Pouvoirs, si ce n'est de pouvoir les saisir et les montrer dans le chat.
Les suggestions sont les bienvenues à ce sujet.  
NB : décrémenter les PP automatiquement au lancement d'un pouvoir nécessiterait l'utilisation d'un script API, donc d'un compte "Pro".

# Notes de version

##v1.8 (2017-02-18)
Nouvelle correction d'un bug occasionnel de calcul de l'encombrement.

##v1.7 (2016-12-18)
Correction d'un bug occasionnel de calcul de l'encombrement.

##v1.6 (2016-07-30)

* Ajout d'un jet de compétence "Non entraîné", afin de pouvoir masquer toutes les compétences non entraînées et faire les jets tout de même
* Ajout d'une champ de saisie de "Notes" en fin de feuille
* Correction des compétences personnalisées : il est désormais possible de saisir un malus (<0)
* Ajout de la portée
* Légère remise en page sur l'affichage des pouvoirs dans le chat

##v1.5 (2016-02-28)
Correction d'affichage sous Firefox.

##v1.4 (2016-02-21)
Merci à Xo de Vorcen pour les tests !

* Configuration
  * Déplacement de la configuration dans un onglet dédié
  * Option d'affichage aux couleurs de Deadlands Reloaded
  * Option de configuration pour afficher/masquer les Possessions (masquée par défaut pour les PNJ et Extras)
  * Options de configuration pour afficher/masquer les compétences,  toutes ou une à une (sauf Tripes, dépendante du style Deadlands)
  * Option de configuration pour les jets : template de succès+relances (défaut), template de total de jets, ou "jets bruts" (pas de template)
  * Option de configuration pour les attaques avec succès+relances : choix entre cible/pion (défaut) ou saisie de difficulté
  * Option d'affichage ou non des états du personnage (Secoué, Blessures, Fatigue) dans le template de jet
* Feuille
  * Ajout de la caractéristique Trempe et la compétence Tripes, visibles uniquement en mode "Deadlands"
  * Correction : les bonus de dégâts peuvent être négatifs
  * Affichage adapté entre PJ/PNJ/Extra
  * Stylisation de l'état Secoué, des Blessures et de la Fatigue
  * Ajout un bouton d'affichage dans le chat de la description des pouvoirs
  * Ajout d'un bouton d'agrandissement/réduction des Atouts, Handicaps, Signes particuliers, Richesse, des notes d'Armes et Pouvoirs
* Jets
  * Possibilité de saisir un modificateur au jet de dégâts
  * Jet de dégâts avec +1d6!! dégâts en mode succès+relances si relance, affichage d'un jet supplémentaire de +1d6!! dans les autres modes
  * Amélioration de l'affichage des résultats de jets en mode succès+relances (indicateur d'échec, succès sans relance et succès+relances)
  * Correction des malus de jets en état critique (-3 pour les Blessures et -2 pour la Fatigue)

##v1.2 (2015-12-22)
Equipement / Inventaire / Encombrement : ajout du poids individuel, gestion des poids décimaux, correction d'un bug lors de la suppression d'une ligne.

##v1.1 (2015-11-30)
Merci à The Aaron pour son script [TAS](https://github.com/shdwjk/TheAaronSheet).

* Ajout de sheet workers (nouveauté technique Roll20) pour :
    * alléger le recalcul des caractéristiques dérivées
    * automatiser le calcul automatique du poids total de l'équipement et donc de l'encombrement éventuel
    * éviter de saisir 2 fois la compétence des armes, selon le mode de jet choisi sur la feuille
* Ajout de l'affichage de la compétence utilisées dans les jets d'Armes.
* État du personnage plus détaillé dans les jets

##v1.0 (2015-11-16)
Création de la fiche.
