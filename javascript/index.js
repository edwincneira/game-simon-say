const verde = document.getElementById('verde')
const rojo = document.getElementById('rojo')
const azul = document.getElementById('azul')
const amarillo = document.getElementById('amarillo')
const boton = document.getElementById('btn')
const ULTIMO_NIVEL = 20
let juegoNotJuego = true


class Game {

    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }

    inicializar() {
        this.inicializar = this.inicializar.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.nivel = 1
        this.toggleBtn()
        this.colores = {
            verde,
            rojo,
            azul,
            amarillo
        }
        this.sounds = {
            green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
            red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
            blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
            yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')

        }
    }
    toggleBtn() {
        boton.innerHTML = `${this.nivel - 1}`
    }
    toggleBtnOff(){
        boton.innerHTML = `OFF`
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4)) //0-3
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'verde'
            case 1:
                return 'rojo'
            case 2:
                return 'azul'
            case 3:
                return 'amarillo'
        }
    }
    transformarColorANumero(color) {
        switch (color) {
            case 'verde':
                return 0
            case 'rojo':
                return 1
            case 'azul':
                return 2
            case 'amarillo':
                return 3
        }
    }
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        switch (color) {
            case 'verde':
                this.sounds.green.play()
                break;
            case 'rojo':
                this.sounds.red.play()
                break;
            case 'azul':
                this.sounds.blue.play()
                break;
            case 'amarillo':
                this.sounds.yellow.play()
                break;
        }
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.rojo.addEventListener('click', this.elegirColor)
        this.colores.azul.addEventListener('click', this.elegirColor)
        this.colores.amarillo.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.azul.removeEventListener('click', this.elegirColor)
        this.colores.rojo.removeEventListener('click', this.elegirColor)
        this.colores.amarillo.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel == this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                this.toggleBtn()
                if (this.nivel == ULTIMO_NIVEL + 1) {
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        } else {
            this.perdioElJuego()
        }
    }
    ganoElJuego() {
        swal('Ganaste!', `Llegaste al nivel final`, 'success')
            .then(() => {
                this.inicializar()
                juegoNotJuego = true
                this.toggleBtnOff()
            })
    }

    perdioElJuego() {
        swal('Perdiste', `Llegaste hasta el nivel ${this.nivel - 1}`, 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
                juegoNotJuego = true
                this.toggleBtnOff()
            })
    }
}

class Init {
    constructor() {
        this.start()
    }
    start() {
        this.evaluarNumeroDeJuego = this.evaluarNumeroDeJuego.bind(this)
        this.addEvt()
    }
    addEvt() {
        boton.addEventListener('click', this.evaluarNumeroDeJuego)
    }
    evaluarNumeroDeJuego(ev) {
        let data = +ev.target.dataset.on
        if(juegoNotJuego && data === 1){
            let game = new Game()
            juegoNotJuego = false
        }
    }
}
function startGame() {
    let initi = new Init()
}

startGame()