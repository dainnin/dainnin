

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

    ctx.restore();
  }

  requestAnimationFrame(gameLoop);
}




/* frameTimer++;
if (frameTimer >= frameSpeed) {
  currentFrame = (currentFrame + 1) % 4; // si tenés 4 frames
  frameTimer = 0;
} */