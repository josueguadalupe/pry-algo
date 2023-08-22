class JuegoDel21 {
    constructor() {
        this.cartas = [
            '2 de corazón rojo', '3 de corazón rojo', '4 de corazón rojo', '5 de corazón rojo', '6 de corazón rojo', '7 de corazón rojo',
            '8 de corazón rojo', '9 de corazón rojo', '10 de corazón rojo', 'J de corazón rojo', 'Q de corazón rojo', 'K de corazón rojo', 'A de corazón rojo',
            '2 de diamante rojo', '3 de diamante rojo', '4 de diamante rojo', '5 de diamante rojo', '6 de diamante rojo', '7 de diamante rojo',
            '8 de diamante rojo', '9 de diamante rojo', '10 de diamante rojo', 'J de diamante rojo', 'Q de diamante rojo', 'K de diamante rojo', 'A de diamante rojo',
            '2 de pica negra', '3 de pica negra', '4 de pica negra', '5 de pica negra', '6 de pica negra', '7 de pica negra',
            '8 de pica negra', '9 de pica negra', '10 de pica negra', 'J de pica negra', 'Q de pica negra', 'K de pica negra', 'A de pica negra',
            '2 de trébol negro', '3 de trébol negro', '4 de trébol negro', '5 de trébol negro', '6 de trébol negro', '7 de trébol negro',
            '8 de trébol negro', '9 de trébol negro', '10 de trébol negro', 'J de trébol negro', 'Q de trébol negro', 'K de trébol negro', 'A de trébol negro'
        ];
        
        this.jugador = [];
        this.maquina = [];
        
        this.iniciar = this.iniciar.bind(this);
        this.jugar = this.jugar.bind(this);
        this.agregarCartaJugador = this.agregarCartaJugador.bind(this);
        this.jugarMaquina = this.jugarMaquina.bind(this);
        
        document.getElementById('startButton').addEventListener('click', this.iniciar);
        document.getElementById('playerButton').addEventListener('click', this.agregarCartaJugador);
        document.getElementById('machineButton').addEventListener('click', this.jugarMaquina);
    }
    
    obtenerCartaAleatoria() {
        const indiceAleatorio = Math.floor(Math.random() * this.cartas.length);
        return this.cartas[indiceAleatorio];
    }
    
    calcularSuma(mano) {
        let suma = 0;
    
        for (const carta of mano) {
            const partes = carta.split(' ');
            const valor = partes[0];
            
            if (valor === 'A') {
                suma += 1;
            } else if (valor === 'K' || valor === 'Q' || valor === 'J') {
                suma += 10;
            } else {
                suma += parseInt(valor);
            }
        }
    
        return suma;
    }
    
    mostrarCartas(mano, elementoId) {
        let cartasMostradas = '';
        for (let i = 0; i < mano.length; i++) {
            if (i > 0) {
                cartasMostradas += ', ';
            }
            cartasMostradas += mano[i];
        }
        document.getElementById(elementoId).textContent = cartasMostradas;
    }
    
    iniciar() {
        this.jugador = [];
        this.maquina = [];
        this.jugador.push(this.obtenerCartaAleatoria(), this.obtenerCartaAleatoria());
        this.maquina.push(this.obtenerCartaAleatoria(), this.obtenerCartaAleatoria());
        this.mostrarCartas(this.jugador, 'playerCards');
        this.mostrarCartas(this.maquina, 'machineCards');
        this.actualizarSumas();
        document.getElementById('result').textContent = '';
    }
    
    jugar() {
        if (this.calcularSuma(this.jugador) > 21) {
            document.getElementById('result').textContent = 'Perdiste. ¡Te pasaste de 21!';
            return;
        }
        
        while (this.calcularSuma(this.maquina) < 17) {
            this.maquina.push(this.obtenerCartaAleatoria());
        }
        
        this.mostrarCartas(this.maquina, 'machineCards');
        this.actualizarSumas();
        
        const sumaJugador = this.calcularSuma(this.jugador);
        const sumaMaquina = this.calcularSuma(this.maquina);
        
        if (sumaMaquina > 21 || sumaJugador > sumaMaquina) {
            document.getElementById('result').textContent = '¡Ganaste!';
        } else if (sumaJugador === sumaMaquina) {
            document.getElementById('result').textContent = 'Empate';
        } else {
            document.getElementById('result').textContent = 'Perdiste. La Máquina ganó.';
        }
    }
    
    agregarCartaJugador() {
        this.jugador.push(this.obtenerCartaAleatoria());
        this.mostrarCartas(this.jugador, 'playerCards');
        this.actualizarSumas();
        this.jugar();
    }
    
    jugarMaquina() {
        while (this.calcularSuma(this.maquina) < 17) {
            this.maquina.push(this.obtenerCartaAleatoria());
        }
        
        this.mostrarCartas(this.maquina, 'machineCards');
        this.actualizarSumas();
        this.jugar();
    }
    
    actualizarSumas() {
        const sumaJugador = this.calcularSuma(this.jugador);
        const sumaMaquina = this.calcularSuma(this.maquina);
        document.getElementById('playerSum').textContent = sumaJugador;
        document.getElementById('machineSum').textContent = sumaMaquina;
    }
}

const juego = new JuegoDel21();