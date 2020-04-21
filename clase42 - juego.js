const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 2

class Juego {
  constructor() {
    this.inicializar()
    this.generarSecuencia()

    setTimeout(()=>{
      this.siguienteNivel()
    },1000)
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.toogleBtnEmpezar()
    this.nivel = 1
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toogleBtnEmpezar(){
      if(btnEmpezar.classList.contains('hide')){
        btnEmpezar.classList.remove('hide')
      }else{
        btnEmpezar.classList.add('hide')
      }
  }

  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel(){
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregareventosClick()
  }

  transformarNumeroColor(numero){
    switch (numero) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

    transformarColorNumero(color){
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarSecuencia(){
    for(let i = 0; i < this.nivel; i++){
      let color = this.transformarNumeroColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000* i)
    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color),400)
  }

  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  agregareventosClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev){
    //console.log(ev)
    //console.log(nombreColor)

    const nombreColor = ev.target.dataset.color
    const numColor = this.transformarColorNumero(nombreColor)
    this.iluminarColor(nombreColor)

    if(numColor === this.secuencia[this.subnivel]){
      this.subnivel++
      if(this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL+1)) {
          this.ganoElJuego()
        }else{
          setTimeout(this.siguienteNivel,1000)
        }
      }
    }else{
      this.perdioElJuego()
    }
  }

  ganoElJuego(){
    swal('Platzi','Haz Ganado!!', 'success')
    .then(this.inicializar())
  }


  perdioElJuego(){
    swal('Platzi','Lo Lamentamos Perdiste :(', 'error')
    .then(() =>{
        this.eliminarEventosClick()
        this.inicializar()
    })
  }
}

function empezarJuego() {
  window.juego = new Juego()
}