# MACROS de NATHA pour NUMENERA sur ROLL20

**LISEZ MOI :**

Pour être utilisées, ces macros nécessitent  :
- les scripts API en français qui vont bien (NathasNumenera_Roll20_API_French.js) 
- la feuille de personnage adaptée (NathasNumenera_Roll20_CharacterSheet_Layout_French.htm et NathasNumenera_Roll20_CharacterSheet_CSS.css)
- un pion sélectionné qui représente un Personnage 
- la feuille de personnage doit avoir été remplie : au moins les Attributs courant et maximum, les atouts, l'état général et de récupération, le bonus de récupération, le coût de Vivacité de l'Armure etc.

## +/-:Rob.
_Ajoute ou soustrait des points de Robustesse et vérifie l'état général, les marqueurs du pion etc._
```
!nathanum-attrib @{selected|token_id}|might|?{Robustesse +/-|0}
```

## +/-:Viv.
_Ajoute ou soustrait des points de Vivacité et vérifie l'état général, les marqueurs du pion etc._
```
!nathanum-attrib @{selected|token_id}|speed|?{Vivacité +/-|0}
```

## +/-:Men.
_Ajoute ou soustrait des points de Mental et vérifie l'état général, les marqueurs du pion etc._
```
!nathanum-attrib @{selected|token_id}|intellect|?{Mental +/-|0}
```

## Initiative
_Demande d'éventuels : nombre d'Efforts de Vivacité, bonus au jet, dépense de Vivacité supplémentaire (en plus de l'Effort, pour l'utilisation d'une capacité spéciale par exemple). Cela diminuera la Vivacité (si nécessaire), vérifie l'état général, l'état du pion etc. Ensuite, lance 1d20 pour l'initiative, ajoute le pion au Turn Tracker, et affiche le résultat dans le Chat._

**ATTENTION :** 
- Ce n'est pas le jet d'initiatve standard de Numenéra : cela ajoute l'effort au jet de D20, ainsi que le bonus, et ce résultat est envoyé au Turn Tracker (pour le pion sélectionné)
- Le but est de trier/comparer ce jet entre les PJs et les PNJs (Niveau*3)
- Ne fonctionne que pour les PJs. Pour les PNJs, ajoutez les au Turn Tracker manuellement ou via une macro simple (avec Niveau*3)
- Si utilisée 2 fois pour un PJ sans vider le Turn Tracker, l'ajoute 2 fois ...
```
!nathanum-initroll @{selected|token_id}|?{Effort de Vivacité|0}|?{Bonus au jet|0}|?{Coût supplémentaire de Vivacité|0}
```

## Jet:Robu.
_Jet de Robustesse, demandant les éventuelles données suivantes : Niveau/Difficulté (pas la Cible !), nombre d'efforts, bonus au jet et dépense supplémentaire d'attribut (utilisation d'une capacité spéciale par exemple). Cela diminuera l'attribut, vérifiera l'état général, l'état du pion etc. Le jet est calculé, le succès ou l'échec aussi, et s'affiche (avec un éventuel effet supplémentaire) dans le chat._
```
!nathanum-numeneroll @{selected|token_id}|might|?{Difficulté|0}|?{Effort de Robustesse|0}|?{Bonus au jet|0}|?{Coût supplémentaire|0}
```

## Jet:Viva.
_Jet de Vivacité, demandant les éventuelles données suivantes : Niveau/Difficulté (pas la Cible !), nombre d'efforts, bonus au jet et dépense supplémentaire d'attribut (utilisation d'une capacité spéciale par exemple). Cela diminuera l'attribut, vérifiera l'état général, l'état du pion etc. Le jet est calculé, le succès ou l'échec aussi, et s'affiche (avec un éventuel effet supplémentaire) dans le chat._
```
!nathanum-numeneroll @{selected|token_id}|speed|?{Difficulté|0}|?{Effort de Vivacité|0}|?{Bonus au jet|0}|?{Coût supplémentaire|0}
```

## Jet:Ment.
_Jet de Mental, demandant les éventuelles données suivantes : Niveau/Difficulté (pas la Cible !), nombre d'efforts, bonus au jet et dépense supplémentaire d'attribut (utilisation d'une capacité spéciale par exemple). Cela diminuera l'attribut, vérifiera l'état général, l'état du pion etc. Le jet est calculé, le succès ou l'échec aussi, et s'affiche (avec un éventuel effet supplémentaire) dans le chat._
```
!nathanum-numeneroll @{selected|token_id}|intellect|?{Difficulté|0}|?{Effort de Mental|0}|?{Bonus au jet|0}|?{Coût supplémentaire|0}
```

## Récup.
_Jet de Récupération. Vérifie si le personnage peut encore faire un jet de récupération, avancera l'état de récupération, jette 1d6 + le bonus de récupération et affiche le tout dans le chat._

**ATTENTION :** ne demande rien / pas de confirmation ...
```
!nathanum-recoveryroll @{selected|token_id}
```

## Repos
_Repos long. Je suggère que cette macro soit réservée au MJ. Cela "reset" le personnage : tous les attributs à leur maximum (moins la réduction de Vivacité dûe à l'armure), remet à 0 les récupérations et l'état général etc._

**ATTENTION :** ne demande rien / pas de confirmation ...
```
!nathanum-restchar @{selected|token_id}
```
