const efectosTemporales = [];

function activarEfectoTemporal(callback, duracionMs) {
  efectosTemporales.push({
    callback,
    expiraEn: performance.now() + duracionMs
  });
}


let lastFrameTime = 0;
const targetFPS = 60;
const frameDuration = 1000 / targetFPS;

function gameLoop(timestamp) {
  const delta = timestamp - lastFrameTime;

  if (delta >= frameDuration) {
    lastFrameTime = timestamp;

    updateNpcs(npcs, player, delta);
    updatePlayer(keys, npcs, delta);
    updateCamera();

    // Render
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.setTransform(zoom, 0, 0, zoom, 0, 0); 

    drawMap(ctx, camera, tileStyles);
    drawNPCs(ctx, camera);
    drawPlayer(ctx, camera);

    // 🔧 Ejecutar efectos temporales
    const ahora = performance.now();
    for (const efecto of efectosTemporales) {
      if (ahora < efecto.expiraEn) {
        efecto.callback(ctx, camera); // pasamos contexto si lo necesita
      }
    }

    // 🔧 Limpiar expirados
    for (let i = efectosTemporales.length - 1; i >= 0; i--) {
      if (ahora >= efectosTemporales[i].expiraEn) {
        efectosTemporales.splice(i, 1);
      }
    }
for (const entidad of entidadesTemporales) {
  entidad.actualizar?.();
  entidad.dibujar?.(ctx);
}

    ctx.restore();
  }

  requestAnimationFrame(gameLoop);
}



/* frameTimer++;
if (frameTimer >= frameSpeed) {
  currentFrame = (currentFrame + 1) % 4; // si tenés 4 frames
  frameTimer = 0;
} */