import './style.css';

const cartasJugador = document.getElementById('cartas');
const gameOver = document.getElementById('game-over');

let totalPuntosJugador: number = 0;

document.addEventListener('DOMContentLoaded', () => {
  muestraPuntuacion(totalPuntosJugador);
  initButtons();
});

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

const muestraPuntuacion = (totalPuntosJugador: number): void => {
  const totalPuntos = document.getElementById('total-puntos');
  if (totalPuntos && totalPuntos instanceof HTMLElement) {
    totalPuntos.innerHTML = `Total de puntos: ${totalPuntosJugador} puntos`;
  }
};

const dameCarta = (): number => {
  let numeroAleatorio = Math.ceil(Math.random() * 10);
  return numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;
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

const muestraCarta = (carta: number, htmlDiv: HTMLDivElement): void => {
  let rutaCarta = crearURLCarta(carta);
  definirDivCartaActual(rutaCarta, htmlDiv);
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

const calcularNumPuntos = (carta: number): number => {
  let numPuntos = carta > 7 ? 0.5 : carta;
  return numPuntos;
};

const sumarPuntuacionTotal = (numPuntos: number): number => {
  return totalPuntosJugador + numPuntos;
};

const comprobarPuntuacion = (): void => {
  if (totalPuntosJugador === 7.5) {
    const mensaje: string = '¡Lo has clavado! ¡Enhorabuena!';
    mostrarMensajeFinal(mensaje);
    desactivarBoton('nueva-carta');
    desactivarBoton('me-planto');
    activarBoton('jugar-nueva-partida');
  }
  if (totalPuntosJugador > 7.5) {
    if (gameOver && gameOver instanceof HTMLDivElement) {
      gameOver.style.display = 'block';
    }
    desactivarBoton('nueva-carta');
    desactivarBoton('me-planto');
    desactivarBoton('si-hubieras-seguido');
    activarBoton('jugar-nueva-partida');
  }
};

const desactivarBoton = (botonId: string): void => {
  const boton = document.getElementById(botonId);
  if (boton && boton instanceof HTMLButtonElement) {
    boton.disabled = true;
  }
};

const mostrarMensajeFinal = (mensaje: string): void => {
  const mensajeFinal = document.getElementById('mensaje');
  if (mensajeFinal && mensajeFinal instanceof HTMLDivElement) {
    mensajeFinal.innerHTML = mensaje;
  }
};

const activarBoton = (botonId: string): void => {
  const boton = document.getElementById(botonId);
  if (boton && boton instanceof HTMLButtonElement) {
    boton.disabled = false;
  }
};

const nuevaPartida = (): void => {
  totalPuntosJugador = 0;
  muestraPuntuacion(totalPuntosJugador);
  if (cartasJugador) {
    cartasJugador.innerHTML = '';
  }

  mostrarMensajeFinal('');
  activarBoton('nueva-carta');
  activarBoton('me-planto');
  desactivarBoton('si-hubieras-seguido');

  if (gameOver && gameOver instanceof HTMLDivElement) {
    gameOver.style.display = 'none';
  }
};

const mePlanto = (): void => {
  desactivarBoton('nueva-carta');
  desactivarBoton('me-planto');
  activarBoton('si-hubieras-seguido');
  activarBoton('jugar-nueva-partida');
  const mensajeTrasPlantarse = obtenerMensajeTrasPlantarse(totalPuntosJugador);
  mostrarMensajeFinal(mensajeTrasPlantarse);
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

const siHubierasSeguido = (): void => {
  pedirCarta();
  desactivarBoton('si-hubieras-seguido');
};
