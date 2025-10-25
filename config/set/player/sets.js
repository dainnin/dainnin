const playerImg = {}


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
    rangoVision: 2000,
    experiencia: 0,
    estado: "vivo",
    facing: "right", // o "left"
    nivel: 1,
    lvlUp: 0,
    puedeCastear: true

};

function dataPlayer(player) {
    const { nivel, clase } = player
    const { fuerza, musculatura, vitalidad, inteligencia, sabiduría } = clase.atributos
   
    //fuerza
    const _fuerza = fuerza;
    const _musculatura = musculatura;
    const _vitalidad = vitalidad;
    const _intelecto = inteligencia;
    const _sabiduría = sabiduría;
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
        max: _vitalidad + nivel / 5,
        coef: 1,
        tipo: "log"
    }) + _vitalidad;
    player.vidaMax = atributoEscalado({
        lvl: nivel,
        max: 100 + _fuerza + musculatura,
        coef: 0.9,
        tipo: "log"
    }) + 100;
    player.inteligencia = atributoEscalado({
        lvl: nivel,
        max: _intelecto + nivel / 5,
        coef: 1,
        tipo: "log"
    }) + _intelecto;
    player.manaMax = atributoEscalado({
        lvl: nivel,
        max: _intelecto + _sabiduría,
        coef: 1,
        tipo: "log"
    }) + _intelecto+100;

    player.pwr = (fuerza + inteligencia + sabiduría) / 3

    player.mana = player.manaMax;
    player.vida = player.vidaMax;

    setInterval(function(){
        if(player.mana<player.manaMax)player.mana+=2*nivel
        if(player.vida<player.vidaMax)player.vida+=Math.ceil(1.5*nivel)
    },5000)

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
