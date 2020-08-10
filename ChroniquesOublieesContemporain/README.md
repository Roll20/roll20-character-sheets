# Chroniques Oubliées Contemporain

_A french Contemporary RPG based on the D20 system / OGL 3.5._

Chroniques Oubliées Contemporain est un jeu de r&ocirc;le doté d'un système simple mais complet bas&eacute; sur le syst&egrave;me d20/OGL 3.5.

Cette feuilles de personnage inclut quelques jets et r&egrave;gles optionnelles.

Le jeu complet est disponible sur le site de l'éditeur [Black Book Editions](http://www.black-book-editions.fr/produit.php?id=4349).

# Version courante
3.3 [Screenshot](coc_v2.png)

# Notes de version

## v3.3 (2020-08-04)
* Génération automatique de lignes de ressources sur l'onglet équipement en fonction de l'univers choisi
* Ajout d'une liste de choix de surhumains permettant de générer automatique des lignes de ressources et/ou de déterminer les dés de vie, caractéristiques magiques, etc...

## v3.2 (2020-04-28)
* Modifications internes sur les champs INIT et DEF pour permettre la liaison de ces attributs avec un token (contourne un bug de Roll20 sur la liaison avec des champs auto-calculés)
* Ajout de cases à cocher pour chaque capacité (permet de remplir les voies à l'avance)
* Modifications cosmétiques (alignement des attributs sur le premier onglet de la fiche)

## v3.1 (2020-04-23)
* Déplacement des buffs généraux vers l'onglet **Capacités**
* Nouvelle présentation des buffs généraux :
    - Il s'agit à présent d'une liste répétable d'éléments
    - On indique le nom du buff, et la liste des attributs auxquels il s'applique, sous la forme _nom attribut : valeur de buff_, séparés par des virgules si le buff s'applique à plusieurs attributs.
    - Une case à cocher permet d'activer ou désactiver le buff
    - A chaque modification, les buffs par attributs sont recalculés et ré-assignés à la case **Divers** de chaque attribut.
    - On peut afficher le détail des buffs par attributs en cliquant sur la flèche appropriée.
* Remplacement des deux champs de modificateurs circonstanciels à l'attaque et aux dommages par deux listes répétables similaires à celles des buffs généraux
    - On indique le nom du modificateur et sa valeur.
    - Une case à cocher permet d'activer ou désactiver le modificateur.
    - Tant qu'une case est cochée, le modificateur correspondant est appliqué à chaque jet d'attaque et/ou de dommages.
    - Lorsqu'un modificateur d'attaque est activé ou désactivé, un buff général du même nom est recherché sur l'onglet **Capacités**, et s'il existe, celui-ci est synchronisé avec le modificateur d'attaque.
* Rappel sur les valeurs de buffs ou de modificateurs d'attaque :
    - Elles peuvent être une valeur fixe, _ex : Malingre : -1_
    - Elles peuvent être une référence à un attribut, _ex : Vue perçante : +[PER]_ pour utiliser le mod. de PERception
    - Elles peuvent être une référence à un rang dans une voie
        - Soit en utilisant les attributs RANG_VOIEx _ex : Pilote émérite : +[RANG_VOIE1]_ 
        - Soit en utilisant le nom de la voie tel qu'il a été entré dans l'onglet **Capacités**, _ex : Pilote émérite : [rang Pilotage]_ pour un bonus de +1 par rang dans la voie, ou _ex : Discrétion : 2[rang Furtivité]_ pour un bonus de +2 par rang
    - Elles peuvent être une formule mathématique mettant en oeuvre plusieurs attributs, _ex Tenue de combat : +[RANG_VOIE1*DEFARMUREON]_
* Sur l'onglet **Equipement**, les deux listes d'équipements sont maintenant regroupées en une seule, permettant de :
    - Gérer l'encombrement (reprise des règles du Compagnon COF) en indiquant pour chaque équipement, une valeur d'encombrement, un nombre en inventaire, et si ce nombre est possédé ou porté (et compte donc dans l'encombrement).
    - Saisir une description détaillée de l'équipement en plus de son nom
    - Ajouter une ligne d'attaque sur l'onglet **Caractéristiques** ou la supprimer, en cochant ou décochant la case appropriée.
    - Indiquer une liste de propriétés (séparées par des virgules) pour l'équipement, avec modification des données correspondantes sur l'onglet **Caractéristiques**. Les propriétés reconnues sont :
        - **DEF : _bonus_** pour le bonus de DEFense d'une armure
        - **RD : _valeur_** pour la valeur de Réduction des DM d'une armure
        - **DM : _(nb)d(faces)_** pour les dés de DM d'une arme
        - **ATD : _portée_** pour la portée d'une arme à distance (sinon c'est une attaque au contact)
    - _Exemples_
        - _DEF : 2, RD : 5_ (pour un gilet pare-balles)
        - _DM : 1d6, ATD : 10m_ (pour un pistolet léger)
* Sur l'onglet **Capacités**, les jets de capacités ont été modifiés pour permettre d'ajouter à un jet un bonus lié à une voie possédée par le personnage. Il suffit pour cela de :
    - sélectionner la voie dont la possession procure un bonus au jet
    - sélectionner le type de bonus obtenu pour chaque rang possédé (+1 ou +2 par rang dans la voie)

## v2.9 (2020-02-12)
* Déplacement des parties règles optionnelles vers le tab caractéristiques
* Utilisation de coc_settings pour précharger les options de règles par défaut

## v2.8 (2019-10-10)
* Modifications du sheetworker pour éviter erreurs dans la console API
* Homogénéisation des noms des roll buttons
* Séparation des buffs circonstanciels de combat en deux champs : un pour le jet d'attaque et un pour le jet de dommages

## v2.7 (2019-29-06)
### Fiche PJ, onglet Configuration
* Ajout d'un champ de buff pour les PV
* Ajout d'un sélecteur pour le mode de calcul des points de vie (lancer le DV ou utiliser la valeur moyenne du DV)

### Fiche PJ, onglet Caractéristiques
* Modification du roll-button de lancement de dé de vie en action-button permettant d'augmenter le niveau de 1
* Ajout d'un script sheet-worker pour recalculer / lancer les points de vie lorsque le niveau, le mod de constitution, le buff de PV ou le mode de calcul des PV est modifié

### Modifications globales
Modification des attributs name de tous les roll-buttons en "roll_nomJet" et ajout des attributs title
* Permet d'invoquer un jet de dés de la fiche de personnage depuis le chat en indiquant %{selected|nomJet} (si un token est sélectionné) ou %{nomPerso|nomJet}
* Permet d'afficher le nom du jet qui peut être utilisé dans le chat ou les macros

## v2.6 (2019-04-17)
### Fiche de PJ

* Possibilité d'appliquer plusieurs états préjudiciables en même temps
* Gestion de l'encombrement (idem COF)
* Ajout d'un champ de texte sous la liste d'attaques pour les buffs "temporaires"
 * Possibilité d'indiquer des buffs aux jets d'attaque et de dommages en langage quasi-naturel : le premier mot est le type d'attaque concernée, le deuxième est le modificateur (avec possibilité de référencer un autre attribut de la fiche en l'encadrant entre crochets []) et à partir du troisième, la description du buff.
 * Indiquer ATC (contact), ATD (distance), MAG (att. magique), MEN (att. mentale), pour les types d'attaques, ATT pour toutes les attaques existantes. Indiquer d'abord DM pour un buff aux dommages
 * Plusieurs buffs peuvent être indiqués et séparés par un point-virgule (;)
 * Exemple : `DM ATC +2d6 Attaque en traître ; ATD +[PER] Visée`
 * Il est nécessaire de cliquer en dehors du champ de saisie AVANT de presser un bouton d'attaque afin que le script sheet-worker approprié puisse s'exécuter.
