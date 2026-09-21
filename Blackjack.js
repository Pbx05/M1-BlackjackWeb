const palos = ["clubs", "hearts", "diamonds", "spades"];
const valores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

const divCartasCrupier = document.querySelector("#cartasCrupier");
const divCartasJugador = document.querySelector("#cartasJugador");
const spanPuntosCrupier = document.querySelector("#puntuacionCrupier");
const spanPuntosJugador = document.querySelector("#puntuacionJugador");

let baraja = [];
let manoCrupier = [];
let manoJugador = [];

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

    if(puntos === 21){
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
    const puntosCrupier = contarPuntuacion(manoCrupier);
    const puntosJugador = contarPuntuacion(manoJugador);

    spanPuntosCrupier.textContent = puntosCrupier;
    spanPuntosJugador.textContent = puntosJugador;
}

crearBaraja();
barajear();

// Pruebas
const cartaRobada = baraja.pop(); 
manoJugador.push(cartaRobada);
pintarCarta(cartaRobada, divCartasJugador);

const carta2 = baraja.pop();
manoJugador.push(carta2);
pintarCarta(carta2, divCartasJugador);

actualizarPuntuacion();