// === NPCs ===

const entidadesTemporales = [];

function estaEnVista(npc, player, margen = 1350) {
    const dx = Math.abs(npc.x - player.x);
    const dy = Math.abs(npc.y - player.y);
    return dx < margen && dy < margen;
}


function generateNpc(name, type, color, extras = {}) {
    let attempts = 0;
    let x, y;
    do {
        x = Math.floor(Math.random() * mapeo.mapWidth) * mapeo.tileSize;
        y = Math.floor(Math.random() * mapeo.mapHeight) * mapeo.tileSize;
        attempts++;
    } while (!isValidNpcPosition(x, y) && attempts < 100);

    return {
        x,
        y,
        spawnX: x,
        spawnY: y,
        w: 40,
        h: 40,
        name,
        type,
        color,
        solid: true,
        hostil: false,
        velocidad: 0,
        daño: 0,
        comportamiento: "idle",
        tipoEntidad: "npc",
        jugabilidad: false,
        controladoPor: "IA",
        ...extras
    };
}


const npcConfig = {
    guard: { cantidad: 7, color: "purple", hostil: false, vida: 30, vidaMax: 30 },
    merchant: { cantidad: 5, color: "orange", hostil: false, vida: 20, vidaMax: 20 },

    bandit: {
        cantidad: 100,
        imageSrc: "https://dainnin.github.io/proyectowebimg/assets/img/bandido_1.png",
        color: "blue",
        hostil: true,
        velocidad: 1.5,
        daño: 3,
        vida: 60,
        vidaMax: 60,
        rangoVision: 200,
        rangoAtaque: 44,
        cooldownAtaque: 1000,
        comportamiento: "patrulla",
        muertoDesde: null,
        ultimoAtaque: 0,
        respawnTime: 10000, // en ms
        experienciaOtorgada: 10,
        solid: false,
    },
    ente: {
        cantidad: 7,
        imageSrc: "https://dainnin.github.io/proyectowebimg/assets/img/3.png",
        color: "blue",
        hostil: true,
        velocidad: 1.5,
        daño: 2,
        vida: 50,
        vidaMax: 50,
        rangoVision: 340,
        rangoAtaque: 94,
        cooldownAtaque: 1000,
        comportamiento: "patrulla",
        muertoDesde: null,
        ultimoAtaque: 0,
        respawnTime: 10000, // en ms
        experienciaOtorgada: 12,
        solid: true,

    },
    dragon: {
        cantidad: 8,
        imageSrc: "./assets/img/dragon.png",
        color: "blue",
        hostil: true,
        velocidad: 1.5,
        daño: 4,
        vida: 250,
        w:60,
        h:60,
        vidaMax: 250,
        rangoVision: 340,
        rangoAtaque: 144,
        cooldownAtaque: 1900,
        comportamiento: "patrulla",
        muertoDesde: null,
        ultimoAtaque: 0,
        respawnTime: 15000, // en ms
        experienciaOtorgada: 22,
        solid: true,

    },



};
// 📦 Configuración inicial
const npcs = [];
const npcsImg = {};
const npcsEnVista = {};


function GenerarNpc(){
    for (const tipo in npcConfig) {
    const config = npcConfig[tipo];
    npcsImg[tipo] = config.imageSrc ? (() => {
        const img = new Image();
        img.src = config.imageSrc;
        return img;
    })() : null;

    for (let i = 0; i < config.cantidad; i++) {
        npcs.push(generateNpc(capitalize(tipo), tipo, config.color, {
            id: tipo + "_" + i,
            hostil: config.hostil,
            w: config.w||40,
            h: config.h||40,
            solid: config.solid || false,
            velocidad: config.velocidad || 0,
            daño: config.daño || 0,
            vida: config.vida || 0,
            vidaMax: config.vidaMax || config.vida || 0,
            rangoVision: config.rangoVision || 0,
            rangoAtaque: config.rangoAtaque || 0,
            cooldownAtaque: config.cooldownAtaque || 1000,
            comportamiento: config.comportamiento || "idle",
            tipoEntidad: config.tipoEntidad || "npc",
            jugabilidad: config.jugabilidad || false,
            controladoPor: config.controladoPor || "IA",
            muertoDesde: config.muertoDesde || null,
            respawnTime: config.respawnTime || 5000,
            ultimoAtaque: config.ultimoAtaque || 0,
            experienciaOtorgada: config.experienciaOtorgada || 0,
            experienciaOtorgadaYa: false,
        }));
    }
}
}

