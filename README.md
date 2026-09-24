## Uso de IA

He utilizado la IA en este trabajo sobre todo para:
* Mejorar el diseño con CSS.
* Ayudarme a recordar conceptos de JavaScript.
* Saber cómo implementar determinadas funciones que necesitaba (como el *delay*, el *toggle* para activar el CSS del modo oscuro o hacer que aparezcan las cartas en pantalla).

### Prompts principales

* **Estructura por fases:**
  > *Quiero hacer esto como en 5-6 fases para tenerlo hecho, mi idea seria en el blackjack tener el crupier, el jugador y que sea como una partida normal de blackjack, las cartas me gustaria que fueran imagenes para que quede mejor.*
  
  Ha sido la base del desarrollo: me sirvió de guía para ir avanzando paso a paso y enterarme mejor de lo que hacía, teniendo ya claro el contexto de partida.

* **Dudas técnicas y algoritmo:**
  > *Necesito que me expliques el porque barajeo así y no otra forma, porque empezar desde el final y porque se utiliza const en algunos lados y let en otros.*
  
  Me vino bien para recordar a nivel de código cuándo utilizar `const` y `let`, además de entender el porqué del algoritmo de barajado de Fisher-Yates.

### Validación del código

He tratado de evitar que me diera el código resuelto para comprender bien cada paso. En las partes donde sí me proporcionó código (como el algoritmo de barajado, el *delay*, el *toggle* o la aparición de las cartas en pantalla), no fue nada que no supiera replicar una vez entendida la lógica. 

Para verificar lo generado, siempre leía la explicación, comprendía el motivo de la solución y continuaba con ella solo si me parecía correcta; si no, la corregía a mano por código propio de mejor calidad.

---

## Autopsia

* **Elección de la idea:**  
  La primera decisión más discutible fue el concepto inicial. No sabía si hacer algo diferente, pero pensé que un juego de cartas resultaba rápido, divertido y sencillo de jugar. Además, me daba curiosidad programar la aparición dinámica de las cartas, descartando por ello alternativas como un minijuego tipo *Snake*.

* **Uso del *delay* y posición del mensaje:**  
  La segunda decisión fue meter un retraso (*delay*) justo antes de que apareciera el mensaje de fin de partida para dejar tiempo a leer la puntuación en la mesa. Es un punto discutible, ya que a veces puede dar la sensación de ir algo lento o dar pie a buscar una mejor posición en pantalla para mostrar el resultado sin tapar el tapete.
 
