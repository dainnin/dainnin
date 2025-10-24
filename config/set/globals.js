
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let zoom = 1;//test
const rpgClasses = { ...rpgClasses_ };
const classStats = { ...classStats_ };

const btn = document.getElementById("confirmarBtn");
const btnHechizos = document.getElementById("hechizos");
const keysCast = btnHechizos.getElementsByTagName("button")
const _input = document.getElementsByClassName("BTNcollapse")[0];
_input.addEventListener("change", (e) => {
  const mobileControls = document.getElementById("mobileControls")
  if (e.target.checked) mobileControls.style.display = "block"
  else mobileControls.style.display = "none"
})
function capitalize(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
function atributoEscalado({ lvl, max, coef = 1, tipo = "exp" }) {
  if (lvl < 0) lvl = 1;

  let progreso = 0;

  if (tipo === "log") {
    progreso = Math.log2((lvl / coef) + 1) / Math.log2(max + 1);
  } else if (tipo === "exp") {
    progreso = Math.pow(lvl / max, coef);
  } else {
    throw new Error("Tipo de curva inválido: usar 'log' o 'exp'");
  }

  return Math.round(progreso * max);
}
const worker = new Worker("./config/set/npcsWorker.js");

const tareasPendientes = {};

worker.onmessage = function (e) {
  const { tipo, resultado, id } = e.data;
  if (tareasPendientes[id]) {
    tareasPendientes[id](resultado);
    delete tareasPendientes[id];
  }
};

function sendData(tipo, datos, callback) {
  const id = crypto.randomUUID();
  tareasPendientes[id] = callback;

  worker.postMessage({ tipo, datos, id });
}
document.addEventListener("contextmenu", e => e.preventDefault());
/* document.addEventListener("keydown", e => {
  const bloqueadas = ["F12", "F11"];
  if (
    bloqueadas.includes(e.key) ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U") // ver código fuente
  ) {
    e.preventDefault();
  }
}); */
const CreatePlayer = document.getElementById("classSelect")
// Generar HTML dentro del contenedor
CreatePlayer.innerHTML = `
    ${Object.keys(classStats).map(clave => {
  const clase = classStats[clave];
  return `<option value="${clave}">${clase.nombre}</option>`;
}).join("")}
`;
document.getElementsByName("zoom")[0].addEventListener("input", (e) => {
  zoom = e.target.value
})
function addEventButtonMovil() {
  document.querySelectorAll("button[data-key]").forEach(btn => {
    const key = btn.dataset.key;

    if (!key || btn.dataset.bound) return;
    btn.dataset.bound = "true";

    btn.addEventListener("touchstart", e => {
      e.preventDefault();
      keys[key] = true;
    });

    btn.addEventListener("touchend", e => {
      e.preventDefault();
      keys[key] = false;
    });

    btn.addEventListener("touchcancel", () => {
      keys[key] = false;
    });

    btn.addEventListener("mousedown", e => {
      e.preventDefault();
      keys[key] = true;
    });

    btn.addEventListener("mouseup", e => {
      e.preventDefault();
      keys[key] = false;
    });

    btn.addEventListener("mouseleave", () => {
      keys[key] = false;
    });

    btn.addEventListener("pointerleave", () => {
      keys[key] = false;
    });
  });
}
  
addEventButtonMovil()
document.getElementById("confirmarBtn").addEventListener("click", () => {
  const nombre = document.getElementById("playerNameInput").value.trim();
  const claseSeleccionada = document.getElementById("classSelect").value;

  if (!nombre) {
    alert("Por favor ingresá un nombre.");
    return;
  }

  player.name = nombre;
  player.clase = structuredClone(classStats[claseSeleccionada]); // copia profunda

  if (player.clase.image && player.clase.image.includes("/assets/img/")) {

    playerImg[nombre] = player.clase.image ? (() => {
      const img = new Image();
      img.src = player.clase.image;
      return img;
    })() : null;
    delete player.color;
  } else {
    player.color = player.clase.color;

  }







  btn.disabled = true;
  playerNameInput.disabled = true;
  _input.checked = true
  btn.textContent = "Confirmado";


  dataPlayer(player)
  _input.insertAdjacentHTML("afterend", `
  <div id="stats">
    <ul>
      <li>Fuerza: ${player.fuerza}</li>
      <li>Vida maxima: ${player.vidaMax}</li>
      
    </ul>
  </div>
  `)
  mobileControls.style.display = "block"
  gameLoop();

});

canvas.addEventListener("mousedown", e => {
  if (e.button === 0) {
    const rect = canvas.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;

    const clickX = (rawX / zoom) + camera.x;
    const clickY = (rawY / zoom) + camera.y;

    const npc = seleccionarEntidad(clickX, clickY);

    if (npc) {
      player.objetivo = npc;
      npc.seleccionado = true;
    } else {
      player.objetivo = null;
    }
  }
});
function ajustarCanvas() {
  canvas.height = window.innerHeight * 0.8;
  canvas.width = window.innerWidth * 0.7;

}
window.addEventListener("resize", ajustarCanvas);
ajustarCanvas()

function isColliding(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}
