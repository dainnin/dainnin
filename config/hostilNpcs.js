function generateNpcHostil(name, color) {
  let attempts = 0;
  let x, y;

  do {
    x = Math.floor(Math.random() * mapWidth) * tileSize;
    y = Math.floor(Math.random() * mapHeight) * tileSize;
    attempts++;
  } while (!isValidNpcPosition(x, y) && attempts < 100);

  return {
    x,
    y,
    w: 32,
    h: 32,
    name,
    type: "hostil",
    color,
    solid: true,
    velocidad: 1.5,
    daño: 10
  };
}
function updateNpcs(npcs, player) {
  for (const npc of npcs) {
    if (npc.type === "hostil") {
      const dx = player.x - npc.x;
      const dy = player.y - npc.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 200) { // rango de detección
        const dirX = dx / dist;
        const dirY = dy / dist;

        const nextX = npc.x + dirX * npc.velocidad;
        const nextY = npc.y + dirY * npc.velocidad;

        if (!isSolidTile(nextX, npc.y)) npc.x = nextX;
        if (!isSolidTile(npc.x, nextY)) npc.y = nextY;
      }
    }
  }
}
