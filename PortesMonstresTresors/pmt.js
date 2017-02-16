var PmT = PmT || (function () {
    'use strict';
    var version = 1.3,
    releasedate= "2016-01-29",
    schemaversion = 1.0,
    author="Natha (roll20userid:75857)",
    warning = "This script is meant to be used with the Portes-Monstres-Trésors sheet",
    sortsDivins1='{"nom":"Détection de la Magie","reversible":0,"niveau":1,"duree":"2 tours","portee":"18 m","desc":"Le clerc peut voir une aura magique sur les créatures ou les objets enchantés dans un rayon de 18 m. Ceci inclut les objets magiques permanents, mais aussi les objets ou créatures qui sont sous l’influence d’un sort ou d’un enchantement."}|{"nom":"Détection du Mal","reversible":0,"niveau":1,"duree":"6 tours","portee":"40 m","desc":"Dans un rayon de 18 m autour du lanceur, les êtres et les objets enchantés aux intentions maléfiques brilleront d’une lueur magique. Le MdT devra décider ce que signifie « maléfique » : certaines choses, comme les pièges, peuvent être potentiellement dangereuses sans pour autant être maléfiques. Ce sort permet seulement de détecter des intentions maléfiques, pas de connaître leur nature précise."}|{"nom":"Lumière","reversible":1,"niveau":1,"duree":"12 tours","portee":"36 m","desc":"Un objet ciblé par ce sort brillera comme une torche, éclairant les alentours dans un rayon de 15 m. L’effet est immobile, mais peut être lancé sur un objet transportable. Ce sort peut aussi être lancé sur les yeux d’un monstre ou d’un personnage : si la cible rate son Jet de Sauvegarde contre les sorts, elle est aveuglée pendant 12 tours. Dans une zone de Ténèbres (l’inverse de Lumière), ce sort ne fonctionne pas, et vice-versa. Un sort de Lumière contre les effets d’un sort de Ténèbres."}|{"nom":"Protection contre le Mal","reversible":0,"niveau":1,"duree":"12 tours","portee":"contact","desc":"Ce sort protège la cible des attaques d’adversaires maléfiques. Il crée une barrière magique autour de la cible qui se meut en même temps que cette dernière et lui donne un bonus de - 1 [+ 1] à la CA et de + 1 à ses Jets de Sauvegarde. Ces deux bonus s’appliquent à toute attaque ou effet causé par un être maléfique. De plus, ce sort empêche les créatures charmées, invoquées, contrôlées magiquement, ou possédées de toucher la cible : de ce fait, toute attaque rapprochée de ces créatures échoue automatiquement. Cependant, elles peuvent attaquer à distance. Cette protection contre ces créatures prend fin si la cible tente d’attaquer une de ces créatures ou essaie de forcer la barrière."}|{"nom":"Purification","reversible":1,"niveau":1,"duree":"permanent","portee":"3 m","desc":"Ce sort rend propre à la consommation de la nourriture ou de l’eau souillée, pourrie, empoisonnée, contaminée… Ce sort peut affecter 6 litres d’une boisson, une ration de voyage, ou une quantité de nourriture non préservée suffisante pour 12 personnes de taille humaine. Ce sort n’empêche pas la nourriture de se gâter ou de pourrir."}|{"nom":"Regain d’Assurance","reversible":1,"niveau":1,"duree":"2 tours","portee":"contact","desc":"Ce sort instille du courage à la cible, qui peut effectuer un Jet de Sauvegarde contre les sorts avec un bonus de + 1 par niveau de classe du lanceur pour lever les effets d’une peur magique. Regain d’Assurance contre et dissipe Peur. Peur amène le sujet touché à s’enfuir, hystérique, au maximum de son mouvement pour un nombre de rounds égal au niveau du clerc."}|{"nom":"Résistance au Froid","reversible":0,"niveau":1,"duree":"6 tours","portee":"9 m","desc":"La créature ciblée par ce sort n’est pas affectée par le froid non magique et bénéficie d’un bonus de + 2 à tous les Jets de Sauvegarde contre les sorts ou attaques de souffle basées sur le froid. De plus, un point de dommages est soustrait à chaque dé de dommages d’une attaque basée sur le froid, jusqu’à un minimum de 1 point de dommages par dé."}|{"nom":"Soins Légers","reversible":1,"niveau":1,"duree":"permanent","portee":"contact","desc":"Le clerc doit toucher le personnage ou la créature ciblée (ou lui-même) pour que le sort fonctionne. Au moment du lancer, il peut soit soigner la cible de 1d6 + 1 PV, soit la délivrer de la paralysie. Le sort ne peut pas augmenter les Points de Vie au dessus du total habituel du personnage. Dégâts Légers inflige 1d6 + 1 points de dommages à la créature touchée par le clerc."}',
    sortsProfanes1=[{"nom":"Bouclier","reversible":0,"niveau":1,"duree":"instantané","portee":"60 m","desc":"Ce sort crée un champ de force invisible qui protège le magicien. Pour la durée du sort, la CA du magicien est égale à 2 [17] contre les attaques de projectile et à 4 [15] contre les autres types d’attaque."},{"nom":"Charme-personne","reversible":0,"niveau":1,"duree":"spécial","portee":"36 m","desc":"La créature humanoïde ciblée par le sort considère le magicien comme un ami et un allié de confiance : son attitude est considérée comme amicale. Les morts-vivants et les humanoïdes plus grands que des ogres ne sont pas affectés par ce sort. Le magicien ne peut pas contrôler la personne charmée comme un automate, mais il est capable de lui donner des ordres, sous réserve de parler le langage de la créature ou d’être un habile pantomime. Ces ordres seront plus ou moins respectés en fonction de leur nature et de l’alignement de la cible ; de plus, la créature n’obéira pas à des ordres lui intimant des actions suicidaires ou douloureuses, bien qu’il soit possible de la convaincre d’accomplir quelque chose de dangereux. Tout acte de la part du magicien ou de ses alliés apparents qui menace la créature charmée mettra fin au sort. Selon son intelligence, la créature charmée aura le droit d’effectuer des Jets de Sauvegarde contre les sorts à des intervalles plus ou moins espacés : tous les mois pour une INT de 8, toutes les semaines pour une INT de 9 à 12, et tous les jours pour une INT de 13 à 18. Enfin, Charme-personne peut être annulé par le sort Dissipation de la Magie."},{"nom":"Détection de la Magie","reversible":0,"niveau":1,"duree":"2 tours","portee":"18 m","desc":"Tous les objets, créatures, endroits et autres éléments qui sont enchantés et dans un rayon de 18 m autour du magicien brillent pour la durée du sort. Le magicien peut se déplacer pendant ce temps afin d’amener d’autres objets dans la zone d’effet du sort."},{"nom":"Disque Flottant","reversible":0,"niveau":1,"duree":"6 tours","portee":"2 m","desc":"Le magicien crée un champ de force légèrement concave, de 1m de diamètre et de 0,3 cm de profondeur en son centre, qui flotte constamment à 1 m du sol. A moins d’un ordre du magicien, le disque restera toujours à 2 m de distance de celui-ci et le suivra à la même vitesse que lui, de façon à maintenir cet intervalle. Lorsque le disque disparait à la fin du sort, ce qu’il transportait tombe à terre."},{"nom":"Lecture de la Magie","reversible":0,"niveau":1,"duree":"1 tour","portee":"0","desc":"Le magicien peut déchiffrer des instructions magiques sur des objets – armes, livres, parchemins, etc. – qui seraient normalement inintelligibles. Cela n’invoque généralement pas la magie contenue dans l’écriture, sauf éventuellement dans le cas d’un parchemin maudit. De plus, après avoir utilisé le sort, le magicien sera désormais capable de lire l’écriture particulière qu’il voulait décoder sans avoir recours à Lecture de la Magie. Tous les grimoires sont rédigés de telle façon que seul leurs possesseurs sont capables de le déchiffrer sans l’aide de Lecture de la Magie."},{"nom":"Lecture des Langages","reversible":0,"niveau":1,"duree":"2 tours","portee":"0","desc":"Pour la durée du sort, le magicien peut lire n’importe quel langage, message codé, carte ou tout autre ensemble d’instructions écrites. Ce sort ne permet pas de parler une langue étrangère."},{"nom":"Lumière","reversible":1,"niveau":1,"duree":"niveau du magicien + 6 tours","portee":"36 m","desc":"Un objet ciblé par ce sort brillera comme une torche, éclairant les alentours dans un rayon de 15 m. L’effet est immobile, mais peut être lancé sur un objet transportable. Ce sort peut aussi être lancé sur les yeux d’un monstre ou d’un personnage : si la cible rate son Jet de Sauvegarde contre les sorts, elle est aveuglée pendant 12 tours. Dans une zone de Ténèbres (l’inverse de Lumière), ce sort ne fonctionne pas, et vice-versa. Un sort de Lumière contre les effets d’un sort de Ténèbres."},{"nom":"Projectile Magique","reversible":0,"niveau":1,"duree":"1 tour","portee":"45 m","desc":"Un projectile d’énergie magique jaillit du doigt tendu du magicien et va frapper sa cible, lui infligeant 1d6 + 1 points de dommages. Il touche automatiquement, même si la créature visée se trouve au corps à corps ou bénéficie d’un camouflage ou d’une couverture partielle. Il est impossible de viser un endroit précis : main, tête... Le magicien gagne deux projectiles supplémentaires tous les cinq niveaux : il tire donc trois projectiles au niveau 5 et cinq au niveau 10. Il peut répartir ses différents projectiles entre plusieurs cibles, mais chaque projectile ne peut atteindre qu’un seul adversaire."},{"nom":"Protection contre le Mal","reversible":0,"niveau":1,"duree":"12 tours","portee":"0","desc":"Une barrière magique apparaît à 0,5 m autour du magicien : elle le protège des attaques de créatures mal intentionnées (et de celles dont l’alignement diffère du magicien), du contrôle mental, et des créatures invoquées. La barrière se déplace avec le magicien et a deux effets majeurs. Premièrement, le magicien gagne un bonus de - 1 [+ 1] à sa CA et de + 1 à ses Jets de Sauvegarde, bonus qui s’applique contre toutes les attaques de créatures maléfiques et les effets qu’elles peuvent produire. Deuxièmement, la barrière empêche les créatures invoquées d’entrer en contact avec le magicien : leurs attaques avec des armes naturelles sont inefficaces et elles sont repoussés si de telles attaques impliquent de toucher le magicien. Cette protection contre les créatures invoquées prend fin dès que le magicien tente de forcer la barrière ou d’attaquer une des créatures bloquées."},{"nom":"Sommeil","reversible":0,"niveau":1,"duree":"4d4 tours","portee":"70 m","desc":"Ce sort plonge dans un sommeil magique une créature de 4 + 1 DV ou jusqu’à 2d8 DV de créatures de moins de 4 + 1 DV. Dans ce dernier cas, un monstre avec moins de 1 DV est considéré comme ayant 1 DV et les éventuels bonus au DV sont ignorés : un monstre avec 3 DV + 2 sera donc traité comme un monstre avec 3 DV. Les créatures avec le moins de DV sont affectées en premier ; s’il ne reste pas suffisamment de DV pour affecter une créature (2 DV pour affecter un monstre avec 3 DV), ces DV sont gaspillés. Les créatures endormies sont sans défense : une arme tranchante peut les tuer instantanément. Elles se réveilleront si elles sont giflées ou blessées, mais ne réagiront pas aux bruits normaux. Sommeil n’affecte pas les mort-vivants."},{"nom":"Ventriloquie","reversible":0,"niveau":1,"duree":"2 tours","portee":"18 m","desc":"Pour la durée de Ventriloquie, le magicien peut faire surgir sa voix de n’importe quel endroit à portée du sort."},{"nom":"Verrouillage","reversible":0,"niveau":1,"duree":"2d6 tours","portee":"3 m","desc":"Ce sort bloque magiquement une porte, un portail, une fenêtre ou un volet en bois, en métal ou en pierre. Il empêche d’ouvrir l’objet protégé, exactement comme si ce dernier était fermé par un cadenas normal. Déblocage ou Dissipation de la Magie font disparaître le Verrouillage."}],
    sortsProfanes2=[{"nom":"Déblocage","reversible":0,"niveau":2,"duree":"1 round","portee":"18 m","desc":"Déblocage ouvre les portes coincées, fermées à clé ou à l’aide d’une barre, ou encore protégées par des sorts tels que Verrouillage ou Serrure Arcane. Il ouvre également les passages secrets préalablement découverts, de même que les boîtes ou les coffres. La porte ne se verrouille pas et ne se bloque pas à nouveau sans intervention extérieure. Déblocage ne permet pas d’élever une herse fermée ou une structure similaire (tel un pont-levis) et n’affecte pas des éléments tels que les cordes ou les vignes."},{"nom":"Détection de l’Invisibilité","reversible":0,"niveau":2,"duree":"5 rounds par niveau","portee":"3m par niveau","desc":"Le magicien peut voir des créatures ou des objets invisibles, cachés, éthérés ou astraux sous réserve qu’ils soient directement dans sa ligne de vue et à portée du sort."},{"nom":"Détection de Pensées","reversible":0,"niveau":2,"duree":"12 tours","portee":"18 m","desc":"Le magicien peut choisir une direction et se concentrer pendant 1 tour. Après ce tour, il peut percevoir les pensées de toutes les créatures dans un rayon de 18 m. Il comprend la signification de toutes les pensées même s’il ne connaît pas le langage de la créature. Cependant, si plusieurs créatures sont à portée du sort, le mélange confus de leurs pensées oblige le magicien à prendre un tour supplémentaire pour distinguer les pensées d’une créature spécifique La capacité à entendre les pensées est bloquée par la présence de plomb ou de bois d’une épaisseur de 0,5 m ou plus."},{"nom":"Détection du Mal","reversible":0,"niveau":2,"duree":"2 tours","portee":"18 m","desc":"Dans un rayon de 18 m autour du lanceur, les êtres et les objets enchantés aux intentions maléfiques brilleront d’une lueur magique. Le MdT devra décider ce que signifie « maléfique » : certaines choses, comme les pièges, peuvent être potentiellement dangereuses sans pour autant être maléfiques. Ce sort permet seulement de détecter des intentions maléfiques, pas de connaître leur nature précise."},{"nom":"Force Fantasmagorique","reversible":0,"niveau":2,"duree":"voir description","portee":"36 m","desc":"Aussi longtemps que le magicien garde sa concentration, il peut créer une illusion active et persistante dans une zone de 6 m3. Une illusion disparaîtra si elle est touchée par une créature, mais un monstre illusoire peut être créé pour attaquer un adversaire. Les observateurs de la scène ont le droit d’effectuer un Jet de Sauvegarde contre les sorts pour voir à travers toute illusion produite avec ce sort. Si le Jet de Sauvegarde échoue, l’illusion persiste et tout monstre illusoire semblera infliger des dommages lorsqu’il attaquera un adversaire. Ces dommages sont imaginaires, tout comme les effets spéciaux générés par l’attaque : si l’adversaire perd tous ses Points de Vie, il ne mourra pas mais sombrera dans l’inconscience. Un monstre illusoire a une CA de 9 [10] et il disparaîtra si un ennemi réussit une attaque contre lui. Notez que le magicien ne peut pas accomplir d’autres actions alors qu’il se concentre sur le sort."},{"nom":"Image Miroir","reversible":0,"niveau":2,"duree":"6 tours","portee":"0","desc":"1d4 répliques illusoires du magicien apparaissent, compliquant ainsi la tâche des attaquants. Ces répliques imitent les actions du magicien : préparation de sort, absorption de potion… Les ennemis qui tentent d’atteindre le magicien devront d’abord détruire toutes les répliques ; celles-ci disparaissent dès qu’elles sont attaquées, même s’il n’y a pas de contact physique."},{"nom":"Invisibilité","reversible":0,"niveau":2,"duree":"voir description","portee":"contact","desc":"La créature ou l’objet touchés disparaissent à la vue, même en infravision. Si le sujet transporte de l’équipement, tout son matériel disparaît avec lui. Personne ne voit l’individu affecté, pas même le magicien, à moins que ce dernier ne bénéficie d’effets lui permettant de voir les créatures invisibles. Les objets lâchés ou posés par un être invisible réapparaissent instantanément. À l’inverse, les objets ramassés disparaissent s’il les glisse dans ses poches ou dans un sac qu’il transporte. La lumière ne disparaît jamais, même si sa source devient invisible (l’effet produit est donc celui d’une lumière sans source visible). Dans le cas où le sujet transporterait un objet particulièrement long (par exemple, une corde qu’il laisse dérouler derrière lui), celui-ci apparaît à 3 mètres de lui. Un personnage invisible n’est pas silencieux pour autant ; de plus, certaines conditions ou situations peuvent le rendre repérable, par exemple s’il marche dans une flaque ou dans la neige. Le sort dure indéfiniment, mais cesse dès que le sujet attaque quelqu’un ou quelque chose. On considère également comme une « attaque » tout sort prenant un adversaire pour cible, ou dont la zone d’effet comprend au moins un ennemi. Les actions dirigées contre des objets qui n’appartiennent à personne ne rompent pas l’invisibilité. Faire du mal aux gens indirectement ne constitue pas une attaque. Un individu invisible peut donc ouvrir les portes, parler, manger, gravir des escaliers, invoquer des monstres et les lancer sur ses adversaires, trancher les cordes retenant une passerelle alors que ses ennemis sont en train de la traverser, ouvrir une herse retenant des chiens de garde, etc. Par contre, s’il attaque directement, lui et son équipement redeviennent immédiatement visible. Notez que les sorts qui affectent les alliés du personnage mais pas ses ennemis, comme Bénédiction, ne sont pas considérés comme des sorts d’attaque, même lorsque leur zone d’effet englobe les ennemis du personnage."},{"nom":"Lévitation","reversible":0,"niveau":2,"duree":"niveau de magicien + 6 tours","portee":"0","desc":"Le magicien peut se déplacer en haut ou en bas comme il le désire. Il dirige mentalement ces mouvements à une vitesse de 6 m par round. Il ne peut pas se déplacer horizontalement, mais il a le droit de se hisser le long d’une falaise ou de pousser contre un plafond pour se déplacer latéralement (en généralement à la moitié de sa vitesse terrestre)."},{"nom":"Localisation d’Objet","reversible":0,"niveau":2,"duree":"2 tours","portee":"18 m + 3 m par niveau","desc":"Le magicien détecte la direction d’un objet spécifique, pour peu qu’il le connaisse ou le visualise clairement ; si l’image mentale que se fait le magicien de l’objet n’est pas suffisamment proche de la réalité, le sort ne fonctionne pas. S’il cherche un type d’objet, il détecte celui qui est le plus proche. Ce sort ne peut être utilisé pour trouver des monstres ou des personnages."},{"nom":"Lumière Continuelle","reversible":0,"niveau":2,"duree":"permanent","portee":"36 m","desc":"Ce sort crée de façon permanente une sphère lumineuse d’un diamètre de 18 m. Il peut être lancé sur des objets afin de rendre la sphère transportable mais aussi sur une créature ; dans ce cas, la créature peut effectuer un Jet de Sauvegarde contre les sorts. Si le sort est lancé avec succès sur les yeux d’une créature, celle-ci devient aveugle jusqu’à ce que le sort soit annulé par Dissipation de la Magie."},{"nom":"Toile d’Araignée","reversible":0,"niveau":2,"duree":"48 tours","portee":"3 m","desc":"Ce sort crée une grande quantité de fils épais, solides et gluants qui emprisonnent toutes les créatures dans une zone de 3 m3. Les créatures affectées sont incapables de bouger, mais peuvent se libérer plus ou moins rapidement selon leur force. Toute créature avec une caractéristique de FOR entre 3 et 18 peut se libérer en 2d4 tours. Les créatures avec plus de 18 en FOR (que cette FOR soit augmentée magiquement ou non) peuvent se libérer en 4 rounds. Les fils de la toile sont inflammables : toutes les créatures prises dans une toile enflammée subissent 1d6 points de dommages de feu pendant 2 rounds avant de recouvrer la liberté."},{"nom":"Verrou Arcane","reversible":0,"niveau":2,"duree":"permanent","portee":"3 m","desc":"Ce sort verrouille magiquement la porte, le coffre ou le portail ciblé, d’une manière semblable au sort Verrouillage. Le magicien peut passer outre sa propre Serrure Arcane sans l’affecter pour autant. Les sorts Dissipation de la Magie ou Déblocage peuvent libérer une porte ou un objet verrouillé par ce sort : le premier met fin au sort alors que le deuxième ne fait qu’autoriser un passage. En outre, tout lanceur de sort qui possède au moins 3 niveaux de classe de plus que le magicien peut ignorer les effets de la Serrure Arcane."}],
    // Clerc 58 PO + Standard = 65
    packClerc='{"nom":"Brigandine","qte":"1","poids":"10"}|{"nom":"Bouclier","qte":"1","poids":"5"}|{"nom":"Casque","qte":"1","poids":"2.5"}|{"nom":"Fronde","qte":"1","poids":"0"}|{"nom":"Masse","qte":"1","poids":"1.5"}|{"nom":"Pierres de fronde","qte":"10","poids":"0.15"}|{"nom":"Symbole religieux en bois","qte":"1","poids":"0"}',
    // Guerrier 94 PO + Standard = 103
    packGuerrier='{"nom":"Arc court","qte":"1","poids":"1"}|{"nom":"Brigandine","qte":"1","poids":"10"}|{"nom":"Bouclier","qte":"1","poids":"5"}|{"nom":"Carquois","qte":"1","poids":"0.5"}|{"nom":"Flèches","qte":"20","poids":"0.07"}|{"nom":"Casque","qte":"1","poids":"2.5"}|{"nom":"Dague","qte":"1","poids":"0.5"}|{"nom":"Epée longue","qte":"1","poids":"2"}',
    // Magicien 54 PO + Standard = 61
    packMagicien='{"nom":"Bâton","qte":"1","poids":"4"}|{"nom":"Dague","qte":"1","poids":"0.5"}|{"nom":"Fléchettes","qte":"10","poids":"0.1"}|{"nom":"Grimoire","qte":"1","poids":"1.5"}|{"nom":"Encre (fiole de 30 ml)","qte":"1","poids":"0"}|{"nom":"Plume","qte":"1","poids":"0"}',
    // Voleur 78 PO + Standard = 85
    packVoleur='{"nom":"Arc court","qte":"1","poids":"1"}|{"nom":"Armure de cuir","qte":"1","poids":"7.5"}|{"nom":"Carquois","qte":"1","poids":"0.5"}|{"nom":"Flèches","qte":"20","poids":"0.07"}|{"nom":"Dague","qte":"1","poids":"0.5"}|{"nom":"Epée courte","qte":"1","poids":"1"}|{"nom":"Pitons","qte":"12","poids":"0.33"}|{"nom":"Outils de crochetage","qte":"1","poids":"0.5"}',
    // Elfe 89 PO + Standard = 96
    packElfe='{"nom":"Arc long","qte":"1","poids":"1"}|{"nom":"Brigandine","qte":"1","poids":"10"}|{"nom":"Carquois","qte":"1","poids":"0.5"}|{"nom":"Flèches","qte":"20","poids":"0.07"}|{"nom":"Dague","qte":"1","poids":"0.5"}|{"nom":"Epée longue","qte":"1","poids":"2"}',
    // Halfelin 47 PO + Standard = 54
    packHalfelin='{"nom":"Arc court","qte":"1","poids":"1"}|{"nom":"Armure de cuir","qte":"1","poids":"7.5"}|{"nom":"Carquois","qte":"1","poids":"0.5"}|{"nom":"Flèches","qte":"20","poids":"0.07"}|{"nom":"Dague","qte":"1","poids":"0.5"}|{"nom":"Epée courte","qte":"1","poids":"1"}',
    // Standard 7 PO
    packStandard='{"nom":"Sac à dos (20 kg)","qte":"1","poids":"1"}|{"nom":"Silex et amorce","qte":"1","poids":"0"}|{"nom":"Gourde","qte":"1","poids":"0.5"}|{"nom":"Jour de rations de voyage","qte":"4","poids":"0.5"}|{"nom":"Corde en chanvre de 15 m de long","qte":"1","poids":"5"}|{"nom":"Torches","qte":"4","poids":"0.5"}',
    //Attaques
    atkClerc='{"nom":"Fronde","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"0","bonusdgt":"0"}|{"nom":"Masse","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"6","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    atkGuerrier='{"nom":"Arc court","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"6","moddgt":"0","bonusdgt":"0"}|{"nom":"Dague (Mêlée)","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Lancer)","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Epée longue","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"8","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    atkMagicien='{"nom":"Bâton","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Mêlée)","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Lancer)","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Fléchette","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    atkVoleur='{"nom":"Arc court","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"6","moddgt":"0","bonusdgt":"0"}|{"nom":"Dague (Mêlée)","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Lancer)","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Epée courte","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"6","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    atkElfe='{"nom":"Arc long","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"6","moddgt":"0","bonusdgt":"0"}|{"nom":"Dague (Mêlée)","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Lancer)","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Epée longue","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"8","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    atkHalfelin='{"nom":"Arc court","mod":"@{MOD_DEX}","bonus":"1","nbde":"1","de":"6","moddgt":"0","bonusdgt":"0"}|{"nom":"Dague (Mêlée)","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Lancer)","mod":"@{MOD_DEX}","bonus":"1","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Epée courte","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"6","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    //-----------------------------------------------------------------------------
    checkInstall = function() {
        log(""+author+"'s Portes-Monstres-Trésors script version "+version+" ("+releasedate+") installed.");
        log(warning);
        log("https://github.com/Roll20/roll20-character-sheets/tree/master/PortesMonstresTresors");
        log("Enjoy!");
    },
    //-----------------------------------------------------------------------------
    charRoll = function (playerId,paramArray) {
        //méthode de détermination des caractéristiques
        var tirage = parseInt(paramArray[0]) || 0;
        var carFOR = 0;
        var carDEX = 0;
        var carCON = 0;
        var carINT  = 0;
        var carSAG = 0;
        var carCHA  = 0;
        var tabcars=[0,0,0,0];
        //Lancer les jets de caractéristiques
        switch(tirage) {
            case 0: //Tirage 3d6 dans l'ordre
                carFOR = randomInteger(6) + randomInteger(6) + randomInteger(6);
                carDEX = randomInteger(6) + randomInteger(6) + randomInteger(6);
                carCON = randomInteger(6) + randomInteger(6) + randomInteger(6);
                carINT  = randomInteger(6) + randomInteger(6) + randomInteger(6);
                carSAG = randomInteger(6) + randomInteger(6) + randomInteger(6);
                carCHA  = randomInteger(6) + randomInteger(6) + randomInteger(6);
                break;
            case 1: //Tirage 4d6 dans l'ordre, on garde les 3 meilleurs
                //Force
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carFOR=tabcars[0]+tabcars[1]+tabcars[2];
                //Dextérité
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carDEX=tabcars[0]+tabcars[1]+tabcars[2];
                //Constitution
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carCON=tabcars[0]+tabcars[1]+tabcars[2];
                //Intelligence
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carINT=tabcars[0]+tabcars[1]+tabcars[2];
                //Sagesse
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carSAG=tabcars[0]+tabcars[1]+tabcars[2];
                //Charisme
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carCHA=tabcars[0]+tabcars[1]+tabcars[2];
                break;
        }
        //Commencer à construire le template de chat
        var msg = "&{template:pmtchar} {{name=Tirage de caractéristiques}}";
        msg = msg + "{{for="+carFOR+"}}";
        msg = msg + "{{dex="+carDEX+"}}";
        msg = msg + "{{con="+carCON+"}}";
        msg = msg + "{{int="+carINT+"}}";
        msg = msg + "{{sag="+carSAG+"}}";
        msg = msg + "{{cha="+carCHA+"}}";
        msg = msg + "{{tabcar="+carFOR+","+carDEX+","+carCON+","+carINT+","+carSAG+","+carCHA+"}}";
        //Classes avec prérequis
        if(carINT>8){msg = msg + "{{elfe=1}}";}
        if(carDEX>8 && carCON>8){msg = msg + "{{halfelin=1}}";}
        if(carCON>8){msg = msg + "{{nain=1}}";}
        //Fin
        sendChat("player|"+playerId, msg);
        return;
    },
    //-----------------------------------------------------------------------------
    charNew = function (playerId,paramArray) {
        /*
            paramArray[0] : classe
            paramArray[1] : nom du personnage
            paramArray[2] : valeurs des caractéristiques, séparées par des ,
        */
        var classe = paramArray[0];
        var nom = paramArray[1];
        var tmp = paramArray[2] || "";
        var tabcars = tmp.split(",");
        //Préparation des valeurs
        var Niveau= 1;
        var Alignement="Neutralité";
        var Force=parseInt(tabcars[0]);
        var MOD_FOR=0;
        if (Force <4) {MOD_FOR=-3;}
            else if (Force>3 && Force<6) {MOD_FOR=-2;}
            else if (Force>5 && Force<9) {MOD_FOR=-1;}
            else if (Force>12 && Force<16) {MOD_FOR=1;}
            else if (Force>15 && Force<18) {MOD_FOR=2;}
            else if (Force>17) {MOD_FOR=3;}
            else {MOD_FOR=0;}
        var Dexterite=parseInt(tabcars[1]);
        var MOD_DEX=0;
        if (Dexterite <4) {MOD_DEX=-3;}
            else if (Dexterite>3 && Dexterite<6) {MOD_DEX=-2;}
            else if (Dexterite>5 && Dexterite<9) {MOD_DEX=-1;}
            else if (Dexterite>12 && Dexterite<16) {MOD_DEX=1;}
            else if (Dexterite>15 && Dexterite<18) {MOD_DEX=2;}
            else if (Dexterite>17) {MOD_DEX=3;}
            else {MOD_DEX=0;}
        var Constitution=parseInt(tabcars[2]);
        var MOD_CON=0;
        if (Constitution <4) {MOD_CON=-3;}
            else if (Constitution>3 && Constitution<6) {MOD_CON=-2;}
            else if (Constitution>5 && Constitution<9) {MOD_CON=-1;}
            else if (Constitution>12 && Constitution<16) {MOD_CON=1;}
            else if (Constitution>15 && Constitution<18) {MOD_CON=2;}
            else if (Constitution>17) {MOD_CON=3;}
            else {MOD_CON=0;}
        var Intelligence=parseInt(tabcars[3]);
        var MOD_INT=0;
        if (Intelligence>12 && Intelligence<16) {MOD_INT=1;}
            else if (Intelligence>15 && Intelligence<18) {MOD_INT=2;}
            else if (Intelligence>17) {MOD_INT=3;}
            else {MOD_INT=0;}
        var Sagesse=parseInt(tabcars[4]);
        var MOD_SAG=0;
        if (Sagesse <4) {MOD_SAG=-3;}
            else if (Sagesse>3 && Sagesse<6) {MOD_SAG=-2;}
            else if (Sagesse>5 && Sagesse<9) {MOD_SAG=-1;}
            else if (Sagesse>12 && Sagesse<16) {MOD_SAG=1;}
            else if (Sagesse>15 && Sagesse<18) {MOD_SAG=2;}
            else if (Sagesse>17) {MOD_SAG=3;}
            else {MOD_SAG=0;}
        var Charisme=parseInt(tabcars[5]);
        var MOD_CHA=0;
        var MaxCompagnons=0;
        var MoralCompagnons=0;
        if (Charisme <4) {
                MOD_CHA=2;
                MaxCompagnons=1;
                MoralCompagnons=4;
            }
            else if (Charisme>3 && Charisme<6) {
                MOD_CHA=1;
                MaxCompagnons=2;
                MoralCompagnons=5;
            }
            else if (Charisme>5 && Charisme<9) {
                MOD_CHA=1;
                MaxCompagnons=3;
                MoralCompagnons=6;
            }
            else if (Charisme>12 && Charisme<16) {
                MOD_CHA=-1;
                MaxCompagnons=5;
                MoralCompagnons=8;
            }
            else if (Charisme>15 && Charisme<18) {
                MOD_CHA=-1;
                MaxCompagnons=6;
                MoralCompagnons=9;
            }
            else if (Charisme>17) {
                MOD_CHA=-2;
                MaxCompagnons=7;
                MoralCompagnons=10;
            }
            else {
                MOD_CHA=0;
                MaxCompagnons=4;
                MoralCompagnons=7;
            }
        // en fonction de la classe
        var DV = 0;
        var PV = 0;
        var XP = 0;
        var ATK_Bonus=1;
        var JS_Souffles=0;
        var JS_Poison=0;
        var JS_Petrification=0;
        var JS_Baton=0;
        var JS_Sorts=0;
        var ToucheCAm6=20;
        var ToucheCAm5=20;
        var ToucheCAm4=20;
        var ToucheCAm3=20;
        var ToucheCAm2=20;
        var ToucheCAm1=20;
        var ToucheCA0=19;
        var ToucheCA1=18;
        var ToucheCA2=17;
        var ToucheCA3=16;
        var ToucheCA4=15;
        var ToucheCA5=14;
        var ToucheCA6=13;
        var ToucheCA7=12;
        var ToucheCA8=11;
        var ToucheCA9=10;
        var lesort ="";
        var lepack="";
        var latak="";
        var lecout=0;
        var CaAscArmure = 0;
        var CaDescArmure = 0;
        var CaBouclier = 0;
        var CaracPrinc = 0;
        var laclasse = 0;
        var nbsortniv1 = 0;
        var sortno1 = 0;
        var sortno2 = 0;
        var sortno3 = 0;
        sortno1 = randomInteger(12)-1;
        sortno2 = randomInteger(12)-1;
        while (sortno1 == sortno2) {
            sortno2 = randomInteger(12)-1;
        }
        sortno3 = randomInteger(12)-1;
        switch(classe){
            case 'clerc':
                laclasse = 0;
                DV = 6;
                XP = 1565;
                JS_Souffles=16;
                JS_Poison=11;
                JS_Petrification=14;
                JS_Baton=12;
                JS_Sorts=15;                
                lesort=sortsDivins1;
                lepack=""+packClerc+"|"+packStandard;
                lecout=65;
                CaAscArmure = 12;
                CaDescArmure = 7;
                CaBouclier = 1;
                CaracPrinc = Sagesse;
                latak = atkClerc;
                nbsortniv1 = 1;
                break;
            case 'guerrier':
                laclasse = 1;
                DV = 8;
                XP = 2035;
                JS_Souffles=17;
                JS_Poison=14;
                JS_Petrification=16;
                JS_Baton=15;
                JS_Sorts=18;
                lesort="";
                lepack=""+packGuerrier+"|"+packStandard;
                lecout=103;
                CaAscArmure = 12;
                CaDescArmure = 7;
                CaBouclier = 1;
                CaracPrinc = Force;
                latak = atkGuerrier;
                break;
            case 'magicien':
                laclasse = 2;
                DV = 4;
                XP = 2501;
                JS_Souffles=16;
                JS_Poison=13;
                JS_Petrification=13;
                JS_Baton=13;
                JS_Sorts=14;
                lesort=JSON.stringify(sortsProfanes1[sortno1]) + '|' + JSON.stringify(sortsProfanes1[sortno2]) + '|' + JSON.stringify(sortsProfanes2[sortno3]);
                lepack=""+packMagicien+"|"+packStandard;
                lecout=61;
                CaAscArmure = 10;
                CaDescArmure = 9;
                CaBouclier = 0;
                CaracPrinc = Intelligence;
                latak = atkMagicien;
                nbsortniv1 = 1;
                break;
            case 'voleur':
                laclasse = 3;
                DV = 4;
                XP = 1251;
                JS_Souffles=16;
                JS_Poison=14;
                JS_Petrification=13;
                JS_Baton=15;
                JS_Sorts=14;
                lesort="";
                lepack=""+packVoleur+"|"+packStandard;
                lecout=85;
                CaAscArmure = 11;
                CaDescArmure = 8;
                CaBouclier = 0;
                CaracPrinc = Dexterite;
                latak = atkVoleur;
                break;
            case 'elfe':
                laclasse = 4;
                DV = 6;
                XP = 4065;
                JS_Souffles=15;
                JS_Poison=12;
                JS_Petrification=13;
                JS_Baton=13;
                JS_Sorts=15;
                lesort=JSON.stringify(sortsProfanes1[sortno1]) + '|' + JSON.stringify(sortsProfanes1[sortno2]) + '|' + JSON.stringify(sortsProfanes2[sortno3]);
                lepack=""+packElfe+"|"+packStandard;
                lecout=96;
                CaAscArmure = 12;
                CaDescArmure = 7;
                CaBouclier = 0;
                CaracPrinc = Math.max(Force, Intelligence);
                latak = atkElfe;
                nbsortniv1 = 1;
                break;
            case 'halfelin':
                laclasse = 5;
                DV = 6;
                XP = 2035;
                JS_Souffles=13;
                JS_Poison=8;
                JS_Petrification=10;
                JS_Baton=9;
                JS_Sorts=12;
                lesort="";
                lepack=""+packHalfelin+"|"+packStandard;
                lecout=54;
                CaAscArmure = 11;
                CaDescArmure = 8;
                CaBouclier = 0;
                CaracPrinc = Math.max(Dexterite, Constitution);
                latak = atkHalfelin;
                break;
            case 'nain':
                laclasse = 6;
                DV = 8;
                XP = 2187;
                JS_Souffles=13;
                JS_Poison=8;
                JS_Petrification=10;
                JS_Baton=9;
                JS_Sorts=12;
                lesort="";
                lepack=""+packGuerrier+"|"+packStandard;
                lecout=103;
                CaAscArmure = 12;
                CaDescArmure = 7;
                CaBouclier = 1;
                CaracPrinc = Force;
                latak = atkGuerrier;
                break;
        }
        var BonusXp = 0;
        if (CaracPrinc <6) {BonusXp=-10;}
            else if (CaracPrinc>5 && CaracPrinc<9) {BonusXp=-5;}
            else if (CaracPrinc>12 && CaracPrinc<16) {BonusXp=5;}
            else if (CaracPrinc>16) {BonusXp=10;}
            else {BonusXp=0;}
        var equippo= Math.max(((randomInteger(8)+randomInteger(8)+randomInteger(8))*10)-lecout,0);
        PV = Math.max(DV+MOD_CON,1);
        //Création du personnage / l'objet character
        var char = createObj("character", {
                name: nom,
                inplayerjournals: "all",
                controlledby: playerId
            });
        //Base
        createObj("attribute", {name: "Classe", current: laclasse, characterid: char.id});
        createObj("attribute", {name: "Niveau", current: Niveau, characterid: char.id});
        createObj("attribute", {name: "DV", current: DV, characterid: char.id});
        createObj("attribute", {name: "PV", current: PV, max: PV, characterid: char.id});
        createObj("attribute", {name: "XP", current: 0, max: XP, characterid: char.id});
        createObj("attribute", {name: "BonusXp", current: BonusXp, characterid: char.id});
        createObj("attribute", {name: "sheetOptionCa", current: 1, characterid: char.id});
        createObj("attribute", {name: "CaAscArmure", current: CaAscArmure, characterid: char.id});
        createObj("attribute", {name: "CaDescArmure", current: CaDescArmure, characterid: char.id});
        createObj("attribute", {name: "CaBouclier", current: CaBouclier, characterid: char.id});
        createObj("attribute", {name: "Alignement", current: Alignement, characterid: char.id});
        createObj("attribute", {name: "nbsortniv1", current: nbsortniv1, characterid: char.id})
        // Caractéristiques
        createObj("attribute", {name: "Force", current: Force, characterid: char.id});
        createObj("attribute", {name: "MOD_FOR", current: MOD_FOR, characterid: char.id});
        createObj("attribute", {name: "Dexterite", current: Dexterite, characterid: char.id});
        createObj("attribute", {name: "MOD_DEX", current: MOD_DEX, characterid: char.id});
        createObj("attribute", {name: "Constitution", current: Constitution, characterid: char.id});
        createObj("attribute", {name: "MOD_CON", current: MOD_CON, characterid: char.id});
        createObj("attribute", {name: "Intelligence", current: Intelligence, characterid: char.id});
        createObj("attribute", {name: "MOD_INT", current: MOD_INT, characterid: char.id});
        createObj("attribute", {name: "Sagesse", current: Sagesse, characterid: char.id});
        createObj("attribute", {name: "MOD_SAG", current: MOD_SAG, characterid: char.id});
        createObj("attribute", {name: "Charisme", current: Charisme, characterid: char.id});
        createObj("attribute", {name: "MOD_CHA", current: MOD_CHA, characterid: char.id});
        createObj("attribute", {name: "MaxCompagnons", current: MaxCompagnons, characterid: char.id});
        createObj("attribute", {name: "MoralCompagnons", current: MoralCompagnons, characterid: char.id});
        // Jets de Sauvegarde
        createObj("attribute", {name: "JS_Souffles", current: JS_Souffles, characterid: char.id});
        createObj("attribute", {name: "JS_Poison", current: JS_Poison, characterid: char.id});
        createObj("attribute", {name: "JS_Petrification", current: JS_Petrification, characterid: char.id});
        createObj("attribute", {name: "JS_Baton", current: JS_Baton, characterid: char.id});
        createObj("attribute", {name: "JS_Sorts", current: JS_Sorts, characterid: char.id});
        // Attaques
        createObj("attribute", {name: "ATK_Bonus", current: ATK_Bonus, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm6", current: ToucheCAm6, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm5", current: ToucheCAm5, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm4", current: ToucheCAm4, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm3", current: ToucheCAm3, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm2", current: ToucheCAm2, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm1", current: ToucheCAm1, characterid: char.id});
        createObj("attribute", {name: "ToucheCA0", current: ToucheCA0, characterid: char.id});
        createObj("attribute", {name: "ToucheCA1", current: ToucheCA1, characterid: char.id});
        createObj("attribute", {name: "ToucheCA2", current: ToucheCA2, characterid: char.id});
        createObj("attribute", {name: "ToucheCA3", current: ToucheCA3, characterid: char.id});
        createObj("attribute", {name: "ToucheCA4", current: ToucheCA4, characterid: char.id});
        createObj("attribute", {name: "ToucheCA5", current: ToucheCA5, characterid: char.id});
        createObj("attribute", {name: "ToucheCA6", current: ToucheCA6, characterid: char.id});
        createObj("attribute", {name: "ToucheCA7", current: ToucheCA7, characterid: char.id});
        createObj("attribute", {name: "ToucheCA8", current: ToucheCA8, characterid: char.id});
        createObj("attribute", {name: "ToucheCA9", current: ToucheCA9, characterid: char.id});
        //Argent
        createObj("attribute", {name: "equip-po", current: equippo, characterid: char.id});
        //---
        //Eléments stockés dans des attributs todoxxx et qui seront traités par Sheet Worker sheet opened
        // -- Sorts
        if (lesort.length > 0){
            createObj("attribute", {name: "todosort", current: lesort, characterid: char.id});
        }
        // -- Equipements
        createObj("attribute", {name: "todoequip", current: lepack, characterid: char.id});
        // -- Attaques
        createObj("attribute", {name: "todoatk", current: latak, characterid: char.id});
        //Affichage du résultat
        var msg = "&{template:pmtchar} {{name=Personnage créé}}";
        msg = msg + "{{personnage="+nom+"}}";
        msg = msg + "{{classe="+classe+"}}";
        msg = msg + "{{charid="+char.id+"}}";
        sendChat("player|"+playerId, msg);
        return;
    },
    //-----------------------------------------------------------------------------
    handleAttributeEvent = function(obj, prev) {
        /*
            Check and set character states according to stats pools attributes
                and special damage, when their current values are manually
                changed on the sheet or directly in the character window.
            Note that this event isn't fired when attributes are modified by API functions,
                that's why some functions here call checkCharStates() too.
        */
        var attrName = obj.get("name");
        if ( attrName=="might" || attrName=="speed" || attrName=="intellect" || attrName=="SpecialDamage") {
            checkCharStates(getObj("character", obj.get("_characterid")));
        }
        return;
    },
    //-----------------------------------------------------------------------------
    handleInput = function(msg) {
        if (msg.type !== "api") {
            return;
        }
        var paramArray= [];
        var functionCalled = "";
        if (msg.content.indexOf("!pmt-") !== 0) {
            return;
        } else {
            if (parseInt(msg.content.indexOf(" ")) ==-1) {
                functionCalled = msg.content;
            } else {
                functionCalled = msg.content.split(" ")[0];
                paramArray[0] = msg.content.replace(functionCalled,"").trim();
                //log("Function called:"+functionCalled+" Parameters:"+paramArray[0]); //DEBUG
                if (parseInt(paramArray[0].indexOf("|")) !=-1) {
                    //more than 1 parameter (supposedly character_id as first parameter)
                    paramArray = paramArray[0].split("|");
                }
            }
        }
        switch(functionCalled) {
            case '!pmt-rollchar':
                // Initier une création de perso, et proposer des choix
                //sendChat("GM", "&{template:pmt} {{chatmessage=cypher-checkpcstate}} {{noCharacter="+msg.content+"}}");
                charRoll(msg.playerid,paramArray);
                break;
            case '!pmt-newchar':
                // Créer un personnage à partir des choix et carac générés par rollchar/charRoll
                charNew(msg.playerid, paramArray);
                break;
        }
        return;
    },
    //-----------------------------------------------------------------------------
    registerEventHandlers = function() {
        on('chat:message', handleInput);
        //on('change:attribute:current', handleAttributeEvent);
    };
    //-----------------------------------------------------------------------------
    return {
        CheckInstall: checkInstall,
        RegisterEventHandlers: registerEventHandlers
    };
}());
//-----------------------------------------------------------------------------
on('ready',function() {
    'use strict';
    PmT.CheckInstall();
    PmT.RegisterEventHandlers();
});
