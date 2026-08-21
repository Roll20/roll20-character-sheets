<!-- English summary for reviewers; full documentation in Spanish below. -->

**Umbral (Eleina)** — character sheet for *Umbral*, the original RPG system of the *Eleina*
setting. CSE sheet (`"legacy": false`), no external images, fonts or API scripts, no character
creation or advancement.

The complete rules are public and free at **https://eleina.info/umbral/**.

---

# Umbral — hoja de personaje para Roll20

El sistema de rol de **Eleina**. Esta carpeta es lo que se manda al repositorio de hojas de
Roll20: `umbral.html`, `umbral.css`, `preview.png` y `sheet.json`.

Hoja **CSE** (`"legacy": false`): las clases llevan el prefijo `sheet-` escrito a mano en el
HTML y el CSS las busca tal cual, sin que Roll20 añada nada.

## Qué hace la hoja

**Se calcula sola** lo que el reglamento deriva: Aguante = 10 + Vigor × 2 (+ raza y dotes),
Defensa = 9 + Destreza + protección, Esencia = 3 + Voluntad + grado del Hilo. Los máximos están
bloqueados a propósito — si se pudieran escribir a mano habría dos verdades.

**Cuatro pestañas**: Ficha (atributos, combate, armas, estados), Oficios y dotes, Magia, Notas.
**Once botones de tirada**, todos con la misma plantilla de resultado.

Cada botón pregunta el dado —normal, ventaja o desventaja— y devuelve el total, el Umbral, el
margen y el grado ya leído. El 12 y el 1 naturales se avisan aparte, porque mueven el grado.

## Cómo se juega un golpe

Es la variante de mesa del [Libro VI](https://eleina.info/umbral/mesa-tactica.html): **tiradas enfrentadas y bandas de seis**.

1. Quien ataca pulsa **Atacar** — 1d12 + Atributo del arma + Oficio que cubra pelear.
2. Quien recibe pulsa **Defenderse** — 1d12 + Destreza + protección + Oficio que cubra defenderse.
3. Quien dirige pulsa **Resolver el golpe** y escribe los dos totales. Sale el margen, el grado y
   el daño ya calculado.

El margen es siempre del atacante y el empate lo gana él. Fuera del combate, los botones de
Atributo y de Oficio tiran contra un Umbral fijo con las bandas de cuatro de siempre.

## Antes de la primera sesión

**Las barras del token.** En los ajustes del token: **barra 1 → `aguante`**, **barra 2 →
`esencia`**, **barra 3 → `aliento`**. Así se ve el daño sobre el tablero sin abrir la ficha.

**Los estados.** Los cinco de Umbral —Aturdido, Sangrando, Quebrantado, Enmarañado, Cegado— van
como marcadores de estado del token, además de las casillas de la hoja.

**Sin iniciativa.** Umbral no la tiene: actúan primero los jugadores, en el orden que decidan, y
después los enemigos. No hace falta tocar la barra de turnos de Roll20.

**Los enemigos** se hacen con la misma hoja. Los del bestiario vienen con Ataque y Defensa
pensados para jugar por escrito; en mesa se juegan restando: se ataca con `1d12 + (Ataque − 12)` y
se defiende con `1d12 + (Defensa − 7)`. Lo cómodo es apuntar ya el bonificador restado en el
Atributo de la ficha del PNJ y dejar el Oficio a 0.

## Lo que no hace, y es a propósito

No calcula el margen entre dos jugadores automáticamente: Roll20 no deja que una hoja lea la
tirada de otra persona. Por eso existe **Resolver el golpe**, que es un botón de máster con dos
números.

No aplica el 12 ni el 1 natural sobre el grado: los avisa. Meterlo en la fórmula obligaba a
malabares que se rompen en cuanto Roll20 cambia algo, y leer una línea es más rápido que depurar
una plantilla.

No hace creación ni progresión de personaje. El repositorio de Roll20 lo desaconseja
expresamente, y en Umbral la Forja vive en la web.

## Detalles de la plantilla de tirada

Las secciones de la plantilla van **planas, sin anidar**: anidar una sección normal dentro de un
ayudante de tirada no es de fiar. Por eso el defensor tira con su propia clave (`natdef`) y el
reflujo de la magia con la suya (`reflujo`), y cada aviso es un bloque suelto.

---

Licencia MIT, como todo el repositorio.
El reglamento completo y abierto: **https://eleina.info/umbral/**
El mundo: **https://eleina.info/apocrifo.html**
