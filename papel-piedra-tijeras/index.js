function jugarUnaRonda(e) {
  // juega la eleccion del usuario y obtiene la eleccion de la maquina
  //define un ganador y actualiza el marcador
  //
  const jugadaDelJugador = e.target.id;

  function obtenerJugadaComputadora() {
    const opciones = ["piedra", "papel", "tijeras"];
    return opciones[Math.floor(Math.random() * 3)];
  }

  let jugadaComputadora = obtenerJugadaComputadora();

  function obtenerGanador(jugadaComputadora, jugadaDelJugador) {
    if (jugadaComputadora === jugadaDelJugador) {
      return "Empate";
    }

    const unoDeLosDosUsoTijera =
      jugadaComputadora === "tijeras" || jugadaDelJugador === "tijeras";
    const unoDeLosDosUsoPapel =
      jugadaComputadora === "papel" || jugadaDelJugador === "papel";
    const unoDeLosDosUsoPiedra =
      jugadaComputadora === "piedra" || jugadaDelJugador === "piedra";

    const tijeraVersusPapel = unoDeLosDosUsoTijera && unoDeLosDosUsoPapel;
    const tijeraVersusPiedra = unoDeLosDosUsoTijera && unoDeLosDosUsoPiedra;
    const piedraVersusPapel = unoDeLosDosUsoPiedra && unoDeLosDosUsoPapel;

    if (tijeraVersusPapel) {
      return jugadaDelJugador === "tijeras"
        ? "Gana el jugador"
        : "Gana la computadora";
    }
    if (tijeraVersusPiedra) {
      return jugadaDelJugador === "piedra"
        ? "Gana el jugador"
        : "Gana la computadora";
    }

    if (piedraVersusPapel) {
      return jugadaDelJugador === "papel"
        ? "Gana el jugador"
        : "Gana la computadora";
    }
  }
  resultado = obtenerGanador(jugadaComputadora, jugadaDelJugador);

  if (resultado === "Empate") {
    modalEmpate.showModal();
  } else {
    sumarRondasGanadas();
    actualizarMarcadorDOM();
    const alguienGano3Veces =
      marcador.rondasGanadasPorComputadora === 3 ||
      marcador.rondasGanadasPorJugador === 3;

    alguienGano3Veces && finalizarJuego();
  }
}

function actualizarMarcadorDOM() {
  const victoriasJugador = document.getElementById("victorias-jugador");
  const victoriasComputadora = document.getElementById("victorias-computadora");
  victoriasJugador.innerText = marcador.rondasGanadasPorJugador;
  victoriasComputadora.innerText = marcador.rondasGanadasPorComputadora;
}

const marcador = {
  rondasGanadasPorComputadora: 0,
  rondasGanadasPorJugador: 0,
  reiniciar: function () {
    this.rondasGanadasPorComputadora = 0;
    this.rondasGanadasPorJugador = 0;
  },
};

function sumarRondasGanadas() {
  if (resultado === "Gana la computadora") {
    marcador.rondasGanadasPorComputadora++;
  } else if (resultado === "Gana el jugador") {
    marcador.rondasGanadasPorJugador++;
  }
}

function finalizarJuego() {
  desactivarOpciones();
  modalGanador.showModal();
  if (resultado === "Gana la computadora") {
    spanGanador.innerText = "Compu";
  } else if (resultado === "Gana el jugador") {
    spanGanador.innerText = nombreDeJugador;
  }
}

const opciones = document.querySelectorAll(".opcion");
opciones.forEach((opcion) => {
  opcion.addEventListener("click", jugarUnaRonda);
});

const botonDeReinicio = document.getElementById("reiniciar");
botonDeReinicio.addEventListener("click", reiniciarJuego);

function reactivarOpciones() {
  opciones.forEach((opcion) => {
    opcion.disabled = false;
  });
}

function desactivarOpciones() {
  opciones.forEach((opcion) => {
    opcion.disabled = true;
  });
}

let nombreDeJugador;

function reiniciarJuego() {
  marcador.reiniciar();

  actualizarMarcadorDOM();
  reactivarOpciones();
}

const modalEmpate = document.getElementById("empate");
const cerrarEmpate = document.getElementById("cerrar-empate");
cerrarEmpate.addEventListener("click", () => {
  modalEmpate.close();
});

const modalGanador = document.getElementById("ganador");
const spanGanador = document.getElementById("nombre-del-ganador");
const cerrarGanador = document.getElementById("cerrar-ganador");
cerrarGanador.addEventListener("click", () => modalGanador.close());

const modalNombre = document.getElementById("nombre");
modalNombre.showModal();
const cerrarNombre = document.getElementById("cerrar-nombre");
const cerrarForm = document.querySelector("form");
cerrarForm.addEventListener("submit", (e) => {
  e.preventDefault();
  modalNombre.close();
  const nombre = e.target.elements.name.value;
  nombreDeJugador = nombre;
});

window.addEventListener("load", function () {
  modalNombre.showModal();
});

////////////////////////////////////////////////////////////
