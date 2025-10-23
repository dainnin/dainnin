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
  camera.x = player.x + player.w / 2 - camera.w / 2;
  camera.y = player.y + player.h / 2 - camera.h / 2;
}
