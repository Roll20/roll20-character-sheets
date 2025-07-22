# Space Horror Stories - Roll20

Version Calma

Cette fiche a été réalisée en partie grâce au travail de [Fardatir](https://fardatir.notion.site/Configuration-de-table-SHS-sur-Roll20-dac9fe969e764648a785218e854128dc)

## Comment utiliser rapidement ce truc

En deux mots, suivez le tuto de Fardatir mais en utilisant les fichiers shs.html et shs.css de ce dépôt.

## Bonus MJ

Comme nous gérons les jets de dommage, nous proposons les deux [macros](https://wiki.roll20.net/Macros) suivantes que vous pouvez créer sur votre campagne:

Dommages:
```macro
&{template:damage}{{roll=[[1d8 + ?{Impact ?|0} - ?{Protection ?|0}]]}} {{weapon=?{Arme / créature ?}}}
```
Dommages de corrosion:
```macro
&{template:burndamage}{{roll=[[1d8 + ?{Impact ?|0} - ?{Protection ?|0}]]}} {{weapon=?{Arme / créature ?}}}```