* Ajout d'un bouton "Recycle" sur l'onglet Configuration pour forcer la fiche à recalculer quelques attributs (rangs atteints dans chaque voie, statbloc interne, encombrement)

### Fiche de PNJ

* Ajout Réduction de DM (RD)
* Ajout d'une liste de capacités / traits
* Amélioration du script d'import de statblock
* Ajout d'un script de conversion d'attributs PNJ => PJ

## v2.5 (2019-02-12)
* Gestion des buffs en langage naturel avec référence aux caracs ou voies/rangs
* Réorganisation des lignes d'attaque (PJ et PNJ), gestion des DM secondaires sur la fiche PJ, actions limitées
* Réorganisation des lignes de jets de capacités
* Réorganisation du roll template
* Refactorisation de code dans les sheetworkers

## v2.4 (2019-01-01)
* Fiche de personnage avec sélection du type par dropdown (PJ, PNJ ou Véhicule)
* Modification cosmétique de la fiche avec une bordure aux coins arrondis
* Plus de case Traits/Langues/Niveau de vie sur l'onglet Caractéristiques. Ces informations peuvent être indiquées dans la liste répétable des traits de l'onglet Capacités
* Ajout d'un sheet-worker permettant de détecter si le personnage a subi une blessure grave, quand il perd en une seule fois un nombre de PV supérieur au seuil. La case Blessure est automatiquement cochée et l'état préjudiciable Affaibli activé.
* Ajout d'une case à cocher COCY à côté de l'initiative permettant de gérer les multiples actions par round en Cyberpunk. Après avoir lancé l'initiative, le fait de cocher cette case permet au rang d'initiative du personnage de diminuer de -10 à chaque fois qu'un jet d'attaque est réalisé via la fiche.
* Les Traits sur l'onglet Capacités sont maintenant affichés en permanence
* Possibilité de faire un jet de PC sur l'onglet Equipement qui ne fait qu'un affichage dans le chat
* Trois choix d'initiative dans l'onglet Configuration : normale (init), variable (init + 1d6 explosif), cyberpunk (init + 1d6 explosif, résultat final limité à init de base x 2)
* Ajout de champs dans l'onglet Configuration permettant d'indiquer le bonus de PC ainsi que de les nommer (Points de Choc en Horreur, Points de Cash en Cyberpunk, Points de Chance chargé par défaut à la première ouverture de la fiche)
* Ajout de cases à cocher sur les lignes d'armes/attaques permettant de faire un jet d'attaque sans jet de dommages ou un jet de dommages sans jet d'attaque (fiches PJ et PNJ)
* Ajout d'une option Choix dans les Mods et Mods de test des jets de capacités permettant de choisir la caractéristique à utiliser au moment du jet
* Import du Statblock pour les PNJs
* Ajout d'une fiche de véhicule avec caractéristiques de base et liste répétable de jets permettant d'inclure les caractéristiques de véhicule et celles du personnage (pas de solution satisfaisante trouvée pour aller chercher les caractéristiques de la fiche du pilote dont le nom est indiqué)
* Modification cosmétique avec une bordure aux coins arrondis et un affichage élargi dans les rolls template
* Nouveau tag {{portee= }} permettant d'afficher la portée d'une arme à distance
* Modification du roll-template pour permettre l'affichage d'un jet de dommages même sans jet d'attaque préalable