// 📍 Utilidades



function hayColisionRect(x, y, w, h, npcs = []) {
    const minX = Math.floor(x / mapeo.tileSize);
    const maxX = Math.floor((x + w - 1) / mapeo.tileSize);
    const minY = Math.floor(y / mapeo.tileSize);
    const maxY = Math.floor((y + h - 1) / mapeo.tileSize);

    for (let tx = minX; tx <= maxX; tx++) {
        for (let ty = minY; ty <= maxY; ty++) {
            const obstaculo = mapeo.obstacles[tx]?.[ty];
            if (obstaculo && isColliding({ x, y, w, h }, obstaculo)) return true;
        }
    }

    for (const npc of npcs) {

        if (npc.solid && isColliding({ x, y, w, h }, npc)) return true;
    }

    return false;
}

function patrullarYRetornar(npc, visibles) {
    if (npc.comportamiento === "patrulla") {
        npc.direccion = npc.direccion || { x: 1, y: 0 };
        npc.tiempoDireccion = npc.tiempoDireccion || 0;
        npc.tiempoDireccion--;

        if (npc.tiempoDireccion <= 0) {
            const direcciones = [
                { x: 1.25, y: 0 }, { x: -1.25, y: 0 },
                { x: 0, y: 1.25 }, { x: 0, y: -1.25 }
            ];
            npc.direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
            npc.tiempoDireccion = 60 + Math.floor(Math.random() * 60);
        }

        const nextX = npc.x + npc.direccion.x * npc.velocidad;
        const nextY = npc.y + npc.direccion.y * npc.velocidad;

        if (!hayColisionRect(nextX, npc.y, npc.w, npc.h, visibles)) npc.x = nextX;
        else npc.tiempoDireccion = 0;

        if (!hayColisionRect(npc.x, nextY, npc.w, npc.h, visibles)) npc.y = nextY;
        else npc.tiempoDireccion = 0;
    }

    const distSpawn = Math.hypot(npc.x - npc.spawnX, npc.y - npc.spawnY);
    if (distSpawn > 10) {
        const dirX = (npc.spawnX - npc.x) / distSpawn;
        const dirY = (npc.spawnY - npc.y) / distSpawn;
        const nextX = npc.x + dirX * npc.velocidad;
        const nextY = npc.y + dirY * npc.velocidad;

        if (!hayColisionRect(nextX, npc.y, npc.w, npc.h, visibles)) npc.x = nextX;
        if (!hayColisionRect(npc.x, nextY, npc.w, npc.h, visibles)) npc.y = nextY;
    }
}

function procesarRespawn(npc, player, ahora) {
    if (!npc.experienciaOtorgadaYa) {
        npc.solid = false;
        player.experiencia += npc.experienciaOtorgada || 0;
        npc.experienciaOtorgadaYa = true;
    }

    if (npc.muertoDesde === null) {
        npc.muertoDesde = ahora;
        npc.wasHit = false;
    } else {
        const tiempoMuerto = ahora - npc.muertoDesde;
        const distJugador = Math.hypot(player.x - npc.x, player.y - npc.y);

        if (tiempoMuerto >= npc.respawnTime && distJugador > npc.rangoVision) {
            npc.x = npc.spawnX;
            npc.y = npc.spawnY;
            npc.vida = npc.vidaMax;
            npc.estado = "idle";
            npc.muertoDesde = null;
            npc.experienciaOtorgadaYa = false;
            npc.solid = npcConfig[npc.type].solid;
        }
    }
}

