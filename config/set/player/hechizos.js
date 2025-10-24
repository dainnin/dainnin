const estilosHechizo = {
  fuego: { color: "#ff4500"/* , image: imgHechizo.fuego */ },
  hielo: { color: "#00ccff"/* , image: imgHechizo.hielo  */ },
  cura: { color: "#00ff88"/* , image: imgHechizo.cura */ }
};
function efectoOrbitalDesdePlayer({ player,camera, tileSize = 32, duracionMs = 3000 }) {
  const origen = { x: player.x, y: player.y };
  const direccion = player.direccion || { x: 1, y: 0 }; // por defecto hacia la derecha
  const distanciaMax = tileSize * 5;
  const velocidad = 6;

  let x = origen.x;
  let y = origen.y;
  let distanciaRecorrida = 0;
  let fase = "ida"; // o "vuelta"

  activarEfectoTemporal((ctx, cameras=camera) => {
    const dx = direccion.x * velocidad;
    const dy = direccion.y * velocidad;

    if (fase === "ida") {
      x += dx;
      y += dy;
      distanciaRecorrida += Math.hypot(dx, dy);
      if (distanciaRecorrida >= distanciaMax) {
        fase = "vuelta";
      }
    } else {
      x -= dx;
      y -= dy;
      distanciaRecorrida -= Math.hypot(dx, dy);
      if (distanciaRecorrida <= 0) {
        
        
        keysCast[2].style.background = "rgb(233, 233, 237)"
        // Termina automáticamente cuando vuelve
      }
    }

    ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(x - cameras.x, y - cameras.y, 12, 0, Math.PI * 2);
    ctx.fill();
  }, duracionMs);
}
function Seguidor({ origen,camera,objetivo, velocidad = 3 }) {
  this.x = origen.x;
  this.y = origen.y;
  this.objetivo = objetivo;
  this.activo = true;

  this.actualizar = function () {
    if (!this.activo || !this.objetivo) return;

    const dx = this.objetivo.x - this.x;
    const dy = this.objetivo.y - this.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 2) return; // ya está cerca

    const dirX = dx / dist;
    const dirY = dy / dist;

    this.x += dirX * velocidad;
    this.y += dirY * velocidad;
  };

  this.dibujar = function (ctx) {
    ctx.fillStyle = "rgba(250, 63, 16, 0.7)";
    ctx.beginPath();
    ctx.arc(this.x - camera.x, this.y - camera.y, 10, 0, Math.PI * 2);
    ctx.fill();
  };
}
function efectoDesdeCamaraHastaNPC({ player, camera,objetivo, duracionMs = 5000, velocidad = 3 }) {
  const origen = {
    x: player.x,
    y: player.y
  };

  let x = origen.x;
  let y = origen.y;
  let activo = true;

  activarEfectoTemporal((ctx, camera) => {
    if (!activo || !objetivo) return;

    const dx = objetivo.x - x;
    const dy = objetivo.y - y;
    const dist = Math.hypot(dx, dy);

    if (dist < 5) {
      activo = false;
      objetivo.vida -= 2 * (Math.ceil(Math.random()*player.daño)+1 )
      objetivo.wasHit = true
     
      keysCast[1].style.background = "rgb(233, 233, 237)"
      
      setTimeout(objetivo.wasHit = false, 700)
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
function efectoCurvo({ player, camera, objetivo, duracionMs = 5000, velocidad = 3, amplitud = 20 }) {
  const origen = {
    x: camera.x + canvas.width / (2 * zoom),
    y: camera.y + canvas.height / (2 * zoom)
  };
  let t = 0;



  let x = origen.x;
  let y = origen.y;
  let activo = true;

  activarEfectoTemporal((ctx, camera) => {
    if (!activo || !objetivo) return;

    const dx = objetivo.x - x;
    const dy = objetivo.y - y;
    const dist = Math.hypot(dx, dy);

    if (dist < 5) {
      activo = false;
      objetivo.vida -= (1 * (Math.ceil(Math.random() * 4)+1 ))
      objetivo.wasHit = true
      keysCast[0].style.background = "rgb(233, 233, 237)"
      setTimeout(objetivo.wasHit = false, 700)
      return;
    }

    const dirX = dx / dist;
    const dirY = dy / dist;

    x += dirX * velocidad;
    y += dirY * velocidad;
    t += 0.1;

    x += dirX * velocidad;
    y += dirY * velocidad + Math.sin(t) * amplitud;

    ctx.fillStyle = "rgba(0, 200, 255, 0.4)";
    ctx.beginPath();
    ctx.arc(x - camera.x, y - camera.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }, duracionMs);

}
