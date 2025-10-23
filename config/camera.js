const camera = {
  x: 0,
  y: 0,
  get w() {
    return canvas.width / zoom;
  },
  get h() {
    return canvas.height / zoom;
  }
};


function updateCamera() {
  const mitadW = camera.w / 2;
  const mitadH = camera.h / 2;

  let nuevaX = player.x + player.w / 2 - mitadW;
  let nuevaY = player.y + player.h / 2 - mitadH;

  // Limitar dentro del mapa
  const maxX = mapeo.mapWidth * mapeo.tileSize - camera.w;
  const maxY = mapeo.mapHeight * mapeo.tileSize - camera.h;

  nuevaX = Math.max(0, Math.min(nuevaX, maxX));
  nuevaY = Math.max(0, Math.min(nuevaY, maxY));

  camera.x = nuevaX;
  camera.y = nuevaY;
}
