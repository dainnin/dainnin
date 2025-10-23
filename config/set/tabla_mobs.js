const npcConfig = {
    guard: { cantidad: 19, color: "purple", hostil: false, vida: 30, vidaMax: 30 },
    merchant: { cantidad: 15, color: "orange", hostil: false, vida: 20, vidaMax: 20 },

    bandit: {
        cantidad: 120,
        imageSrc: "https://dainnin.github.io/proyectowebimg/assets/img/bandido_1.png",
        color: "blue",
        hostil: true,
        velocidad: 1.5,
        daño: 3,
        vida: 50,
        vidaMax: 50,
        rangoVision: 200,
        rangoAtaque: 44,
        cooldownAtaque: 1000,
        comportamiento: "patrulla",
        muertoDesde: null,
        ultimoAtaque: 0,
        respawnTime: 10000, // en ms
        experienciaOtorgada: 10

    }



};