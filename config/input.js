const keys = { OnEvent: true };

const btnHechizos = document.getElementById("hechizos");
function onKeyPressed(key) {
  if (keys.OnEvent)  Hechizos[key]?.({key:key}); 

}

document.addEventListener("contextmenu", e => e.preventDefault());
window.addEventListener("keydown", (e) => {
  onKeyPressed(e.key)
  keys[e.key] = true;

});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;

});


function InputBridge(selector, onKeyPressed) {

  
  document.querySelectorAll("input").forEach((e) => {
    e.addEventListener("focus", ()=>keys.OnEvent=false);
    e.addEventListener("blur", ()=>keys.OnEvent=true);
    e.addEventListener("touchcancel", ()=>keys.OnEvent=true);
  })
  document.querySelectorAll(selector).forEach(btn => {
    const key = btn.dataset.key;
    if (!key || btn.dataset.bound) return;
    btn.dataset.bound = "true";
    const activar = () => {
      onKeyPressed(key);
      keys[key] = true;
    };

    const liberar = () => {
      keys[key] = false;
    };


    btn.addEventListener("touchstart", e => { e.preventDefault(); activar(); });
    btn.addEventListener("touchend", e => { e.preventDefault(); liberar(); });
    btn.addEventListener("touchcancel", liberar);
    btn.addEventListener("mousedown", e => { e.preventDefault(); activar(); });
    btn.addEventListener("mouseup", e => { e.preventDefault(); liberar(); });
    btn.addEventListener("mouseleave", liberar);
    btn.addEventListener("pointerleave", liberar);
  });

}

InputBridge("button[data-key]", onKeyPressed);

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

document.getElementsByName("zoom")[0].addEventListener("input", (e) => {
  zoom = e.target.value
})

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



/* document.addEventListener("keydown", e => {
  const bloqueadas = ["F12", "F11"];
  if (
    bloqueadas.includes(e.key) ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U") // ver código fuente
  ) {
    e.preventDefault();
  }
}); 
*/



