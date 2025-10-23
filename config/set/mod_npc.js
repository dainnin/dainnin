// === NPCs ===


const npcs = [];
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

function estaEnVista(npc, player, margen = 450) {
    const dx = Math.abs(npc.x - player.x);
    const dy = Math.abs(npc.y - player.y);
    return dx < margen && dy < margen;
}
for (const tipo in npcConfig) {
    const config = npcConfig[tipo];
    for (let i = 0; i < config.cantidad; i++) {
        let image = null;
        if (config.imageSrc) {
            image = new Image();
            image.src = config.imageSrc;
        }


        npcs.push(generateNpc(`${tipo}_${i + 1}`, tipo, config.color, {
            image: config.imageSrc ? (() => {
                const img = new Image();
                img.src = config.imageSrc;
                return img;
            })() : null,
            hostil: config.hostil,
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
        }));





    }
}



function updateNpcs(npcs, player) {
    function hayColisionTile(npc, nextX, nextY) {
        const tileX = Math.floor(nextX / mapeo.tileSize);
        const tileY = Math.floor(nextY / mapeo.tileSize);
        for (let y = tileY - 1; y <= tileY + 1; y++) {
            for (let x = tileX - 1; x <= tileX + 1; x++) {
                const tile = mapeo.map[y]?.[x];
                if (tile?.solid && isColliding({ ...npc, x: nextX, y: nextY }, {
                    x: x * mapeo.tileSize,
                    y: y * mapeo.tileSize,
                    w: mapeo.tileSize,
                    h: mapeo.tileSize
                })) return true;
            }
        }
        return false;
    }

    for (const npc of npcs) {
        npc.ultimoUpdate = npc.ultimoUpdate || 0;
        const ahora = Date.now();
        const enVista = estaEnVista(npc, player);
        if (enVista) {

            if (npc.vida > 0 && npc.hostil) {
                const dx = player.x - npc.x;
                const dy = player.y - npc.y;
                const dist = Math.hypot(dx, dy);

                if (dist < npc.rangoVision) {
                    const dirX = dx / dist;
                    const dirY = dy / dist;

                    if (dist < npc.rangoAtaque) {
                        npc.estado = "atacando";

                        const ahora = Date.now();

                        if (ahora - npc.ultimoAtaque > npc.cooldownAtaque) {
                            player.vida = Math.max(0, player.vida - npc.daño);
                            npc.ultimoAtaque = ahora;

                        }

                    } else {
                        npc.estado = "persiguiendo";

                        const nextX = npc.x + dirX * npc.velocidad;
                        const nextY = npc.y + dirY * npc.velocidad;

                        if (!hayColisionTile(npc, nextX, npc.y)) npc.x = nextX;
                        if (!hayColisionTile(npc, npc.x, nextY)) npc.y = nextY;

                    }

                    // Empuje entre NPCs
                    for (const otro of npcs) {
                        if (otro !== npc && isColliding(npc, otro)) {
                            const empuje = 0.5;
                            const dirX = npc.x - otro.x;
                            const dirY = npc.y - otro.y;
                            const dist = Math.hypot(dirX, dirY);

                            if (dist > 0) {
                                npc.x += (dirX / dist) * empuje;
                                npc.y += (dirY / dist) * empuje;
                            }
                        }
                    }
                    if (npc.comportamiento === "patrulla") {
                        npc.direccion = npc.direccion || { x: 1, y: 0 };
                        npc.tiempoDireccion = npc.tiempoDireccion || 0;

                        npc.tiempoDireccion--;

                        if (npc.tiempoDireccion <= 0) {
                            const direcciones = [
                                { x: 1.25, y: 0 },
                                { x: -1.25, y: 0 },
                                { x: 0, y: 1.25 },
                                { x: 0, y: -1.25 }
                            ];
                            npc.direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
                            npc.tiempoDireccion = 60 + Math.floor(Math.random() * 60); // 1–2 segundos
                        }

                        const nextX = npc.x + npc.direccion.x * npc.velocidad;
                        const nextY = npc.y + npc.direccion.y * npc.velocidad;

                        const colX = mapeo.obstacles.some(obs => isColliding({ ...npc, x: nextX }, obs));
                        const colY = mapeo.obstacles.some(obs => isColliding({ ...npc, y: nextY }, obs));

                        if (!colX) npc.x = nextX;
                        else npc.tiempoDireccion = 0;

                        if (!colY) npc.y = nextY;
                        else npc.tiempoDireccion = 0;
                    }
                } else {
                    npc.estado = "idle";
                    const distSpawn = Math.hypot(npc.x - npc.spawnX, npc.y - npc.spawnY);

                    if (npc.comportamiento === "patrulla") {
                        npc.direccion = npc.direccion || { x: 1, y: 0 };
                        npc.tiempoDireccion = npc.tiempoDireccion || 0;

                        npc.tiempoDireccion--;

                        if (npc.tiempoDireccion <= 0) {
                            const direcciones = [
                                { x: 1.25, y: 0 },
                                { x: -1.25, y: 0 },
                                { x: 0, y: 1.25 },
                                { x: 0, y: -1.25 }
                            ];
                            npc.direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
                            npc.tiempoDireccion = 60 + Math.floor(Math.random() * 60); // 1–2 segundos
                        }

                        const nextX = npc.x + npc.direccion.x * npc.velocidad;
                        const nextY = npc.y + npc.direccion.y * npc.velocidad;

                        const colX = mapeo.obstacles.some(obs => isColliding({ ...npc, x: nextX }, obs));
                        const colY = mapeo.obstacles.some(obs => isColliding({ ...npc, y: nextY }, obs));

                        if (!colX) npc.x = nextX;
                        else npc.tiempoDireccion = 0;

                        if (!colY) npc.y = nextY;
                        else npc.tiempoDireccion = 0;
                    }



                    if (distSpawn > 10) { // umbral de distancia para considerar "lejos"
                        const dirX = (npc.spawnX - npc.x) / distSpawn;
                        const dirY = (npc.spawnY - npc.y) / distSpawn;

                        const nextX = npc.x + dirX * npc.velocidad;
                        const nextY = npc.y + dirY * npc.velocidad;

                        const tileX = Math.floor(nextX / mapeo.tileSize);
                        const tileY = Math.floor(npc.y / mapeo.tileSize);
                        let colX = false;
                        for (let y = tileY - 1; y <= tileY + 1; y++) {
                            for (let x = tileX - 1; x <= tileX + 1; x++) {
                                const tile = mapeo.map[y]?.[x];
                                if (tile?.solid && isColliding({ ...npc, x: nextX }, { x: x * mapeo.tileSize, y: y * mapeo.tileSize, w: mapeo.tileSize, h: mapeo.tileSize })) {
                                    colX = true;
                                    break;
                                }
                            }
                        }
                        if (!colX) npc.x = nextX;

                        let colY = false;
                        for (let y = tileY - 1; y <= tileY + 1; y++) {
                            for (let x = tileX - 1; x <= tileX + 1; x++) {
                                const tile = mapeo.map[y]?.[x];
                                if (tile?.solid && isColliding({ ...npc, y: nextY }, { x: x * mapeo.tileSize, y: y * mapeo.tileSize, w: mapeo.tileSize, h: mapeo.tileSize })) {
                                    colY = true;
                                    break;
                                }
                            }
                        }
                        if (!colY) npc.y = nextY;
                    }

                }
            }



        } else if (ahora - npc.ultimoUpdate > 5000) {
            // 💤 Solo actualizar cada 3000 ms

            npc.ultimoUpdate = ahora;

            if (npc.vida > 0) {
                // Patrulla básica si corresponde
                if (npc.comportamiento === "patrulla") {
                    // podés copiar el bloque de patrulla que ya tenés
                }

                // Retorno al spawn si está lejos
                const distSpawn = Math.hypot(npc.x - npc.spawnX, npc.y - npc.spawnY);
                if (distSpawn > 10) {
                    const dirX = (npc.spawnX - npc.x) / distSpawn;
                    const dirY = (npc.spawnY - npc.y) / distSpawn;
                    const nextX = npc.x + dirX * npc.velocidad;
                    const nextY = npc.y + dirY * npc.velocidad;

                    const tileX = Math.floor(nextX / mapeo.tileSize);
                    const tileY = Math.floor(npc.y / mapeo.tileSize);
                    let colX = false;
                    for (let y = tileY - 1; y <= tileY + 1; y++) {
                        for (let x = tileX - 1; x <= tileX + 1; x++) {
                            const tile = mapeo.map[y]?.[x];
                            if (tile?.solid && isColliding({ ...npc, x: nextX }, { x: x * mapeo.tileSize, y: y * mapeo.tileSize, w: mapeo.tileSize, h: mapeo.tileSize })) {
                                colX = true;
                                break;
                            }
                        }
                    }
                    if (!colX) npc.x = nextX;

                    let colY = false;
                    for (let y = tileY - 1; y <= tileY + 1; y++) {
                        for (let x = tileX - 1; x <= tileX + 1; x++) {
                            const tile = mapeo.map[y]?.[x];
                            if (tile?.solid && isColliding({ ...npc, y: nextY }, { x: x * mapeo.tileSize, y: y * mapeo.tileSize, w: mapeo.tileSize, h: mapeo.tileSize })) {
                                colY = true;
                                break;
                            }
                        }
                    }
                    if (!colY) npc.y = nextY;
                }
            }

            // Respawn si está muerto
            if (npc.vida <= 0) {
                if (!npc.experienciaOtorgadaYa) {
                    player.experiencia += npc.experienciaOtorgada || 0;
                    npc.experienciaOtorgadaYa = true;
                }

                if (npc.muertoDesde === null) {
                    npc.muertoDesde = ahora;
                } else {
                    const tiempoMuerto = ahora - npc.muertoDesde;
                    const distJugador = Math.hypot(player.x - npc.x, player.y - npc.y);

                    if (tiempoMuerto >= npc.respawnTime && distJugador > npc.rangoVision) {
                        npc.x = npc.spawnX;
                        npc.y = npc.spawnY;
                        npc.vida = npc.vidaMax;
                        npc.estado = "idle";
                        npc.muertoDesde = null;
                    }
                }
            }

        }

    }
}


function drawNPCs(ctx, camera) {

    ctx.font = "12px monospace";
    ctx.textAlign = "center";

    for (const npc of npcs) {
        const tileX = Math.floor(npc.x / mapeo.tileSize);
        const tileY = Math.floor(npc.y / mapeo.tileSize);
        const tile = mapeo.map[tileY]?.[tileX];
        if (tile?.solid) {
            // Buscar un tile libre cercano
            for (let y = tileY - 1; y <= tileY + 1; y++) {
                for (let x = tileX - 1; x <= tileX + 1; x++) {
                    const t = mapeo.map[y]?.[x];
                    if (t && !t.solid) {
                        npc.x = x * mapeo.tileSize;
                        npc.y = y * mapeo.tileSize;
                        break;
                    }
                }
            }
        }
        const x = npc.x - camera.x;
        const y = npc.y - camera.y;

        // Nombre
        ctx.fillStyle = "white";
        ctx.fillText(npc.name, x + npc.w / 2, y - 8);

        // Sprite
        if (npc.image instanceof Image && npc.image.complete) {
            ctx.drawImage(npc.image, x, y, npc.w, npc.h);
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


        // Barra de vida
        if (npc.vida !== undefined) {
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


