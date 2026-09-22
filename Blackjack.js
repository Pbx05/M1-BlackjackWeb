const palos = ["clubs", "hearts", "diamonds", "spades"];
const valores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

const divCartasCrupier = document.querySelector("#cartasCrupier");
const divCartasJugador = document.querySelector("#cartasJugador");
const spanPuntosCrupier = document.querySelector("#puntuacionCrupier");
const spanPuntosJugador = document.querySelector("#puntuacionJugador");
const btnPedirCarta = document.querySelector("#botonPedir");
const btnPlantarse = document.querySelector("#botonPlantarse");

let baraja = [];
let manoCrupier = [];
let manoJugador = [];

let puntosCrupier = 0;
let puntosJugador = 0;

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

function contarPuntuacion(mano){
    let puntos = 0;
    let ases = 0;
    let numCartasSacadas = 0;

    for(const carta of mano){
        if(carta.valor === "jack" || carta.valor === "queen" || carta.valor === "king"){
            puntos += 10;
        } else if(carta.valor === "ace"){
            puntos += 11;
            ases++;
        } else {
            puntos += Number(carta.valor);
        }
        numCartasSacadas++;
    }

    // Hago este while para comprobar que en el caso de que haya algun as en la mano y esta se pase de 21, el as pase de valor 11 a 1
    while(puntos > 21 && ases > 0){
        puntos -= 10;
        ases--;
    }

    if(puntos === 21 && numCartasSacadas === 2){
        puntos = "Blackjack";
    }

    return puntos;
}

function pintarCarta(carta, contenedor){
    const imgCarta = document.createElement("img");

    // Cunstruyo la ruta de la imagen usando template literals
    imgCarta.src = `cartas/${carta.valor}_of_${carta.palo}.png`;
    contenedor.appendChild(imgCarta);
}

function actualizarPuntuacion(){
    puntosCrupier = contarPuntuacion(manoCrupier);
    puntosJugador = contarPuntuacion(manoJugador);

    spanPuntosCrupier.textContent = puntosCrupier;
    spanPuntosJugador.textContent = puntosJugador;
}

function pedirCarta(){
    const cartaNueva = baraja.pop();
    manoJugador.push(cartaNueva);
    pintarCarta(cartaNueva, divCartasJugador);
    actualizarPuntuacion();
    if(puntosJugador > 21){
        const carta2Crupier = baraja.pop();
        manoCrupier.push(carta2Crupier);
        pintarCarta(carta2Crupier, divCartasCrupier);
        actualizarPuntuacion();
        alert("Has perdido tienes mas de 21");
    } 
}

function plantarse(){
    while(puntosCrupier < 17){
        const cartaCrupier = baraja.pop();
        manoCrupier.push(cartaCrupier);
        pintarCarta(cartaCrupier, divCartasCrupier);
        actualizarPuntuacion();
    }
}

function iniciarPartida(){
    crearBaraja();
    barajear();

    const carta1Jugador = baraja.pop();
    const carta1Crupier = baraja.pop();
    const carta2Jugador = baraja.pop();

    manoJugador.push(carta1Jugador, carta2Jugador);
    pintarCarta(carta1Jugador, divCartasJugador);
    pintarCarta(carta2Jugador, divCartasJugador);

    manoCrupier.push(carta1Crupier);
    pintarCarta(carta1Crupier, divCartasCrupier);

    actualizarPuntuacion();
}

btnPedirCarta.addEventListener("click", pedirCarta);
btnPlantarse.addEventListener("click", plantarse);
iniciarPartida();