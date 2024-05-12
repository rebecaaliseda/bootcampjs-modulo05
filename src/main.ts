import './style.css';

const cartasJugador = document.getElementById('cartas');

type States = 'jugando' | 'plantado' | 'ganado' | 'gameOver';

let totalPuntosJugador: number = 0;
let state: States = 'jugando';
let mensaje: string = '';

const getMessage = (state: States): string => {
  switch (state) {
    case 'jugando':
      mensaje = 'Estás jugando';
      break;
    case 'plantado':
      mensaje = obtenerMensajeTrasPlantarse(totalPuntosJugador);
      break;
    case 'ganado':
      mensaje = '¡Lo has clavado! ¡Enhorabuena!';
      break;
    case 'gameOver':
      mensaje = '¡Game Over!😢';
      break;
    default:
      mensaje = '';
      break;
  }
  return mensaje;
};

const desactivarBoton = (botonId: string): void => {
  const boton = document.getElementById(botonId);
  if (boton && boton instanceof HTMLButtonElement) {
    boton.disabled = true;
  }
};

const activarBoton = (botonId: string): void => {
  const boton = document.getElementById(botonId);
  if (boton && boton instanceof HTMLButtonElement) {
    boton.disabled = false;
  }
};

const mostrarMensajeFinal = (mensaje: string): void => {
  let mensajeFinal = document.getElementById('mensaje');
  if (mensajeFinal && mensajeFinal instanceof HTMLDivElement) {
    mensajeFinal.innerHTML = mensaje;
    if (state === 'gameOver') {
      mensajeFinal.classList.add('game-over');
    } else {
      mensajeFinal.classList.remove('game-over');
    }
  }
};

const dameCarta = (): number => {
  let numeroAleatorio = Math.ceil(Math.random() * 10);
  return numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;
};

const crearURLCarta = (numCarta: number): string => {
  let carta: string = '';
  switch (numCarta) {
    case 1:
      carta = '1_as';
      break;
    case 2:
      carta = '2_dos';
      break;
    case 3:
      carta = '3_tres';
      break;
    case 4:
      carta = '4_cuatro';
      break;
    case 5:
      carta = '5_cinco';
      break;
    case 6:
      carta = '6_seis';
      break;
    case 7:
      carta = '7_siete';
      break;
    case 10:
      carta = '10_sota';
      break;
    case 11:
      carta = '11_caballo';
      break;
    case 12:
      carta = '12_rey';
      break;
    default:
      carta = 'No se que ha pasado, pero no deberías estar aquí';
  }
  const rutaCarta = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${carta}-copas.jpg`;
  return rutaCarta;
};

const definirDivCartaActual = (rutaCarta: string, htmlDiv: HTMLDivElement) => {
  if (cartasJugador && cartasJugador instanceof HTMLElement) {
    const imgCarta = document.createElement('img');
    imgCarta.src = rutaCarta;
    imgCarta.alt = 'Carta actual';
    imgCarta.classList.add('carta-jugador');

    if (htmlDiv && htmlDiv instanceof HTMLDivElement) {
      htmlDiv.append(imgCarta);
    }
  }
};

const muestraCarta = (carta: number, htmlDiv: HTMLDivElement): void => {
  let rutaCarta = crearURLCarta(carta);
  definirDivCartaActual(rutaCarta, htmlDiv);
};

const calcularNumPuntos = (carta: number): number => {
  let numPuntos = carta > 7 ? 0.5 : carta;
  return numPuntos;
};

const sumarPuntuacionTotal = (numPuntos: number): number => {
  return totalPuntosJugador + numPuntos;
};

const finPartidaButtons = (): void => {
  desactivarBoton('nueva-carta');
  desactivarBoton('me-planto');
  activarBoton('jugar-nueva-partida');
};

const gameOverButtons = (): void => {
  finPartidaButtons();
  desactivarBoton('si-hubieras-seguido');
};

const comprobarPuntuacion = (): void => {
  if (totalPuntosJugador === 7.5) {
    state = 'ganado';
    mensaje = getMessage(state);
    mostrarMensajeFinal(mensaje);
    finPartidaButtons();
  }
  if (totalPuntosJugador > 7.5) {
    state = 'gameOver';
    mensaje = getMessage(state);
    mostrarMensajeFinal(mensaje);
    gameOverButtons();
  }
};

const muestraPuntuacion = (totalPuntosJugador: number): void => {
  const totalPuntos = document.getElementById('total-puntos');
  if (totalPuntos && totalPuntos instanceof HTMLElement) {
    totalPuntos.innerHTML = `Total de puntos: ${totalPuntosJugador} puntos`;
  }
};

const nuevaPartidaButtons = (): void => {
  activarBoton('nueva-carta');
  activarBoton('me-planto');
  desactivarBoton('si-hubieras-seguido');
};

const nuevaPartida = (): void => {
  totalPuntosJugador = 0;
  muestraPuntuacion(totalPuntosJugador);
  if (cartasJugador) {
    cartasJugador.innerHTML = '';
  }
  mostrarMensajeFinal('');
  nuevaPartidaButtons();
};

const obtenerMensajeTrasPlantarse = (totalPuntosJugador: number): string => {
  let txtMensaje: string = '';
  if (totalPuntosJugador <= 4.5) {
    txtMensaje = 'Has sido muy conservador....';
  }
  if (totalPuntosJugador >= 5) {
    txtMensaje = 'Te ha entrado el canguelo eh?';
  }
  if (totalPuntosJugador >= 6) {
    txtMensaje = 'Casi, casi ...';
  }
  return txtMensaje;
};

const mePlantoButtons = (): void => {
  finPartidaButtons();
  activarBoton('si-hubieras-seguido');
};

const mePlanto = (): void => {
  mePlantoButtons();
  state = 'plantado';
  const mensajeTrasPlantarse = getMessage(state);
  mostrarMensajeFinal(mensajeTrasPlantarse);
};

const pedirCarta = (): void => {
  let carta: number = dameCarta();
  let numPuntos = calcularNumPuntos(carta);
  let numPuntuacionTotal = sumarPuntuacionTotal(numPuntos);
  totalPuntosJugador = numPuntuacionTotal;
  muestraPuntuacion(totalPuntosJugador);
  if (cartasJugador && cartasJugador instanceof HTMLDivElement) {
    muestraCarta(carta, cartasJugador);
  }
  comprobarPuntuacion();
};

const siHubierasSeguido = (): void => {
  pedirCarta();
  desactivarBoton('si-hubieras-seguido');
};

const initButtons = () => {
  const botonPedirCarta = document.getElementById('nueva-carta');
  const botonPlantarse = document.getElementById('me-planto');
  const botonSiHubierasSeguido = document.getElementById('si-hubieras-seguido');
  const botonJugarNuevaPartida = document.getElementById('jugar-nueva-partida');

  if (botonPedirCarta && botonPedirCarta instanceof HTMLButtonElement) {
    botonPedirCarta.addEventListener('click', pedirCarta);
  }
  if (botonJugarNuevaPartida && botonJugarNuevaPartida instanceof HTMLButtonElement) {
    botonJugarNuevaPartida.addEventListener('click', nuevaPartida);
  }
  if (botonPlantarse && botonPlantarse instanceof HTMLButtonElement) {
    botonPlantarse.addEventListener('click', mePlanto);
  }
  if (botonSiHubierasSeguido && botonSiHubierasSeguido instanceof HTMLButtonElement) {
    botonSiHubierasSeguido.addEventListener('click', siHubierasSeguido);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  muestraPuntuacion(totalPuntosJugador);
  initButtons();
});
