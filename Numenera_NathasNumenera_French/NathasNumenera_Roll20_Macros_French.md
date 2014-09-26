# MACROS de NATHA pour NUMENERA sur ROLL20

**LISEZ MOI :**

Pour être utilis&eacute;es, ces macros n&eacute;cessitent  :
- les scripts API en français qui vont bien (NathasNumenera_Roll20_API_French.js) 
- la feuille de personnage adapt&eacute;e (NathasNumenera_Roll20_CharacterSheet_Layout_French.htm et NathasNumenera_Roll20_CharacterSheet_CSS.css)
- un pion s&eacute;lectionn&eacute; qui repr&eacute;sente un Personnage 
- la feuille de personnage doit avoir &eacute;t&eacute; remplie : au moins les Attributs courant et maximum, les atouts, l'&eacute;tat g&eacute;n&eacute;ral et de r&eacute;cup&eacute;ration, le bonus de r&eacute;cup&eacute;ration, le co&ucirc;t de Vivacit&eacute; de l'Armure etc.

## +/-:Rob.
_Ajoute ou soustrait des points de Robustesse et v&eacute;rifie l'&eacute;tat g&eacute;n&eacute;ral, les marqueurs du pion etc._
```
!nathanum-attrib @{selected|token_id}|might|?{Robustesse +/-|0}
```

## +/-:Viv.
_Ajoute ou soustrait des points de Vivacit&eacute; et v&eacute;rifie l'&eacute;tat g&eacute;n&eacute;ral, les marqueurs du pion etc._
```
!nathanum-attrib @{selected|token_id}|speed|?{Vivacit&eacute; +/-|0}
```

## +/-:Men.
_Ajoute ou soustrait des points de Mental et v&eacute;rifie l'&eacute;tat g&eacute;n&eacute;ral, les marqueurs du pion etc._
```
!nathanum-attrib @{selected|token_id}|intellect|?{Mental +/-|0}
```

## Initiative
_Demande d'&eacute;ventuels : nombre d'Efforts de Vivacit&eacute;, bonus au jet, d&eacute;pense de Vivacit&eacute; suppl&eacute;mentaire (en plus de l'Effort, pour l'utilisation d'une capacit&eacute; sp&eacute;ciale par exemple). Cela diminuera la Vivacit&eacute; (si n&eacute;cessaire), v&eacute;rifie l'&eacute;tat g&eacute;n&eacute;ral, l'&eacute;tat du pion etc. Ensuite, lance 1d20 pour l'initiative, ajoute le pion au Turn Tracker, et affiche le r&eacute;sultat dans le Chat._

**ATTENTION :** 
- Ce n'est pas le jet d'initiatve standard de Numen&eacute;ra : cela ajoute l'effort au jet de D20, ainsi que le bonus, et ce r&eacute;sultat est envoy&eacute; au Turn Tracker (pour le pion s&eacute;lectionn&eacute;)
- Le but est de trier/comparer ce jet entre les PJs et les PNJs (Niveau*3)
- Ne fonctionne que pour les PJs. Pour les PNJs, ajoutez les au Turn Tracker manuellement ou via une macro simple (avec Niveau*3)
- Si utilis&eacute;e 2 fois pour un PJ sans vider le Turn Tracker, l'ajoute 2 fois ...
```
!nathanum-initroll @{selected|token_id}|?{Effort de Vivacit&eacute;|0}|?{Bonus au jet|0}|?{Co&ucirc;t suppl&eacute;mentaire de Vivacit&eacute;|0}
```

## Jet:Robu.
_Jet de Robustesse, demandant les &eacute;ventuelles donn&eacute;es suivantes : Niveau/Difficult&eacute; (pas la Cible !), nombre d'efforts, bonus au jet et d&eacute;pense suppl&eacute;mentaire d'attribut (utilisation d'une capacit&eacute; sp&eacute;ciale par exemple). Cela diminuera l'attribut, v&eacute;rifiera l'&eacute;tat g&eacute;n&eacute;ral, l'&eacute;tat du pion etc. Le jet est calcul&eacute;, le succ&egrave;s ou l'&eacute;chec aussi, et s'affiche (avec un &eacute;ventuel effet suppl&eacute;mentaire) dans le chat._
```
!nathanum-numeneroll @{selected|token_id}|might|?{Difficult&eacute;|0}|?{Effort de Robustesse|0}|?{Bonus au jet|0}|?{Co&ucirc;t suppl&eacute;mentaire|0}
```

## Jet:Viva.
_Jet de Vivacit&eacute;, demandant les &eacute;ventuelles donn&eacute;es suivantes : Niveau/Difficult&eacute; (pas la Cible !), nombre d'efforts, bonus au jet et d&eacute;pense suppl&eacute;mentaire d'attribut (utilisation d'une capacit&eacute; sp&eacute;ciale par exemple). Cela diminuera l'attribut, v&eacute;rifiera l'&eacute;tat g&eacute;n&eacute;ral, l'&eacute;tat du pion etc. Le jet est calcul&eacute;, le succ&egrave;s ou l'&eacute;chec aussi, et s'affiche (avec un &eacute;ventuel effet suppl&eacute;mentaire) dans le chat._
```
!nathanum-numeneroll @{selected|token_id}|speed|?{Difficult&eacute;|0}|?{Effort de Vivacit&eacute;|0}|?{Bonus au jet|0}|?{Co&ucirc;t suppl&eacute;mentaire|0}
```

## Jet:Ment.
_Jet de Mental, demandant les &eacute;ventuelles donn&eacute;es suivantes : Niveau/Difficult&eacute; (pas la Cible !), nombre d'efforts, bonus au jet et d&eacute;pense suppl&eacute;mentaire d'attribut (utilisation d'une capacit&eacute; sp&eacute;ciale par exemple). Cela diminuera l'attribut, v&eacute;rifiera l'&eacute;tat g&eacute;n&eacute;ral, l'&eacute;tat du pion etc. Le jet est calcul&eacute;, le succ&egrave;s ou l'&eacute;chec aussi, et s'affiche (avec un &eacute;ventuel effet suppl&eacute;mentaire) dans le chat._
```
!nathanum-numeneroll @{selected|token_id}|intellect|?{Difficult&eacute;|0}|?{Effort de Mental|0}|?{Bonus au jet|0}|?{Co&ucirc;t suppl&eacute;mentaire|0}
```

## R&eacute;cup.
_Jet de R&eacute;cup&eacute;ration. V&eacute;rifie si le personnage peut encore faire un jet de r&eacute;cup&eacute;ration, avancera l'&eacute;tat de r&eacute;cup&eacute;ration, jette 1d6 + le bonus de r&eacute;cup&eacute;ration et affiche le tout dans le chat._

**ATTENTION :** ne demande rien / pas de confirmation ...
```
!nathanum-recoveryroll @{selected|token_id}
```

## Repos
_Repos long. Je sugg&egrave;re que cette macro soit r&eacute;serv&eacute;e au MJ. Cela "reset" le personnage : tous les attributs &agrave; leur maximum (moins la r&eacute;duction de Vivacit&eacute; d&ucirc;e &agrave; l'armure), remet &agrave; 0 les r&eacute;cup&eacute;rations et l'&eacute;tat g&eacute;n&eacute;ral etc._

**ATTENTION :** ne demande rien / pas de confirmation ...
```
!nathanum-restchar @{selected|token_id}
```