## V2.3 (2018-12-13)
* Correction d'un bug sur le calcul des buffs Divers ATD et DEF

## v2.2 (2018-12-11)
* Modification du bouton de jet d'attaque pour générer un attribut pour chaque ligne. 
* Correction des espaces dans la commande invoquée par le bouton d'attaque pour en permettre l'utilisation à la fois dans le chat et via l'API en appelant la pseudo ability %{nom|repeating_armes_$n_jet} (où n est le no de ligne, base 0)
* Nommage du checkbox "Plus de voies" (@{voies789}) afin de préserver son état d'un appel à un autre de la fiche de personnage. Ce changement a été oublié dans les commits de la Version 2.1
* Modification du bouton de jet de capacité pour générer un attribut pour chaque ligne. 
* Correction des espaces dans la commande invoquée par le bouton de jet de capacité pour en permettre l'utilisation à la fois dans le chat et via l'API en appelant la pseudo ability %{<nom du personnage>|repeating_jetcapas_$n_jet} (où n est le no de ligne, base 0) 
* Modification mineures des textes dans le sélecteur du type de jet de capacité
* Ajout d'un groupe d'options "Attaques" dans le sélecteur du modificateur de jet de capacité pour ajouter les attributs ATKxxx
* Ajout d'une section répétable "Autres traits" dans l'onglet Capacités, sous la liste des jets de capacités. Elle peut être montrée ou cachée (état préservé d'un appel de la fiche à l'autre). Cette nouvelle liste peut typiquement être utilisée pour noter les différents avantages liées aux types de surhumains, ou bien les différents implants d'un personnage cyberpunk, etc... Cette section comporte un bouton avec un picto "bulle" qui murmure la description du trait au joueur dans le chat. 
* Réorganisation de l'onglet Equipement
* Ajout d'une section répétables "Autres ressources" avec saisie d'un nom et d'une valeur numérique. Elle peut servir à comptabiliser les points de Provisions, de Munitions ou de Transport en univers Post-Apo, ou le seuil de Cyberlose et la difficulté du test de résistance en univers Cyberpunk
* Ajout d'une section masquable pour les caractéristiques d'un véhicule, avec une liste répétable de jets liés, sur lesquels on peut indiquer à la fois des caractéristiques de personnage et des caractéristiques de véhicule comme modificateurs au jet
* Ajout d'un élément {{text}} dans le roll template (utilisé par les jets d'affichage des "Autres traits")
* Correction d'une typo dans la bulle d'aide du bonus divers à la DEX (DEX_BONUS)
* Nouvelle classe de bouton 'output' représentée par un picto de bulle d'aide (pour affichage des "Autres traits" dans le chat)
* Augmentation à 250 pixels de la hauteur allouée à l'élément {{desc}} d'un roll template
* Ajout d'une classe text pour affichage d'un élément {{text}} dans le roll template (police italique réduite, texte justifié sans limite de hauteur)

## v2.1 (2018-12-07)
* Ajout d'onglets
* Ajout du support des états préjudiciables Aveuglé, Etourdi, Immobilisé, Renversé, Surpris avec buffs aux statistiques de combat correspondantes
* Ajout d'une option "Explosif" dans le sélecteur du type de jet pour des jets ouverts / sans limite
* Ajout du d3 au selecteur des dés de dommages
* Ajout d'un groupe de dés de dommages "sans limite" (armes à feu)
* Ajout de deux options d'attaque sur la deuxième ligne : relance (reroll et reroll once) et seuil de relance (à indiquer sous la forme d'un seuil -- relance des 1 par défaut).
* Ajout d'un état "Poisse" consistant à lancer deux d20 et garder le moins bon
* Race est remplacé par famille sur la fiche

## v1.0 (2018-11-07)

Création de la feuille.
