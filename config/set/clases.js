const fuerzaMagos = {
  sabioClasico: {
    nombre: "Sabio clásico",
    ejemplos: ["Merlin", "Gandalf", "Dumbledore"],
    fuerzaSinMagiaKg: 30,
    fuerzaConMagiaKg: null,
    descripcion: "Magos intelectuales con fuerza física humana promedio o menor. No usan magia para potenciar fuerza."
  },
  guerreroMagico: {
    nombre: "Guerrero mágico",
    ejemplos: ["Geralt", "Elric", "Raistlin"],
    fuerzaSinMagiaKg: 80,
    fuerzaConMagiaKg: 150,
    descripcion: "Magos entrenados físicamente que combinan combate y hechizos. Pueden levantar cargas moderadas."
  },
  magoDeFuerza: {
    nombre: "Mago de fuerza",
    ejemplos: ["D&D hechiceros", "Final Fantasy", "Anime tipo Fairy Tail"],
    fuerzaSinMagiaKg: 50,
    fuerzaConMagiaKg: 500,
    descripcion: "Magos que usan hechizos para potenciar fuerza física. Pueden igualar o superar gigantes."
  },
  magoExtremo: {
    nombre: "Mago extremo",
    ejemplos: ["Personajes anime con magia física pura"],
    fuerzaSinMagiaKg: 60,
    fuerzaConMagiaKg: 1000,
    descripcion: "Casos excepcionales donde la magia permite fuerza sobrehumana. Usado en contextos épicos o exagerados."
  }
};
const modificadoresRaza = {
  humano: { fuerzaBase: 50 },
  elfo: { fuerzaBase: 40 },
  enano: { fuerzaBase: 70 },
  orco: { fuerzaBase: 120 },
  gigante: { fuerzaBase: 250 },
  gnomo: { fuerzaBase: 25 },
  espectro: { fuerzaBase: 10 }
};


const rpgClasses_ = {
  mana: {
    elementales: [
      "magoFuego",
      "hechiceroHielo",
      "invocadorTormenta",
      "geomante"
    ],
    naturaleza: [
      "druida",
      "chaman",
      "invocadorBestias",
      "guardianBosque"
    ],
    espirituales: [
      "nigromante",
      "clerigoVida",
      "invocadorEspiritus",
      "oraculo"
    ],
    arcanos: [
      "hechicero",
      "ilusionista",
      "cronomante",
      "encantador"
    ]
  },
  energia: {
    agiles: [
      "arquero",
      "asesino",
      "ladron",
      "explorador"
    ],
    tecnicos: [
      "ninja",
      "duelista",
      "espadachinAgil",
      "cazadorSombras"
    ]
  },
  furia: {
    guerreros: [
      "berserker",
      "paladin",
      "gladiador",
      "caballeroOscuro"
    ]
  },
  fe: {
    sagrados: [
      "clerigoSolar",
      "templario",
      "monjeEspiritual"
    ]
  },
  sangre: {
    oscuros: [
      "vampiroMistico",
      "brujoCorrupto",
      "heraldoVacio"
    ]
  },
  corrupcion: {
    alquimicos: [
      "alquimista",
      "transmutador",
      "biohechicero"
    ]
  }
};
/* 
 fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
       */
