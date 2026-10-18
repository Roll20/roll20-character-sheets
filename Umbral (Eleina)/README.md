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

**Cuatro pestañas**: Ficha (atributos, combate, armadura, armas, estados), Oficios y equipo,
Magia, Notas.
**Once botones de tirada**, todos con la misma plantilla de resultado.

Cada botón pregunta el dado —normal, ventaja o desventaja— y devuelve el total, el Umbral, el
margen y el grado ya leído. El 12 y el 1 naturales se avisan aparte, porque mueven el grado.

## Cómo se juega un golpe

Son los modos **Narrativo y Táctico** del [Libro VI](https://eleina.info/umbral/mesa-tactica.html):
**tiradas enfrentadas y bandas de seis**. El tercer modo, Mesa, es la partida por escrito y se
juega en la web, no aquí.

1. Quien ataca pulsa **Atacar** — 1d12 + Atributo del arma + Oficio que cubra pelear.
2. Quien recibe pulsa **Defenderse** — 1d12 + Destreza + protección + Oficio que cubra defenderse.
3. Quien dirige pulsa **Resolver el golpe** y escribe los dos totales. Sale el margen, el grado y
   el daño ya calculado.

El margen es siempre del atacante y el empate lo gana él. Fuera del combate, los botones de
Atributo y de Oficio tiran contra un Umbral fijo con las bandas de cuatro de siempre.

## Equipo, armadura y Estorbo

Cada cosa con nombre **ocupa** de 0 a 3 y se cuenta hasta **4 + Vigor**. Al pasarte estás
**Cargado**: desventaja al correr, trepar, nadar, saltar y al sigilo, y una casilla menos de
movimiento con tablero. Soltar es gratis y no cuesta acción. El medidor de arriba del equipo dice
lo que llevas, lo que aguantas y de dónde sale el número.

**La armadura puesta no cuenta Estorbo**, pero la limita el Vigor y es un límite duro —ligera pide
Vigor 0, media 1, pesada 2, completa 3—. La hoja lo avisa en rojo debajo del peldaño en cuanto no
llegas. El escudo va *dentro* del peldaño, así que no sube la Defensa por su cuenta, pero ocupa una
mano y su Estorbo sí se anota.

**Los bultos de carga suben el tope más de lo que ocupan.** Es la excepción de la escala, y por eso
la fila de equipo tiene dos columnas más: *sube el tope* y *dónde*.

| Bulto | Ocupa | Sube | Dónde |
|---|:-:|:-:|---|
| Zurrón | 0 | 1 | encima |
| Petate | 1 | 3 | encima |
| Mochila de campaña | 2 | 5 | encima |
| Mochila de porteador | 3 | 8 | encima |
| Alforjas | 0 | 5 | montura |
| Aparejo de carga | 0 | 9 | montura |
| Carro con mula | 0 | 12 | montura |

Cuentan **dos y solo dos**: el mejor de encima y el mejor de la montura, porque nadie tiene una
tercera espalda. El de la montura pide una anotada en **Compañía** —monturas, mascotas y
ayudantes—, que no cuenta Estorbo porque no la llevas encima. El día que el caballo se rompe una
pata, el tope baja solo y hay que decidir en el sitio qué se queda en el barro.

Lo que no respira pero tampoco se carga —un taller, una parte de una nave, una patente de corso—
se anota como el documento que lo acredita, con Estorbo 0.

### Si vienes de la versión anterior

El equipo era antes un solo cuadro de texto y ahora son filas con su Estorbo. **No hay que copiar
nada a mano**: la primera vez que abras una ficha vieja, la hoja vuelca lo que hubiera escrito en
ese cuadro y crea una fila por cada línea, con Estorbo 0 —adivinar cuánto ocupa cada cosa sería
inventar—. Si el texto no tenía saltos de línea, entra entero en una sola fila.

El cuadro de texto original **no se borra**: su atributo sigue guardado en la ficha, invisible pero
intacto, por si hubiera que mirarlo. La conversión se hace una sola vez y no se repite al volver a
abrir.

## Antes de la primera sesión

**Las barras del token.** En los ajustes del token: **barra 1 → `aguante`**, **barra 2 →
`esencia`**, **barra 3 → `aliento`**. Así se ve el daño sobre el tablero sin abrir la ficha.

**Los estados.** Los cinco de Umbral —Aturdido, Sangrando, Quebrantado, Enmarañado, Cegado— van
como marcadores de estado del token, además de las casillas de la hoja.

**Sin iniciativa.** Umbral no la tiene: actúan primero los jugadores, en el orden que decidan, y
después los enemigos. No hace falta tocar la barra de turnos de Roll20.

**Los enemigos** se hacen con la misma hoja. Los del bestiario vienen con Ataque y Defensa
pensados para jugar por escrito; aquí se juegan restando: se ataca con `1d12 + (Ataque − 12)` y
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
