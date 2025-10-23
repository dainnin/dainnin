

const playerImg = {}
const estilosHechizo = {
  fuego: { color: "#ff4500"/* , image: imgHechizo.fuego */ },
  hielo: { color: "#00ccff"/* , image: imgHechizo.hielo  */ },
  cura: { color: "#00ff88"/* , image: imgHechizo.cura */ }
};
function Hechizo({ x, y, objetivo, tipo = "fuego", daño = 50, rangoMax = 300 }) {
  this.x = x;
  this.y = y;
  this.objetivo = objetivo;
  this.tipo = tipo;
  this.daño = daño;
  this.rangoMax = rangoMax;
  this.distanciaRecorrida = 0;
  this.activo = true;

  this.actualizar = function () {
    if (!this.activo) return;

    // Lógica irreal: impacto directo
    this.x = this.objetivo.x;
    this.y = this.objetivo.y;

    aplicarEfecto(this.objetivo, this.tipo, this.daño);
    this.activo = false;
  };

  this.dibujar = function (ctx) {
    const estilo = estilosHechizo[this.tipo];
    if (!estilo) return;

    if (estilo.color) {
      ctx.fillStyle = estilo.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    if (estilo.image) {
      ctx.drawImage(estilo.image, this.x - 16, this.y - 16, 32, 32);
    }
  };
}

const player = {
  name: "Sin nombre",
  clase: {},
  stats: {
    set: {},
    buff: {},
    raza: {},
    debuff: {},
    pasivos: {},
    speed: 2,
    vida: 100,
    vidaMax: 100,
    daño: 5,
    rangoAtaque: 100,
    cooldownAtaque: 500,
    rangoVision: 200,
  },
  x: 100,
  y: 100,
  w: 40,
  h: 40,
  speed: 2,
  vida: 100,
  vidaMax: 100,
  daño: 5,
  rangoAtaque: 100,
  cooldownAtaque: 500,
  ultimoAtaque: 0,
  objetivo: null,
  rangoVision: 200,
  experiencia: 0,
  estado: "vivo",
  facing: "right", // o "left"
  nivel: 1,
  lvlUp: 0
};

function dataPlayer(player) {
  const { vidaMax, nivel, clase } = player
  const { fuerza, musculatura, vitalidad } = clase.atributos
  //fuerza
  const _fuerza = fuerza;
  const _musculatura = musculatura;
  const _vitalidad = vitalidad;
  const _intelecto = "_musculatura"
  player.fuerza = atributoEscalado({
    lvl: nivel,
    max: _fuerza + nivel / 5,
    coef: 1,
    tipo: "log"
  }) + _fuerza;
  player.musculatura = atributoEscalado({
    lvl: nivel,
    max: _musculatura + nivel / 5,
    coef: 1,
    tipo: "log"
  }) + _musculatura;
  player.vitalidad = atributoEscalado({
    lvl: nivel,
    max: _fuerza + nivel / 5,
    coef: 1,
    tipo: "log"
  }) + vidaMax;
  player.vidaMax = atributoEscalado({
    lvl: nivel,
    max: 100 + _fuerza + musculatura,
    coef: 0.9,
    tipo: "log"
  }) + 100;
  player.vida = player.vidaMax;



}

function seleccionarObjetivo(npcs, player) {
  const enRango = npcs.filter(npc => {
    const dx = npc.x - player.x;
    const dy = npc.y - player.y;
    const dist = Math.hypot(dx, dy);
    return dist < player.rangoVision && npc.vida > 0;
  });

  enRango.sort((a, b) => {
    const da = Math.hypot(a.x - player.x, a.y - player.y);
    const db = Math.hypot(b.x - player.x, b.y - player.y);
    return da - db;
  });

  return enRango[0] || null;
}

function respawnPlayer() {
  for (let y = 1; y < mapeo.mapHeight - 1; y++) {
    for (let x = 1; x < mapeo.mapWidth - 1; x++) {
      const tile = mapeo.map[y]?.[x];
      if (tile && !tile.solid) {
        player.x = x * mapeo.tileSize;
        player.y = y * mapeo.tileSize;
        player.vida = player.vidaMax;
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


const colisionX = hayColisionRect(nextX, player.y, player.w, player.h);
const colisionY = hayColisionRect(player.x, nextY, player.w, player.h);



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

  if (isInsideMap(nextX, player.y) && !colisionX) {
    player.x = nextX;
  }
  if (isInsideMap(player.x, nextY) && !colisionY) {
    player.y = nextY;
  }

  for (const npc of npcs) {
    if (npc.solid && isColliding(player, npc)) {
      if (player.canalizando) {
        player.canalizando = false;
        player.estado = "interrumpido";
        player.hechizoActivo = null;
      }
    }
  }

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
  ctx.font = "30px monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(
    `X cam: ${camera.x}, Y cam: ${camera.y}`,
    500,30
  );
}
