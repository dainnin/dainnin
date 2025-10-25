function respawnPlayer() {
  for (let y = 1; y < mapeo.mapHeight - 1; y++) {
    for (let x = 1; x < mapeo.mapWidth - 1; x++) {
      const tile = mapeo.map[y]?.[x];
      if (tile && !tile.solid) {
        player.x = x * mapeo.tileSize;
        player.y = y * mapeo.tileSize;
        player.vida = player.vidaMax;
        player.mana = player.manaMax;
        player.objetivo = null;
        player.estado = "respawn";
        return;
      }
    }
  }
}
function updatePlayer(keys, npcs) {
  const ahora = Date.now();
  if (player.experiencia > player.nivel * 100) {
    player.nivel += 1
    player.experiencia -= player.nivel * 50
    dataPlayer(player)
    player.lvlUp = 120
  }
  if (player.vida <= 0) {
    if (ahora - player.ultimoAtaque > 2000) {
      respawnPlayer();
    }
    return;
  }

  let dx = 0, dy = 0;

  if (keys["ArrowUp"] || keys["w"]) dy -= player.speed;
  if (keys["ArrowDown"] || keys["s"]) dy += player.speed;
  if (keys["ArrowLeft"] || keys["a"]) {
    dx -= player.speed;
    player.facing = "left"; // 🔁 actualiza dirección
  }
  if (keys["ArrowRight"] || keys["d"]) {
    dx += player.speed;
    player.facing = "right"; // 🔁 actualiza dirección
  }


  if (keys["t"]) {
    player.objetivo = player.objetivo ? null : seleccionarObjetivo(npcs, player);
  }


const nextX = player.x + dx;
const nextY = player.y + dy;


const colisionX = hayColisionRect(nextX, player.y, player.w, player.h, Object.values(npcsEnVista));
const colisionY = hayColisionRect(player.x, nextY, player.w, player.h, Object.values(npcsEnVista));




if (keys[" "] && ahora - player.ultimoAtaque > player.cooldownAtaque) {
  if (player.objetivo && player.objetivo.vida > 0) {
    const dx = player.objetivo.x - player.x;
    const dy = player.objetivo.y - player.y;
    const dist = Math.hypot(dx, dy);

    if (dist < player.rangoAtaque) {
      player.objetivo.vida = Math.max(0, player.objetivo.vida - player.daño);
      player.objetivo.wasHit = true; // 🔴 Marca el golpe
      player.ultimoAtaque = ahora;
      player.objetivo.npcDGM = player.daño;
      player.objetivo.isAtked = player.name
      setTimeout(() => {
        if (player.objetivo) player.objetivo.wasHit = false; // 🔵 Apaga el efecto después de 100ms
      }, 100);
    }


    /*  function drawAttackEffect(x, y, color = "rgba(255, 0, 0, 0.5)") {
   ctx.fillStyle = color;
   ctx.beginPath();
   ctx.arc(x, y, 16, 0, Math.PI * 2);
   ctx.fill(); */
  }

}

if (isInsideMap(nextX, player.y) && !colisionX) player.x = nextX;
if (isInsideMap(player.x, nextY) && !colisionY) player.y = nextY;


/* for (const npc of npcs) {
  if (npc.solid && isColliding(player, npc)) {
    if (player.canalizando) {
      player.canalizando = false;
      player.estado = "interrumpido";
      player.hechizoActivo = null;
    }
  }
} */

if (
   player.objetivo &&
  (player.objetivo.vida <= 0 ||
    Math.hypot(player.objetivo.x - player.x, player.objetivo.y - player.y) > player.rangoVision)
) {
  player.objetivo = null;
}
}

