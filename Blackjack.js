const palos = ["clubs", "hearts", "diamonds", "spades"];
const valores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

let baraja = [];

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

crearBaraja();
barajear();

console.log(baraja);