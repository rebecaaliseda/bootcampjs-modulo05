import './style.css';

const totalPuntos = document.getElementById('total-puntos');
const cartasJugador = document.getElementById('cartas');
const botonPedirCarta = document.getElementById('nueva-carta');
const mensajeFinal = document.getElementById('mensaje');
const botonPlantarse = document.getElementById('me-planto');
const gameOver = document.getElementById('game-over');
const botonSiHubierasSeguido = document.getElementById('si-hubieras-seguido');
const botonJugarNuevaPartida = document.getElementById('jugar-nueva-partida');

let totalPuntosJugador: number = 0;

const muestraPuntuacion = (totalPuntosJugador: number): void => {
  if (totalPuntos && totalPuntos instanceof HTMLElement) {
    totalPuntos.innerHTML = `Total de puntos: ${totalPuntosJugador} puntos`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  muestraPuntuacion(totalPuntosJugador);
});

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

if (botonPedirCarta && botonPedirCarta instanceof HTMLButtonElement) {
  botonPedirCarta.addEventListener('click', pedirCarta);
}

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
    if (mensajeFinal && mensajeFinal instanceof HTMLDivElement) {
      mostrarMensajeFinal(mensaje);
    }
    if (botonPedirCarta && botonPedirCarta instanceof HTMLButtonElement) {
      desactivarBoton(botonPedirCarta);
    }
    if (botonPlantarse && botonPlantarse instanceof HTMLButtonElement) {
      desactivarBoton(botonPlantarse);
    }
    if (botonJugarNuevaPartida && botonJugarNuevaPartida instanceof HTMLButtonElement) {
      activarBoton(botonJugarNuevaPartida);
    }
  }
  if (totalPuntosJugador > 7.5) {
    if (gameOver && gameOver instanceof HTMLDivElement) {
      gameOver.style.display = 'block';
    }
    if (botonPedirCarta && botonPedirCarta instanceof HTMLButtonElement) {
      desactivarBoton(botonPedirCarta);
    }
    if (botonPlantarse && botonPlantarse instanceof HTMLButtonElement) {
      desactivarBoton(botonPlantarse);
    }
    if (botonSiHubierasSeguido && botonSiHubierasSeguido instanceof HTMLButtonElement) {
      desactivarBoton(botonSiHubierasSeguido);
    }
    if (botonJugarNuevaPartida && botonJugarNuevaPartida instanceof HTMLButtonElement) {
      activarBoton(botonJugarNuevaPartida);
    }
  }
};

const desactivarBoton = (boton: HTMLButtonElement): void => {
  boton.disabled = true;
};

const mostrarMensajeFinal = (mensaje: string): void => {
  if (mensajeFinal && mensajeFinal instanceof HTMLDivElement) {
    mensajeFinal.innerHTML = mensaje;
  }
};
const activarBoton = (boton: HTMLButtonElement): void => {
  boton.disabled = false;
};

const nuevaPartida = (): void => {
  totalPuntosJugador = 0;
  muestraPuntuacion(totalPuntosJugador);
  if (cartasJugador && mensajeFinal) {
    cartasJugador.innerHTML = '';
    mensajeFinal.innerHTML = '';
  }
  if (mensajeFinal && mensajeFinal instanceof HTMLDivElement) {
    mostrarMensajeFinal('');
  }
  if (botonPedirCarta && botonPedirCarta instanceof HTMLButtonElement) {
    activarBoton(botonPedirCarta);
  }
  if (botonPlantarse && botonPlantarse instanceof HTMLButtonElement) {
    activarBoton(botonPlantarse);
  }
  if (botonSiHubierasSeguido && botonSiHubierasSeguido instanceof HTMLButtonElement) {
    desactivarBoton(botonSiHubierasSeguido);
  }
  if (gameOver && gameOver instanceof HTMLDivElement) {
    gameOver.style.display = 'none';
  }
};

if (botonJugarNuevaPartida && botonJugarNuevaPartida instanceof HTMLButtonElement) {
  botonJugarNuevaPartida.addEventListener('click', nuevaPartida);
}

const mePlanto = (): void => {
  if (botonPedirCarta && botonPedirCarta instanceof HTMLButtonElement) {
    desactivarBoton(botonPedirCarta);
  }
  if (botonPlantarse && botonPlantarse instanceof HTMLButtonElement) {
    desactivarBoton(botonPlantarse);
  }
  if (botonSiHubierasSeguido && botonSiHubierasSeguido instanceof HTMLButtonElement) {
    activarBoton(botonSiHubierasSeguido);
  }
  if (botonJugarNuevaPartida && botonJugarNuevaPartida instanceof HTMLButtonElement) {
    activarBoton(botonJugarNuevaPartida);
  }
  const mensajeTrasPlantarse = obtenerMensajeTrasPlantarse(totalPuntosJugador);
  mostrarMensajeFinal(mensajeTrasPlantarse);
};

if (botonPlantarse && botonPlantarse instanceof HTMLButtonElement) {
  botonPlantarse.addEventListener('click', mePlanto);
}

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
  if (botonSiHubierasSeguido && botonSiHubierasSeguido instanceof HTMLButtonElement) {
    desactivarBoton(botonSiHubierasSeguido);
  }
};

if (botonSiHubierasSeguido && botonSiHubierasSeguido instanceof HTMLButtonElement) {
  botonSiHubierasSeguido.addEventListener('click', siHubierasSeguido);
}