function drawPlayer(ctx, camera) {
  if (player.lvlUp <= 120 && player.lvlUp > 0) {
    ctx.fillStyle = "rgba(120, 222, 220, 0.95)";
    ctx.beginPath();
    ctx.arc(player.x - camera.x, player.y - camera.y, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "16px monospace";
    ctx.textAlign = "left";
    ctx.fillStyle = "red";
    ctx.fillText(
      `Lv Up ${player.nivel}`,
      player.x - camera.x - player.w * 1.5,
      player.y - camera.y
    );
    player.lvlUp -= 1
  }
  function playerCamX() {
    return player.x - camera.x

  }
  if (player.name === "Sin nombre" || player.vida <= 0) return;

  const tileX = Math.floor(player.x / mapeo.tileSize);
  const tileY = Math.floor(player.y / mapeo.tileSize);
  const tile = mapeo.map[tileY]?.[tileX];

  if (tile?.solid) {
    for (let y = tileY - 1; y <= tileY + 1; y++) {
      for (let x = tileX - 1; x <= tileX + 1; x++) {
        const t = mapeo.map[y]?.[x];
        if (t && !t.solid) {
          player.x = x * mapeo.tileSize;
          player.y = y * mapeo.tileSize;
          break;
        }
      }
    }
  }

  if (playerImg[player.name]) {
    ctx.save();

    if (player.facing === "left") {
      ctx.translate(playerCamX() + player.w, player.y - camera.y);
      ctx.scale(-1, 1); // 🔁 efecto espejo horizontal
      ctx.drawImage(playerImg[player.name], 0, 0, player.w, player.h);
    } else {
      ctx.translate(playerCamX(), player.y - camera.y);
      ctx.drawImage(playerImg[player.name], 0, 0, player.w, player.h);
    }

    ctx.restore();
  } else if (player.color) {
    ctx.fillStyle = player.color;
    ctx.fillRect(
      playerCamX(),
      player.y - camera.y,
      player.w,
      player.h
    );
  }
  if (player.wasHit) {
    function rDmg() {
      return Math.ceil(Math.random() * player.w)
    }
    ctx.fillStyle = "rgba(255, 55, 55, 0.85)";
    ctx.beginPath();
    ctx.arc(player.x - camera.x + rDmg() / 2, player.y - camera.y + rDmg(), Math.ceil(Math.random() * 16), 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "16px monospace";
    ctx.textAlign = "left";
    ctx.fillStyle = "red";
    ctx.fillText(
      `DMG:${player.npcDGM || 10}`,
      player.x - camera.x - player.w * 1.5,
      player.y - camera.y
    );
    ctx.fillText(
      `Is:${player.isAtked || ""}`,
      player.x - camera.x - player.w * 1.5,
      player.y - camera.y + 15
    );
  }
  const vidaRatio = Math.max(player.vida / player.vidaMax, 0);
  ctx.fillStyle = "red";
  ctx.fillRect(playerCamX(), player.y - 10 - camera.y, player.w, 7);
  ctx.fillStyle = "lime";
  ctx.fillRect(playerCamX(), player.y - 10 - camera.y, player.w * vidaRatio, 7);
  const manaRatio = Math.max(player.mana / player.manaMax, 0);
  ctx.fillStyle = "red";
  ctx.fillRect(playerCamX(), player.y - 5 - camera.y, player.w, 7);
  ctx.fillStyle = "blue";
  ctx.fillRect(playerCamX(), player.y - 5 - camera.y, player.w * manaRatio, 7);

  ctx.font = "14px monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(
    `${player.name} Vida: ${player.vida}`,
    player.x + player.w / 2 - camera.x,
    player.y - 40 - camera.y
  );

  ctx.fillText(
    `Class: ${player.clase.nombre}`,
    player.x + player.w / 2 - camera.x,
    player.y - 28 - camera.y
  );
  ctx.fillText(
    `Nivel: ${player.nivel} Exp: ${player.experiencia}`,
    player.x + player.w / 2 - camera.x,
    player.y - 16 - camera.y
  );
  /*  ctx.font = "30px monospace";
   ctx.textAlign = "center";
   ctx.fillStyle = "white";
   ctx.fillText(
     `X cam: ${camera.x}, Y cam: ${camera.y}`,
     500,30
   ); */
}
