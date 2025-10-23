const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});


function seleccionarEntidad(x, y) {
  for (const npc of npcs) {
    if (
      x >= npc.x && x <= npc.x + npc.w &&
      y >= npc.y && y <= npc.y + npc.h &&
      npc.vida > 0
    ) {
      return npc;
    }
  }
  return null;
}


let botonesMovilInicializados = false;

const timeouts = {};

function activarTecla(key) {
  keys[key] = true;

  // Si ya hay un timeout, lo cancelamos
  clearTimeout(timeouts[key]);

  // Creamos uno nuevo que corta después de 500ms si no se liberó
  /* timeouts[key] = setTimeout(() => {
    keys[key] = false;
    delete timeouts[key];
  }, 500); */
}


function desactivarTecla(key) {
  keys[key] = false;
  clearTimeout(timeouts[key]);
  delete timeouts[key];
} 





