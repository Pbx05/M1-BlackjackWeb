const palos = ["clubs", "hearts", "diamonds", "spades"];
const valores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

const divCartasCrupier = document.querySelector("#cartasCrupier");
const divCartasJugador = document.querySelector("#cartasJugador");
const spanPuntosCrupier = document.querySelector("#puntuacionCrupier");
const spanPuntosJugador = document.querySelector("#puntuacionJugador");
const btnPedirCarta = document.querySelector("#botonPedir");
const btnPlantarse = document.querySelector("#botonPlantarse");
const btnReiniciar = document.querySelector("#botonReiniciar");
const spanPuntosFinalesCrupier = document.querySelector("#puntosFinalesCrupier");
const spanpuntosFinalesJugador = document.querySelector("#puntosFinalesJugador");
const ventanaFinPartida = document.querySelector("#ventanaFinPartida");
const mensajeFinPartida = document.querySelector("#mensajeFinPartida");
const mensajeOculto = document.querySelector("#mensajeSecreto");

let baraja = [];
let manoCrupier = [];
let manoJugador = [];
let cartaOculta;

let puntosCrupier = 0;
let puntosJugador = 0;
let jugadorBlackjack = false;
let crupierBlackjack = false;

function crearBaraja(){
    baraja = [];
    for(const palo of palos){
        for(const valor of valores){
            const carta = {valor: valor, palo: palo};
            baraja.push(carta);
        }
    }
}

function barajear(){
    for(let i = baraja.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));

        const cartaTemporal = baraja[i];
        baraja[i] = baraja[j];
        baraja[j] = cartaTemporal;
    }
}

function repartirCarta(mano, divCartas){
    const cartaNueva = baraja.pop();
    mano.push(cartaNueva);
    pintarCarta(cartaNueva, divCartas);
    actualizarPuntuacion();
}

function contarPuntuacion(mano){
    let puntos = 0;
    let ases = 0;

    for(const carta of mano){
        if(carta.valor === "jack" || carta.valor === "queen" || carta.valor === "king"){
            puntos += 10;
        } else if(carta.valor === "ace"){
            puntos += 11;
            ases++;
        } else {
            puntos += Number(carta.valor);
        }
    }

    // Hago este while para comprobar que en el caso de que haya algun as en la mano y esta se pase de 21, el as pase de valor 11 a 1
    while(puntos > 21 && ases > 0){
        puntos -= 10;
        ases--;
    }

    return puntos;
}

function pintarCarta(carta, contenedor){
    const imgCarta = document.createElement("img");

    // Construyo la ruta de la imagen usando template literals
    imgCarta.src = `cartas/${carta.valor}_of_${carta.palo}.png`;
    contenedor.appendChild(imgCarta);
}

function actualizarPuntuacion(){
    puntosCrupier = contarPuntuacion(manoCrupier);
    puntosJugador = contarPuntuacion(manoJugador);

    // Compruebo si hay algun blackjack con asignacion logica
    crupierBlackjack = puntosCrupier === 21 && manoCrupier.length ===2;
    jugadorBlackjack = puntosJugador === 21 && manoJugador.length === 2;

    spanPuntosCrupier.textContent = crupierBlackjack ? "Blackjack" : puntosCrupier;
    spanPuntosJugador.textContent = jugadorBlackjack ? "Blackjack" : puntosJugador;
}

function pedirCarta(){
    repartirCarta(manoJugador, divCartasJugador);
    if(puntosJugador > 21){
        calcularResultado();
    }
}

function plantarse(){
    // Desvelo la carta oculta, la selecciono del dom por el id que habia asignado y la elimino
    const imagenOculta = document.querySelector("#imagenOculta");
    imagenOculta.remove();
    
    // Una vez hecho esto pinto la carta con su valor
    manoCrupier.push(cartaOculta);
    pintarCarta(cartaOculta, divCartasCrupier);
    actualizarPuntuacion();

    while(puntosCrupier < 17){
        repartirCarta(manoCrupier, divCartasCrupier);
    }
    calcularResultado();
}

function calcularResultado(){
    let mensaje;
    let partidaGanada = false;

    if(jugadorBlackjack && !crupierBlackjack){
        mensaje = "Has ganado con un blackjack!! :)";
        partidaGanada = true;
    } else if(crupierBlackjack && !jugadorBlackjack){
        mensaje = "Has perdido el crupier tenia blackjack :(";
    }else if(puntosCrupier > 21){
        mensaje = "Has ganado el crupier se ha pasado de 21 :)";
        partidaGanada = true; 
    } else if(puntosJugador > 21){
        mensaje = "Has perdido te has pasado de 21 :(";
    } else if(puntosCrupier === puntosJugador){
        mensaje = "Empate, suerte a la proxima";
    } else if(puntosJugador > puntosCrupier){
        mensaje = "Has ganado :)";
        partidaGanada = true;
    } else {
        mensaje = "Has perdido :(";
    }

    // setTimeout lo utilizo para poder aplicar un delay de 800 milisegundos 
    setTimeout(() => {
        mensajeFinPartida.textContent = mensaje;
        spanPuntosFinalesCrupier.textContent = crupierBlackjack ? "Blackjack" : puntosCrupier;
        spanpuntosFinalesJugador.textContent = jugadorBlackjack ? "Blackjack" : puntosJugador;
        ventanaFinPartida.style.display = "flex";
        if(partidaGanada){
            mensajeOculto.style.display = "block";
        }
    }, 800);
}

function jugarDeNuevo(){
    // Limpio todo para poder empezar de nuevo
    ventanaFinPartida.style.display = "none";
    manoJugador = [];
    manoCrupier = [];
    puntosCrupier = 0;
    puntosJugador = 0;
    divCartasCrupier.textContent = "";
    divCartasJugador.textContent = "";
    iniciarPartida();
}

function modoOscuro(event){
    // Activa o desactiva el modo oscuro con el toggle
    if(event.key === "d"){
        document.body.classList.toggle("modo-oscuro");
    }
}

function iniciarPartida(){
    crearBaraja();
    barajear();

    repartirCarta(manoJugador, divCartasJugador);
    repartirCarta(manoCrupier, divCartasCrupier);
    repartirCarta(manoJugador, divCartasJugador);
    
    // Carta que se queda oculta del crupier, la saco de la baraja 
    cartaOculta = baraja.pop();
    const imagenOculta = document.createElement("img");
    imagenOculta.src = "cartas/back.png";
    imagenOculta.id = "imagenOculta"
    divCartasCrupier.appendChild(imagenOculta);

    if(jugadorBlackjack){
        plantarse();
    }
}

btnPedirCarta.addEventListener("click", pedirCarta);
btnPlantarse.addEventListener("click", plantarse);
btnReiniciar.addEventListener("click", jugarDeNuevo);
document.addEventListener("keydown", modoOscuro);
iniciarPartida();