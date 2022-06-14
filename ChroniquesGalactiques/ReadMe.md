# Chroniques Galactiques

_A french Scifi RPG based on the D20 system / OGL 3.5._

Chroniques Galactiques est un jeu de r&ocirc;le futuriste complet bas&eacute; sur le syst&egrave;me d20/OGL 3.5.

Cette feuilles de personnage inclue quelques jets et r&egrave;gles optionnelles.

Le jeu complet est paru dans le magazine [Casus Belli](http://www.black-book-editions.fr/catalogue.php?id=207) #17,18 et 19.

# Version courante

V3.115.0 [Screenshot](cog_v3.png)

# Notes de version

## V3.115.0 (2021.11.12)

- Ajout du nouveau pseudo-attribut permettant d'afficher le token par défaut sur la fiche

## V3.114.1 (2021.04.28)

- Correction d'un bug sur le titre de la capacité de rang 3 de la voie 3 dupliquée sur le rang 3 de la voie 8
- Correction d'un bug sur le nom d'attribut de la capacité de rang 4 de la voie 2
- Correction du calcul du rang dans une voie : la case doit être cochée et soit le titre soit le texte de la capacité doit être renseigné

## V3.114 (2021.04.12)

- Ajout d'un champ titre pour chaque capacité (attributs @{voieN-tR} où N = no de voie et R = rang)
  - Migration automatique d'une version antérieure : la première ligne de la capacité est considérée comme titre
  - Prise en compte dans les autres fonctions (liaison d'un jet de capacité à une voie+rang)
- Correction d'un bug après suppression du seul modificateur d'attaque ou de DM de la liste (le modificateur n'est plus pris en compte dans les jets d'attaque)

## V3.113 (2021.03.07)

_Fiche de vaisseau_

- Correction d'un bug sur les jets d'attaque (en cas d'ajout d'une nouvelle ligne d'arme sans renseigner de canonnier)
- Correction du calcul de l'Initiative pour prise en compte d'un vaisseau sans pilote
- Ajout d'un champ d'attribut pour les points d'énergie perdus (@{PEV_DMG}) et modification du calcul des PEV max

## V3.112 (2021.03.01)

_Fiche de PJ_

- Ajout de l'attaque magique dans la liste des armes/attaques
- Correction mise en page PV et PR : restants / max et non l'inverse
- Suppression du code de remise en forme des textes de capacités par élimination des retours à la ligne

_Fiche de vaisseau_

- Correction du calcul des DEFenses
- Ajout de deux attributs @{DEFRAP} (DEF Rapidité) et @{DEFSOL} (DEF Solidité) calculés pouvant être liés à un token

## V3.111 (2021.02.22)

- Déplacement de l'initiative sur la 1ère ligne de la section combat
- Réorganisation des champs PV et PV max, RD
- Ajout des Points de Récupération avec PR max et courants
- Cases à cocher "Space Fantasy" sur l'onglet Configuration pour faire apparaître optionnellement :
  - l'Attaque Magique, avec score de base, bonus de caractéristique, bonus divers et total.
  - les Points de Mana, avec PM max et courants.
- Amélioration de la reconnaissance des propriétés d'équipement
  - **DEF : x** pour indiquer le bonus de DEFense d'une armure
  - **DEF- : x** pour indiquer le malus d'encombrement d'une armure
  - **RD : x** pour indiquer la réduction des DM d'une armure
  - **DM : dm type** pour indiquer les dés et le type de DM
    - Où _dm_ est {nombre}d{faces}
    - Suffixer _dm_ avec + ou ! pour des DM explosifs
  - **DM2 : dm2 type2** pour indiquer un second type et dés de DM

## V3.110 (2020.12.21)

- Case à cocher sur l'onglet Capacités de la fiche de PJ permettant de basculer entre :
  - le mode Affichage, avec nom et description textuelle complète des capacités
  - le mode Edition, où l'utilisateur peut entrer le texte des capacités (la première ligne de texte est toujours considérée comme étant le nom de la capacité).
- Possibilité de lier un jet de capacité avec l'une des capacités de la grille, en indiquant le numéro de voie et le rang correspondant. Cette information est principalement utilisée par le script API [COlib](https://github.com/stephaned68/COlib).
- Sur la fiche de vaisseau :
  - gestion des Points d'Energie, avec contrôle par rapport aux PE max
  - gestion de l'occupation des postes, avec prise en compte ou pas des bonus d'équipage sur les jets de vaisseau (Init et DEF (Rapidité) à 0 pour un vaisseau sans pilote)
  - pas d'affichage de la section des traits physiques (sexe, âge, taille, poids)

## V3.11 (2020.08.15)

- Amélioration de la logique d'import d'un statblock de PNJ ou de créature
- Lancement de l'import du statblock via un bouton

## V3.10 (2020.08.04)

- Retour au schema de versionning sémantique classique (major.minor.patch)
- Modification de la logique de migration/mise à jour du sheetworker

## V2020.0525

- Reprise des dernières modifications de la fiche COC
- Nouveau fichier .html pour la fiche
- Nouveau schema de versionning : AAAA.MMJJ

## V3.8 (2019-10-10)

- Ajout buff et calcul auto des PV
- Modification du sheetworker pour éviter erreurs dans la console API
- Homogénéisation des noms des roll buttons
- Séparation des buffs circonstanciels de combat en deux champs : un pour le jet d'attaque et un pour le jet de dommages
- Ajout de cases à cocher pour lancer ou nom le jet d'attaque et le jet de dommages sur les lignes d'armes de la fiche de vaisseau -- idem fiche PJ et PNJ (demande forum BBe)

## V3.7 (2019-09-26)

Modification de tous les roll-buttons :

- name="roll\_{nomdujet}"
- ajout/maj des title=""

Permet de lancer tous les jets de dés de la fiche via %{nomdujet} dans le chat

## V3.6 (2019-04-17)

### Fiche de PJ

- Possibilité d'appliquer plusieurs états préjudiciables en même temps
- Gestion de l'encombrement (idem COF)
- Ajout d'un champ de texte sous la liste d'attaques pour les buffs "temporaires"
- Possibilité d'indiquer des buffs aux jets d'attaque et de dommages en langage quasi-naturel : le premier mot est le type d'attaque concernée, le deuxième est le modificateur (avec possibilité de référencer un autre attribut de la fiche en l'encadrant entre crochets []) et à partir du troisième, la description du buff.
- Indiquer ATC (contact), ATD (distance), INT (PSY Intuition), INF (PSY Influence), pour les types d'attaques, ATT pour toutes les attaques existantes. Indiquer d'abord DM pour un buff aux dommages
- Plusieurs buffs peuvent être indiqués et séparés par un point-virgule (;)
- Exemple : `DM ATC +2d6 Attaque en traître ; ATD +[PER] Visée`
- Il est nécessaire de cliquer en dehors du champ de saisie AVANT de presser un bouton d'attaque afin que le script sheet-worker approprié puisse s'exécuter.
- Ajout d'un bouton "Recycle" sur l'onglet Configuration pour forcer la fiche à recalculer quelques attributs (rangs atteints dans chaque voie, statbloc interne, encombrement)

### Fiche de PNJ

- Ajout Défense PSY
- Ajout d'une liste de capacités / traits
- Amélioration du script d'import de statblock
- Ajout d'un script de conversion d'attributs PNJ => PJ

## V3.5 (2019-02-11)

### Remplacement des 5 champs de buffs par un champ unique

- Un nombre quasi illimité de buffs est désormais possible pour chaque attribut
- Le champ unique permet une syntaxe plus "naturelle".
  Exemple d'utilisation pour la PER : Oeil d'aigle +2; Drone espion : +2
- Chaque buff est composé d'un texte et d'une valeur numérique éventuellement séparés par deux points (:).
- Sans les ':', le script sheet-worker considère que la valeur du buff est située après le dernier espace de la phrase.
- Il est possible d'activer ou désactiver temporairement un buff en préfixant son type par le signe -
  Exemple : Oeil d'aigle +2; -Drone espion : +2
- Possibilité d'utiliser des variables pour les bonus. Exemples :
- _Flamboyant +[CHA]_
- _Réflexes : +[Voie 2]_ (en supposant que la voie no 2 donne un bonus selon le rang atteint)
- _Arts Martiaux : +[rang Corps à corps]_ (pour un buff de DEF, en supposant que le personnage a une voie nommée Corps à corps)
- _Réflexes félins : +2[rang Pourfendeur]_ (en supposant que le personnage a une voie nommée Pourfendeur)
  **Attention** : pour pouvoir indiquer _[voie no]_ ou _[rang nom]_, il faut impérativement séparer le nom du buff de sa valeur par **:** (deux points, cf ci-dessus)

### Conversion des buffs par un sheet-worker à la première ouverture de la fiche

### Réorganisation des lignes d'attaque :

- Case à cocher pour action limitée (affiche (L) dans le roll template)
- Nouveau champ pour indiquer le type de dommage (affiché dans le rolltemplate)
- Nouveaux champs pour indiquer des DM secondaires (dés et type, affichés sur une deuxième ligne dans le rolltemplate)
- Suppression case à cocher Tir Haute-Capacité : il suffit d'ajouter une ligne d'attaque avec case Limitée cochée et un dé de DM de plus

### Réorganisation des lignes de jets de capacités

- Nouveau champ permettant d'indiquer un titre / nom de compétence (remplace 'Jet' dans le rolltemplate)
- Nouveau champ permettant d'indiquer le nom et le rang dans la voie de la capacité
- Description détaillée des effets de la capacité dans un champ plus large affiché sur une deuxième ligne

### Modification du rolltemplate

- Nouvelle propriété {{jet=}} permettant de remplacer le libellé 'Jet' par un autre texte dans le chat pour un test de {{carac=}}
- Nouvelle propriété {{dmtype=}} permettant d'afficher le type de DM principaux
- Nouvelle propriété {{degats2=}} permettant d'afficher les DM secondaires
- Nouvelle propriété {{dm2type=}} permettant d'afficher le type de DM secondaires

### Refactorisation de plusieurs fonctions dans les scripts sheet-workers

## V3.4 (2019-01-02)

### Fiche de PJ

- Plus de cases Traits/Divers sur l'onglet Caractéristiques. Ces informations peuvent être indiquées dans la liste répétable des traits de l'onglet Capacités (un sheet-worker de MAJ de version importe l'ancienne valeur du champ Traits)
- Ajout d'un sheet-worker permettant de détecter si le personnage a subi une blessure grave, quand il perd en une seule fois un nombre de PV supérieur au seuil. La case Blessure est automatiquement cochée et l'état préjudiciable Affaibli activé.
- Les Traits sur l'onglet Capacités sont maintenant affichés en permanence
- Ajout de cases à cocher sur les lignes d'armes/attaques permettant de faire un jet d'attaque sans jet de dommages ou un jet de dommages sans jet d'attaque
- Ajout d'une option Choix dans les Mods et Mods de test des jets de capacités permettant de choisir la caractéristique à utiliser au moment du jet

### Fiche de PNJ

- Ajout de cases à cocher sur les lignes d'armes/attaques permettant de faire un jet d'attaque sans jet de dommages ou un jet de dommages sans jet d'attaque (fiches PJ et PNJ)
- Import du Statblock sur l'onglet Caractéristiques de la fiche PNJ
- Amélioration de la fonction d'import de statblock pour permettre la création d'une ligne d'attaque sans attaque ou sans dommages (la présence du mot DM sur la ligne d'attaque reste nécessaire pour qu'elle soit reconnue en tant que telle)

### Fiche de vaisseau

- Ajout d'un sheet-worker permettant de remplacer les " dans le nom du personnage par des «» (évite des problèmes de parsing dans les macros)
- Modification des postes d'équipage, avec un champ permettant d'indiquer le nom du personnage et son rang dans sa spécialité (Pilotage, Moteurs, Electronique, etc...)
- Modification des options des lignes d'armes pour pouvoir indiquer le nom du canonnier et son rang en Armes lourdes
- Ajout de sheet-workers pour convertir les noms & rangs des PJs aux postes d'équipage en syntaxe utilisable dans les macros de tests et d'attaques

### Roll Template

- Modification cosmétique avec une bordure aux coins arrondis et un affichage élargi
- Nouveau tag {{portee= }} permettant d'afficher la portée d'une arme à distance
- Modification pour permettre l'affichage d'un jet de dommages même sans jet d'attaque préalable

## v3.3 (2018-12-20)

- Réorganisation de la fiche en 3 onglets principaux :
- Personnage avec 4 sous-onglets : Caractéristiques (+attaques), Capacités (voies, et autres traits), Equipement, Configuration (et buffs)
- Vaisseau avec 2 sous-onglets : Caractéristiques (+attaques), Configuration (et buffs)
- PNJ avec 2 sous-onglets : Caractéristiques (+attaques), Configuration

- L'onglet Configuration de la fiche de PNJ comporte un champ permettant de copier un statblock depuis un document PDF. Voir le Wiki pour plus d'information.

## v3.2 (2018-12-11)

- Ajout de la section répétable des "Autres traits" avec un bouton d'affichage murmuré dans le chat
- Corrections et ajustements divers (typo, erreurs de noms d'attributs, espaces surnuméraires dans les macros)
- Ajout d'une classe de bouton 'output' représenté par une bulle d'aide
- Ajout d'une classe d'affichage 'text' pour utilisation dans le roll template (texte sans limite de scrolling, avec police à 90%, en italique et justifié)

## v3.1 (2018-12-03)

- Ajout du d3 au selecteur des dés de dommages
- Ajout d'un groupe de dés de dommages "sans limite" (armes à feu)
- Ajout de deux options d'attaque sur la deuxième ligne : relance (reroll et reroll once) et seuil de relance (à indiquer sous la forme d'un seuil -- relance des 1 par défaut).
- Réorganisation de la section Etats préjudiciables
- Ajout d'un état "Poisse" consistant à lancer deux d20 et garder le moins bon
- Modification des jets de dés de la fiche pour tenir compte de l'état "Poisse"
  Type des jets avec poisse :
- Jet de carac normal : moins bon de deux d20 (au lieu d'un d20)
- Jet de carac supérieur OU héroïque : un seul d20 (au lieu du meilleur de deux d20)
- Jet de carac supérieur ET héroïque : meilleur de deux d20 (pas de minimum à 10)
- Jet d'attaque normal : moins bon de deux d20 (au lieu d'un d20)
- Jet d'attaque risqué : moins bon de deux d12 (au lieu d'un d12)
- Jet d'attaque expert : un seul d20 (au lieu du meilleur de deux d20)

## v3.0 (2018-11-29)

- Réorganisation de la fiche de personnage avec des onglets Caractéristiques, Capacités, Equipement, Configuration
- Remplacement des champs Divers sur les attributs par des champs calculés via sheet-workers
- Affichage des options d'attaque avec pictogramme d'engrenage
- Affichage jusqu'à 9 voies
- Gestion de 5 buffs/debuffs par attributs
- Support des états préjudiciables aveuglé/étourdi/renversé/surpris avec pénalités aux attributs correspondants
- Ajout d'un onglet Vaisseau avec attributs et jets de dés spécifiques aux vaisseaux spatiaux

## v2.0 (2018-10-23)

- Prise en compte des caractéristiques supérieures et héroïques
- État affaibli ou normal
- Bouton pour signaler une initiative variable
- Bouton pour faire les jets en caché (utile pour les PNJs)
- Correction de l'utilisation de SAG par PER dans les jets de capacité
- Réorganisation des attaques, avec
- champs pour le nom de l'attaque,
- les attaques risquées et expert,
- les seuils d'incident de tir,
- la possibilité de tir visé,
- et tir en haute-capacité.
- Correction dans les attaques : magie est remplacé par psy
- Amélioration des roll templates
- Tranformation de la zone de texte équipement personnel en section répétable
- Ajout d'une zone d'équipements divers

## v1.3 (2017-10-02)

- Jets d'arme : la propriété spéciale est affichée dans le chat (permettant d'ajouter des jets avec "[[1d6+2]] dégâts de feu" par exemple)

## v1.2 (2017-09-17)

- Correction : les caractéristiques au-dessus de 30 ne provoquent plus de message d'avertissement

## v1.1 (2016-07-13)

- Ajout d'une section répétable de jets paramétrables (+description) dans la section Capacités (Voies)

## v1.0 (2016-07-11)

Création de la feuille.
