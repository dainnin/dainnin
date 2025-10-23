function atkInvision([npc, player]) {
  const ahora = Date.now();
  const cambiosNpc = {};
  const cambiosPlayer = {};

  cambiosNpc.estado = "atacando";

  if (ahora - npc.ultimoAtaque > npc.cooldownAtaque) {
    cambiosPlayer.vida = Math.max(0, player.vida - npc.daño);
    cambiosNpc.ultimoAtaque = ahora;

    cambiosPlayer.wasHit = true;
    cambiosPlayer.npcDGM = npc.daño;
    cambiosPlayer.isAtked = npc.name;
  }

  return { npc: cambiosNpc, player: cambiosPlayer };
}



const tareas = {
atkInvision,

};

self.onmessage = function (e) {
    const { tipo, datos, id } = e.data;
    const resultado = tareas[tipo]?.(datos);
    self.postMessage({ tipo, resultado, id });
};
