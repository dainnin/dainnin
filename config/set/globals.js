
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let zoom = 1;//test
const rpgClasses = { ...rpgClasses_ };
const classStats = { ...classStats_ };

const btn = document.getElementById("confirmarBtn");

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


const CreatePlayer = document.getElementById("classSelect")
// Generar HTML dentro del contenedor
CreatePlayer.innerHTML = `
    ${Object.keys(classStats).map(clave => {
  const clase = classStats[clave];
  return `<option value="${clave}">${clase.nombre}</option>`;
}).join("")}
`;

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
      <li atr="ok">Nivel: ${player.nivel}</li>
      <li atr="ok">Daño: ${player.daño}</li>
      <li>Fuerza: ${player.fuerza}</li>
      <li>Agilidad: ${player.clase?.atributos.agilidad}</li>
      <li>Inteligencia: ${player.inteligencia}</li>
      <li atr="ok">Vida maxima: ${player.vidaMax}</li>
      <li atr="ok">Mana maxima: ${player.manaMax}</li>
      <li atr="ok">Vida: ${player.vida}</li>
      <li atr="ok">Mana : ${player.mana}</li>

    </ul>
  </div>
  `)
  mobileControls.style.display = "block"
  gameLoop();

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
