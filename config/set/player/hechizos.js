// 🔥 Estilos y hechizos disponibles
const estilosHechizo = {
  fuego: { color: "#ff4500" },
  hielo: { color: "#00ccff" },
  cura: { color: "#00ff88" }
};

const Hechizos = {
  1: efectoCurvo,
  2: efectoDesdeCamaraHastaNPC,
  3: efectoOrbitalDesdePlayer
};

// 🧠 Estado de entrada y cooldowns

const cooldowns = {};


// ✅ Cooldown antifallo
function puedeCastear(key, costoMana) {
  const ahora = performance.now();
  return !(cooldowns[key] > ahora || player.mana < costoMana);
}

function aplicarCooldown(key, duracionMs) {
  cooldowns[key] = performance.now() + duracionMs;
  const btn = document.querySelector(`button[data-key='${key}']`);
  if (btn) {
    btn.disabled = true;
    btn.style.background = "red";
    setTimeout(() => {
      btn.disabled = false;
      btn.style.background = "rgb(233, 233, 237)";
    }, duracionMs);
  }
}

// ✅ Efectos temporales
function activarEfectoTemporal(callback, duracionMs) {
  efectosTemporales.push({
    callback,
    expiraEn: performance.now() + duracionMs
  });
}

// 🔥 Hechizos
function efectoOrbitalDesdePlayer({ tileSize = 32, duracionMs = 3000, key }) {
  if (!puedeCastear(key, 4) || player.vida >= player.vidaMax) return;

  aplicarCooldown(key, duracionMs);
  player.mana -= 4;

  const origen = { x: player.x, y: player.y };
  const direccion = player.direccion || { x: 1, y: 0 };
  const distanciaMax = tileSize * 5;
  const velocidad = 6;

  let x = origen.x, y = origen.y, distanciaRecorrida = 0, fase = "ida";
  setTimeout(function(){if((player.vida+5)<=player.vidaMax)player.vida +=5
        else if((player.vida+5)>player.vidaMax)player.vida=player.vidaMax},500)
  activarEfectoTemporal((ctx, camera) => {
    const dx = direccion.x * velocidad;
    const dy = direccion.y * velocidad;

    if (fase === "ida") {
      x += dx; y += dy;
      distanciaRecorrida += Math.hypot(dx, dy);
      if (distanciaRecorrida >= distanciaMax) fase = "vuelta";
    } else {
      x -= dx; y -= dy;
      distanciaRecorrida -= Math.hypot(dx, dy);
      if (distanciaRecorrida <= 0) {
        
        return;
      }
    }

    ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(x - camera.x, y - camera.y, 12, 0, Math.PI * 2);
    ctx.fill();
  }, duracionMs);
}

function efectoDesdeCamaraHastaNPC({ duracionMs = 5000, velocidad = 3, key }) {
  if (!puedeCastear(key, 3) || !player.objetivo) return;

  aplicarCooldown(key, duracionMs);
  player.mana -= 3;

  const origen = { x: player.x, y: player.y };
  const objetivo = player.objetivo;
  let x = origen.x, y = origen.y, activo = true;

  activarEfectoTemporal((ctx, camera) => {
    if (!activo || !objetivo) return;

    const dx = objetivo.x - x;
    const dy = objetivo.y - y;
    const dist = Math.hypot(dx, dy);

    if (dist < 5) {
      activo = false;
      objetivo.vida -= 2 * (Math.ceil(Math.random() * player.daño) + 1);
      objetivo.wasHit = true;
      setTimeout(() => objetivo.wasHit = false, 700);
      return;
    }

    const dirX = dx / dist;
    const dirY = dy / dist;
    x += dirX * velocidad;
    y += dirY * velocidad;

    ctx.fillStyle = "rgba(255, 100, 0, 0.4)";
    ctx.beginPath();
    ctx.arc(x - camera.x, y - camera.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }, duracionMs);
}

function efectoCurvo({ duracionMs = 5000, velocidad = 3, amplitud = 20, key }) {
  if (!puedeCastear(key, 2) || !player.objetivo) return;

  aplicarCooldown(key, duracionMs);
  player.mana -= 2;

  const origen = { x: player.x, y: player.y };
  const objetivo = player.objetivo;
  let t = 0, x = origen.x, y = origen.y, activo = true;

  activarEfectoTemporal((ctx, camera) => {
    if (!activo || !objetivo) return;

    const dx = objetivo.x - x;
    const dy = objetivo.y - y;
    const dist = Math.hypot(dx, dy);

    if (dist < 5) {
      activo = false;
      objetivo.vida -= (1.5 * (Math.ceil(Math.random() * 4) + 3));
      objetivo.wasHit = true;
      setTimeout(() => objetivo.wasHit = false, 700);
      return;
    }

    const dirX = dx / dist;
    const dirY = dy / dist;
    x += dirX * velocidad;
    y += dirY * velocidad;
    t += 0.1;
    y += Math.sin(t) * amplitud;

    ctx.fillStyle = "rgba(0, 200, 255, 0.4)";
    ctx.beginPath();
    ctx.arc(x - camera.x, y - camera.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }, duracionMs);
}
