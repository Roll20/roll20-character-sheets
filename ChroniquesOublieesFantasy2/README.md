# Chroniques Oubliées Fantasy 2ème édition

## Utilisation

Consultez la [documentation](https://stephaned68.github.io/COF2e/)

## Version courante

v1.11.0 [Screenshot](cof2e.png)

## Notes de version

### Version _1.11.0_ (2025-11-11)

- Correction DM x 2 si le seuil de critique est inférieur à 20
- Ajout de boutons _Récupérations_ et _Soins_ au menu d'actions du PJ
- Ajout d'une mention pour les manoeuvres avec modificateur de taille
- Ajout du jet opposé sur l'utilisation d'une manoeuvre
- Ajout de champs pour les scores d'attaque au contact (jet de manoeuvre opposé) et magique aux fiches de PNJ
- Possibilité de combiner les options tactiques avec une option spécifique au PJ

### Version _1.10.0_ (2025-10-31)

- Raz des capacités utilisées par combat / par jour en cas de récupération rapide ou complète
- Raz des PM maximum en cas de récupération complète
- Ajout d'un sous-onglet pour les RD et Résistances aux DM sur la fiche de PJ
- Ajout d'une section dépliante pour les RD et Résistances aux DM sur la fiche de PNJ
- Ajout d'attributs vitesse pour les déplacements
- Prise en charge des valeurs de buffs qui changent à certains rangs dans une voie
- Prise en charge des manoeuvres spéciales dans les jets d'attaque
- Ajout de listes de tailles et de type de créatures sur la fiche de PNJ
- Ajout d'une option pour cibler un token lors d'un jet d'attaque
- Effacement de l'option tactique choisie après un jet d'attaque
- Ajout d'un bouton caché à utiliser en [macro](https://stephaned68.github.io/COF2e/pc-tech#menus-et-macros) pour un menu des actions du personnage dans le chat
- Prise en charge de ressources consommables de type `soins`
- Ajout d'un bouton _Consommable_ à la liste des ressources
- Ajout du nombre d'utilisations par jour/combat aux capacités de PNJ

### Version _1.9.0_ (2025-09-28)

- Possibilité de cacher les voies n° 4, 5 et 6.
- Ajout d'un type de buff _Tous les test de caracs_ et _Tous les jets d'attaque_.
- Ajout d'un paramètre _temporaire_ dans la définition d'un buff.
- Ajout d'un bouton pour regrouper les buffs temporaires par leur nom et les activer/désactiver.
- Ajout des attributs `voies_rang3`, `voies_rang4`, `voies_rang5` avec le nombre de voies dans lesquelles les rangs 3 à 5 sont atteints.
- Remplacement de la propriété de capacité `evol` par la propriété `selonRang`.
- Ajout d'une option de configuration pour lancer un seul d20 dans les jets de compétence.
- Harmonisation des icones d'états préjudiciables avec le token marker set du script MOD _COFantasy2_.
- Mise au point de l'option _Etats préjudiciables_ de l'interface _Token Mod_.

### Version _1.8.0_ (2025-08-31)

- Prise en compte des capacités épiques dans le calcul des rangs dans la voie et des PV (propriété `epic:`).
- Prise en compte des capacités épiques _Défense héroïque_ et _Mana épique_ dans le calcul de la DEF et des PM
- Possibilité de compter le trésor en PO ou en PA.
- Ajout d'une option dans la configuration _Token Mod_ pour appliquer une teinte au token quand le nombre de PV tombe au-dessous de sa valeur maximum.
- Ajout d'un bouton pour copier la configuration par défaut depuis une fiche nommée _PJBase_ ou _PNJBase_.
- Ajout d'une option dans les coups spéciaux des PNJ pour n'affecter que la prochaine attaque.

### Version _1.7.0_ (2025-07-27)

- Sous-onglet _Maîtrises_ dans l'onglet _Capacités_ pour les langues et les maîtrises spéciales d'armes & armures.
- Ajout d'un popup Roll20 sur le bouton DR pour choisir Récupération _Rapide_ ou _Complète_ ou _Se dépasser_.
- Ajout de la possibilité d'indiquer `jet:N` dans le champ _Spécial_ d'une attaque de PNJ pour afficher la description du jet correspondant dans le chat Roll20.
- Ajout d'une option _Token Mod_ dans l'onglet Script pour permettre aux joueurs d'interagir avec le token de leur personnage.
  - Redimensionnement du token et liaison par défaut des barres aux attributs.
  - Application optionnelle d'un marker lorsque les PV tombent à 0.
  - Application optionnelle d'un marker avec compteur de PC restants.
  - Application optionnelle de markers selon les états préjudiciables subis.

### Version _1.6.0_ (2025-06-22)

- Déplacement des propriétés magiques des armes vers les modificateurs d'attaque.
- Ajout d'un champ _Prédicats si porté_ aux lignes d'attaques et d'équipements.
- Création de deux lignes d'attaque pour une arme avec la propriété _lancer_.
- Ajout de la possibilité d'épingler les jets des capacités à la barre d'actions Roll20.
- Ajout d'une gestion de compétences dans la fiche de PNJ.
- Ajout de 3 coups spéciaux dans la fiche de PNJ.
- Ajout d'une liste de munitions sur l'onglet Equipement (script MOD _COFantasy2_).

### Version _1.5.0_ (2025-05-08)

- Ajout d'un onglet Notes aux fiches de PJ (cases _Apparence_, _Biographie_, _Contacts_, _Aventures_).
- Ajout d'une couleur de fond aux PV selon l'état courant (Jaune si moins de 50% de PV restants, Rouge si 1 PV restant, Rouge foncé si 0 PV restant).
- Ajout d'une * aux noms des capacités de sort en mode affichage.
- Ajout d'un ajustement optionnel des PM dépensés par une capacité de sort.
- Prise en compte des capacités avec paramètre évolutif.
- Amélioration des objets en main (main gauche selon bouclier équipé ou pas).
- Mise au point de la vérification des points de capacités et du calcul auto des PV.
- Correction de l'import PDF pour les voies de magie destructrice et magie élémentaire.
- Ajout de la possibilité d'épingler certains jets à la barre d'actions Roll20.
- Ajout de buffs aux DMs avec possibilité de jet optionnel.
- Ajout d'une gestion d'attributs personnalisés.
- Ajout d'une case attaque active/inactive pour le script MOD _COFantasy2_.

### Version _1.4.0_ (2025-04-08)

- Ajout d'un bouton pour afficher un check-up de l'état du personnage.
- Ajout d'un bouton pour activer la concentration sur les capacités de sort.
- Ajout des tables de coups et d'échecs critiques sur les fiches de PJ et PNJ.
- Ajout d'une _Roll Query_ pour les DM des sorts de zone en attaque.
- Prise en compte des propriétés magiques des armes.
- Prise en compte des règles optionnelles de peur.
- Prise en compte de la valeur d'Ombre.
- Ajout des bonus de base aux titres des jets d'attaques, de capacités et de compétences.
- Ajout de tags aux jets dans le chat.
- Amélioration des textes descriptifs dans les jets de capacités.
- Ajustements cosmétiques pour les cases à cocher et boutons radio.

### Version _1.3.0_ (2025-03-09)

- Ajout de buffs aux caractéristiques pris en compte dans les attributes dérivés.
- Ajout d'un contrôle sur le niveau minimum requis pour les rangs de capacités.
- Ajout d'une case _En selle_ (pour gestion de la _Voie du cavalier_).
- Affichage optionnel d'un bouton Chance dans les jets de caracs, d'attaques et de capacités.
- Prise en compte de l'état Immobilisé pour les jets d'attaque avec dé malus.
- Ajout de toutes les armes et armures dans la liste des équipements reconnus.
- Gestion simplifée du suivi des munitions.
- Gestion de l'usure des armes (low-fantasy).
- Ajout d'une option pour départager les jets d'initiative identiques.
- Ajout d'un menu de chat pour les états préjudiciables.
- Ajout de 4 listes d'actions sur l'onglet Script des fiches de PJ et PNJ.
- Prise en compte des attaques groupées sur la fiche de PNJ.
- Ajout d'un onglet Equipement simplifié sur la fiche de PNJ.
- Correction d'un bug dans l'appel du _Persomancien_.

### Version _1.2.0_ (2025-02-04)

- Ajout d'une gestion des armures, boucliers et casques équipés.
- Ajout d'une option pour vérifier les points de capacités utilisés.
- Déplacement de l'import des voies dans un sous-onglet Import de l'onglet Capacités.
- Ajout d'une icône pour chaque nom de voie en mode Edition pour l'import du texte des capacités.
- Modification du calcul des DR max avec une base de 2 sauf pour les profils d'Aventuriers (3 DR).
- Modification du calcul des PC max avec une base de 2 sauf pour les profils de Mystiques (3 PC).
- Ajout d'options de configuration pour forcer la valeur max des PV, DR, PC et PM.
- Modification du champ RD dans la fiche de PNJ.
- Amélioration de le reconnaissance d'inline-rolls dans les descriptions de capacités.
- Ajout du détail de la bourse par type de pièces et total du trésor en PA.
- Ajout de la gestion des objets en main.
- Ajout de la possibilité de lier un FX Roll20 aux jets de caractéristiques et d'attaques.
- Persomancien (version expérimentale).
- Ajout des boutons des menus d'action sur la fiche de PNJ.

### Version _1.1.0_ (2025-01-05)

- Ajout d'un bouton pour le test de chance.
- Ajout d'un champ paramètre et d'un champ propriétés pour chaque capacité.
- Ajout d'un champ PV de voie pour chaque voie.
- Rangs 1 des voies 1,2 & 3 cochés par défaut.
- Ajout d'une option de calcul automatique des PV max.
- Ajout de la gestion de compagnons.
- Ajout d'options d'attaque pour script MOD _COFantasy2_.
- Remplacement de l'import de profil en JSON par un import de voie depuis le PDF des règles.
- Ajout d'un bouton de génération de l'équipement de base du profil.
- Ajout de la gestion de l'AGI/CON maximum selon l'armure.
- Ajout de l'onglet Script et des options d'attaque sur les fiches de PNJ.
- Ajout d'un champ propriétés sur les ressources.

### Version _1.0.0_ (2024-12-24)

Version initiale