const classStats_ = {
  //  MANA - Elementales
  magoFuego: {
    id:1,
    nombre: "Mago de Fuego", tipo: "elemental", recurso: { mana: 100 }, atributos: {
      fuerza: 17,
      agilidad: 13,
      musculatura: 12,

      //  Vitales
      vitalidad: 10,
      resistencia: 10,

      //  Mentales / Espirituales
      inteligencia: 21,
      voluntad: 17,
      sabiduría: 25,

      //  Narrativos / Destino
      carisma: 4,
      suerte: 7
    },
    color: "#FF4500", image: "https://dainnin.github.io/proyectowebimg/assets/img/mage.png"
  },
  hechiceroHielo: {
    nombre: "Hechicero de Hielo", tipo: "elemental", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#00BFFF", image: "hechiceroHielo.png"
  },
  invocadorTormenta: {
    nombre: "Invocador de Tormenta", tipo: "elemental", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#9370DB", image: "invocadorTormenta.png"
  },
  geomante: {
    nombre: "Geomante", tipo: "elemental", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#8B4513", image: "geomante.png"
  },

  //  MANA - Naturaleza
  druida: {
    nombre: "Druida", tipo: "naturaleza", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#228B22", image: "druida.png"
  },
  chaman: {
    nombre: "Chamán", tipo: "naturaleza", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#6B8E23", image: "chaman.png"
  },
  invocadorBestias: {
    nombre: "Invocador de Bestias", tipo: "naturaleza", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#A0522D", image: "invocadorBestias.png"
  },
  guardianBosque: {
    nombre: "Guardián del Bosque", tipo: "naturaleza", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#2E8B57", image: "guardianBosque.png"
  },

  //  MANA - Espirituales
  nigromante: {
    nombre: "Nigromante", tipo: "espiritual", recurso: { mana: 100, sangre: 50 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#4B0082", image: "nigromante.png"
  },
  clerigoVida: {
    nombre: "Clérigo de la Vida", tipo: "espiritual", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#DA70D6", image: "clerigoVida.png"
  },
  invocadorEspiritus: {
    nombre: "Invocador de Espíritus", tipo: "espiritual", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#D8BFD8", image: "invocadorEspiritus.png"
  },
  oraculo: {
    nombre: "Oráculo", tipo: "espiritual", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#BA55D3", image: "oraculo.png"
  },

  //  MANA - Arcanos
  hechicero: {
    nombre: "Hechicero", tipo: "arcano", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#9932CC", image: "hechicero.png"
  },
  ilusionista: {
    nombre: "Ilusionista", tipo: "arcano", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#FF69B4", image: "ilusionista.png"
  },
  cronomante: {
    nombre: "Cronomante", tipo: "arcano", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#FFD700", image: "cronomante.png"
  },
  encantador: {
    nombre: "Encantador", tipo: "arcano", recurso: { mana: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#FFB6C1", image: "encantador.png"
  },

  //  ENERGIA - Ágiles
  arquero: {
    nombre: "Arquero", tipo: "agil", recurso: { energia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#32CD32", image: "https://dainnin.github.io/proyectowebimg/assets/img/arquero.png"
  },
  asesino: {
    nombre: "Asesino", tipo: "agil", recurso: { energia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#696969", image: "asesino.png"
  },
  ladron: {
    nombre: "Ladrón", tipo: "agil", recurso: { energia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#708090", image: "ladron.png"
  },
  explorador: {
    nombre: "Explorador", tipo: "agil", recurso: { energia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#3CB371", image: "explorador.png"
  },

  //  ENERGIA - Técnicos
  ninja: {
    nombre: "Ninja", tipo: "tecnico", recurso: { energia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#2F4F4F", image: "ninja.png"
  },
  duelista: {
    nombre: "Duelista", tipo: "tecnico", recurso: { energia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#B22222", image: "duelista.png"
  },
  espadachinAgil: {
    nombre: "Espadachín Ágil", tipo: "tecnico", recurso: { energia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#CD5C5C", image: "espadachinAgil.png"
  },
  cazadorSombras: {
    nombre: "Cazador de Sombras", tipo: "tecnico", recurso: { energia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#8B0000", image: "cazadorSombras.png"
  },

  //  FURIA - Guerreros
  berserker: {
    nombre: "Berserker", tipo: "guerrero", recurso: { furia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#DC143C", image: "https://dainnin.github.io/proyectowebimg/assets/img/berserker.png"
  },
  paladin: {
    nombre: "Paladín", tipo: "guerrero", recurso: { furia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#F0E68C", image: "paladin.png"
  },
  gladiador: {
    nombre: "Gladiador", tipo: "guerrero", recurso: { furia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#FFA500", image: "gladiador.png"
  },
  caballeroOscuro: {
    nombre: "Caballero Oscuro", tipo: "guerrero", recurso: { furia: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#191970", image: "caballeroOscuro.png"
  },

  //  FE - Sagrados
  clerigoSolar: {
    nombre: "Clérigo Solar", tipo: "sagrado", recurso: { fe: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#FFFF00", image: "clerigoSolar.png"
  },
  templario: {
    nombre: "Templario", tipo: "sagrado", recurso: { fe: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#FFFACD", image: "templario.png"
  },
  monjeEspiritual: {
    nombre: "Monje Espiritual", tipo: "sagrado", recurso: { fe: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#F5DEB3", image: "monjeEspiritual.png"
  },

  //  SANGRE - Oscuros
  vampiroMistico: {
    nombre: "Vampiro Místico", tipo: "oscuro", recurso: { sangre: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#8B0000", image: "vampiroMistico.png"
  },
  brujoCorrupto: {
    nombre: "Brujo Corrupto", tipo: "oscuro", recurso: { sangre: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#800000", image: "brujoCorrupto.png"
  },
  heraldoVacio: {
    nombre: "Heraldo del Vacío", tipo: "oscuro", recurso: { sangre: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#4B0082", image: "heraldoVacio.png"
  },

  //  CORRUPCIÓN - Alquímicos
  alquimista: {
    nombre: "Alquimista", tipo: "alquimico", recurso: { corrupcion: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#DAA520", image: "alquimista.png"
  },
  transmutador: {
    nombre: "Transmutador", tipo: "alquimico", recurso: { corrupcion: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#B8860B", image: "transmutador.png"
  },
  biohechicero: {
    nombre: "Biohechicero", tipo: "alquimico", recurso: { corrupcion: 100 }, atributos: {
      fuerza: 0,
      agilidad: 0,
      musculatura: 0,

      //  Vitales
      vitalidad: 0,
      resistencia: 0,

      //  Mentales / Espirituales
      inteligencia: 0,
      voluntad: 0,
      sabiduría: 0,

      //  Narrativos / Destino
      carisma: 0,
      suerte: 0
    },
    color: "#556B2F", image: "biohechicero.png"
  }
}



const modificadoresPorAtributo = {
  fuerza: {
    pro: {
      dañoFisico: 0.5,
      empuje: 0.4,
      cargaMaxima: 0.3,
      penetracionArmadura: 0.2
    },
    contra: {
      agilidad: -0.2,
      velocidadMovimiento: -0.15
    }
  },
  agilidad: {
    pro: {
      velocidadMovimiento: 0.5,
      evasión: 0.4,
      precisiónFisica: 0.3,
      velocidadAtaque: 0.2
    },
    contra: {
      fuerza: -0.1,
      defensaPasiva: -0.1
    }
  },
  musculatura: {
    pro: {
      defensaPasiva: 0.5,
      resistenciaEmpuje: 0.4,
      estabilidadFisica: 0.3
    },
    contra: {
      velocidadMovimiento: -0.2,
      evasión: -0.15
    }
  },
  vitalidad: {
    pro: {
      vidaMaxima: 0.5,
      regeneracionVida: 0.3,
      resistenciaFisica: 0.2
    },
    contra: {
      velocidadAtaque: -0.1
    }
  },
  resistencia: {
    pro: {
      toleranciaVeneno: 0.4,
      defensaEstados: 0.3,
      aguanteProlongado: 0.2
    },
    contra: {
      dañoMagico: -0.1
    }
  },
  inteligencia: {
    pro: {
      dañoMagico: 0.5,
      ahorroMana: 0.3,
      precisionMagica: 0.2,
      velocidadCanalizacion: 0.2
    },
    contra: {
      vitalidad: -0.1,
      musculatura: -0.1
    }
  },
  voluntad: {
    pro: {
      resistenciaInterrupciones: 0.4,
      duracionBuffs: 0.3,
      defensaMental: 0.3
    },
    contra: {
      evasión: -0.1
    }
  },
  sabiduría: {
    pro: {
      deteccionOcultos: 0.4,
      efectividadVisionMagica: 0.3,
      sinergiaEspiritual: 0.2
    },
    contra: {
      velocidadAtaque: -0.1
    }
  },
  carisma: {
    pro: {
      influenciaSocial: 0.5,
      controlAliados: 0.3,
      bonificacionNarrativa: 0.2
    },
    contra: {
      defensaFisica: -0.1
    }
  },
  suerte: {
    pro: {
      probabilidadCritica: 0.4,
      evasiónPasiva: 0.3,
      calidadLoot: 0.3,
      eventosAleatorios: 0.2
    },
    contra: {
      nada: 0 // suerte no penaliza directamente
    }
  }
};



/* 
 {
  magoFuego: {
    nombre: "Mago de Fuego",
    tipo: "elemental",
    recurso: {
      mana: 100
    },
    atributos: {
      fuerza: 10,
      agilidad: 15,
      inteligencia: 90,
      vitalidad: 40,
      musculatura: 5
    }
  },
  berserker: {
    nombre: "Berserker",
    tipo: "guerrero",
    recurso: {
      furia: 100,
      mana: 20
    },
    atributos: {
      fuerza: 90,
      agilidad: 40,
      inteligencia: 20,
      vitalidad: 80,
      musculatura: 85
    }
  },
  arquero: {
    nombre: "Arquero",
    tipo: "agil",
    recurso: {
      energia: 100,
      mana: 30
    },
    atributos: {
      fuerza: 40,
      agilidad: 85,
      inteligencia: 50,
      vitalidad: 60,
      musculatura: 35
    }
  },
  nigromante: {
    nombre: "Nigromante",
    tipo: "espiritual",
    recurso: {
      mana: 100,
      sangre: 50
    },
    atributos: {
      fuerza: 20,
      agilidad: 25,
      inteligencia: 95,
      vitalidad: 50,
      musculatura: 10
    }
  },
  templario: {
    nombre: "Templario",
    tipo: "sagrado",
    recurso: {
      fe: 100,
      mana: 40
    },
    atributos: {
      fuerza: 70,
      agilidad: 30,
      inteligencia: 60,
      vitalidad: 80,
      musculatura: 65
    }
  },
  biohechicero: {
    nombre: "Biohechicero",
    tipo: "alquimico",
    recurso: {
      corrupcion: 100,
      mana: 60
    },
    atributos: {
      fuerza: 30,
      agilidad: 40,
      inteligencia: 85,
      vitalidad: 55,
      musculatura: 25
    }
  }
};

*/