function updateNpcs(npcs, player) {
    const ahora = Date.now();
    const otrosVisibles = Object.values(npcsEnVista);


    for (const [iNpc, npc] of npcs.entries()) {
        npc.ultimoUpdate = npc.ultimoUpdate || 0;
        npc.w = npc.w || mapeo.tileSize;
        npc.h = npc.h || mapeo.tileSize;

        const enVista = estaEnVista(npc, player);

        if (enVista) {
            npcsEnVista[iNpc] = npc;
            const visibles = otrosVisibles.filter(n => n !== npc);

            if (npc.vida > 0 && npc.hostil) {
                const dx = player.x - npc.x;
                const dy = player.y - npc.y;
                const dist = Math.hypot(dx, dy);

                if (dist < npc.rangoVision) {
                    const dirX = dx / dist;
                    const dirY = dy / dist;

                    if (dist < npc.rangoAtaque) {
                        sendData("atkInvision", [npc, player], (e) => {
                            Object.assign(player, e.player);
                            Object.assign(npc, e.npc);
                        });
                        setTimeout(() => {
                            if (player) player.wasHit = false;
                        }, 400);
                    } else {
                        npc.estado = "persiguiendo";
                        const nextX = npc.x + dirX * npc.velocidad;
                        const nextY = npc.y + dirY * npc.velocidad;

                        if (!hayColisionRect(nextX, npc.y, npc.w, npc.h, visibles)) npc.x = nextX;
                        if (!hayColisionRect(npc.x, nextY, npc.w, npc.h, visibles)) npc.y = nextY;
                    }
                } else {
                    npc.estado = "idle";
                    patrullarYRetornar(npc, visibles);
                }
            } else if (npc.vida > 0) {
                npc.estado = "idle";
                patrullarYRetornar(npc, visibles);
            } else {
                procesarRespawn(npc, player, ahora);
            }

        } else {
            delete npcsEnVista[iNpc];

            if (ahora - npc.ultimoUpdate > 5000) {
                npc.ultimoUpdate = ahora;

                if (npc.vida > 0) {
                    patrullarYRetornar(npc);
                } else {
                    procesarRespawn(npc, player, ahora);
                }
            }
        }
    }
}




function drawNPCs(ctx, camera) {

    ctx.font = "13px monospace";
    ctx.textAlign = "center";
    //function 
    for (const npc of Object.values(npcsEnVista)) {




        const x = npc.x - camera.x;
        const y = npc.y - camera.y;

        // Nombre
        ctx.fillStyle = "white";
        ctx.fillText(npc.name, x + npc.w / 2, y - 20);
        ctx.fillText(`${npc.name} - Nv: ${Math.ceil(npc.experienciaOtorgada/10)}`, x + npc.w / 2, y - 32);
        ctx.fillText(`HP: ${npc.vida}`, x + npc.w / 2, y - 8);
        // Sprite
        if (npcsImg[npc.type] instanceof Image && npcsImg[npc.type].complete) {
            ctx.drawImage(npcsImg[npc.type], x, y, npc.w, npc.h);
        } else {
            ctx.fillStyle = npc.color || "gray";
            ctx.fillRect(x, y, npc.w, npc.h);
        }


        // Si es el objetivo del jugador, dibujar borde
        if (npc === player.objetivo) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, npc.w, npc.h);
        }
        if (npc.wasHit) {
            function rDmg() {
                return Math.ceil(Math.random() * npc.w)
            }
            ctx.fillStyle = "rgba(255, 0, 0, 0.75)";
            ctx.beginPath();
            ctx.arc(npc.x - camera.x + rDmg() / 2, npc.y - camera.y + rDmg(), Math.ceil(Math.random() * 16), 0, Math.PI * 2);
            ctx.fill();
            ctx.font = "16px monospace";
            ctx.textAlign = "left";
            ctx.fillStyle = "red";
            ctx.fillText(
                `DMG:${npc.npcDGM || 10}`,
                npc.x - camera.x - npc.w * 1.5,
                npc.y - camera.y
            );
            ctx.fillText(
                `Is:${npc.isAtked || ""}`,
                npc.x - camera.x - npc.w * 1.5,
                npc.y - camera.y + 15
            );
        }



        // Barra de vida
        if (npc.vida !== undefined) {
            if (npc.vida === 0) npc.wasHit = false
            const maxBarWidth = npc.w;
            const barHeight = 4;
            const vidaRatio = Math.max(npc.vida / npc.vidaMax, 0);

            ctx.fillStyle = "red";
            ctx.fillRect(x, y - 6, maxBarWidth, barHeight);

            ctx.fillStyle = "lime";
            ctx.fillRect(x, y - 6, maxBarWidth * vidaRatio, barHeight);
        }

    }
}


