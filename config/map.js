function crearMapeo(mapaPredefinido = null) {
  const _this = {};
  _this.map = [];
  _this.obstacles = {};

  const data = {
    tileSize: 48,
    mapWidth: 35,
    mapHeight: 20,
  };

  Object.defineProperties(_this, {
    _map: {
      get: () => data,
      set: config => Object.assign(data, config)
    },
    tileSize: { get: () => data.tileSize },
    mapWidth: { get: () => data.mapWidth },
    mapHeight: { get: () => data.mapHeight },
  });

  function expandirFilaComprimida(fila) {
    const expandida = [];
    for (const bloque of fila) {
      const [tipo, cantidad] = Object.entries(bloque)[0];
      for (let i = 0; i < cantidad; i++) expandida.push(tipo);
    }
    return expandida;
  }

  function generarDesdeMapaPredefinido(json) {
    data.tileSize = json.tileSize || data.tileSize;
    data.mapWidth = json.mapWidth;
    data.mapHeight = json.mapHeight;

    for (let y = 0; y < data.mapHeight; y++) {
      const fila = json.tiles[y];
      const expandida = typeof fila[0] === "string" ? fila : expandirFilaComprimida(fila);

      const row = [];
      for (let x = 0; x < data.mapWidth; x++) {
        const type = expandida[x];
        const solid = type === "rock" || type === "wall";
        row.push({ type, solid });
      }
      _this.map.push(row);
    }

    actualizarObstaculosDesdeMapa();
  }

  function generarAleatorio() {
    for (let y = 0; y < data.mapHeight; y++) {
      const row = [];
      for (let x = 0; x < data.mapWidth; x++) {
        const isBorder = x === 0 || y === 0 || x === data.mapWidth - 1 || y === data.mapHeight - 1;
        const r = Math.random();
        const type = isBorder ? "wall" : r < 0.1 ? "rock" : r < 0.2 ? "water" : "grass";
        const solid = isBorder || type === "rock";
        row.push({ type, solid });
      }
      _this.map.push(row);
    }

    actualizarObstaculosDesdeMapa();
  }

  function actualizarObstaculosDesdeMapa() {
    for (let x = 0; x < data.mapWidth; x++) {
      _this.obstacles[x] = _this.obstacles[x] || {};
      for (let y = 0; y < data.mapHeight; y++) {
        const tile = _this.map[y][x];
        if (tile.solid) {
          _this.obstacles[x][y] = {
            x: x * data.tileSize,
            y: y * data.tileSize,
            w: data.tileSize,
            h: data.tileSize,
            solid: true,
            type: tile.type,
            coor: { x, y },
          };
        }
      }
    }
  }

  _this.isSolidTile = function (x, y) {
    const tileX = Math.floor(x / data.tileSize);
    const tileY = Math.floor(y / data.tileSize);
    return _this.obstacles[tileX]?.[tileY]?.solid === true;
  };

  _this.isInsideMap = function (x, y) {
    return (
      x >= 0 &&
      y >= 0 &&
      x < data.mapWidth * data.tileSize &&
      y < data.mapHeight * data.tileSize
    );
  };

  _this.isValidNpcPosition = function (x, y) {
    const tileX = Math.floor(x / data.tileSize);
    const tileY = Math.floor(y / data.tileSize);

    if (_this.obstacles[tileX]?.[tileY]) return false;

    const vecinos = [
      _this.obstacles[tileX]?.[tileY - 1],
      _this.obstacles[tileX]?.[tileY + 1],
      _this.obstacles[tileX - 1]?.[tileY],
      _this.obstacles[tileX + 1]?.[tileY]
    ];

    return vecinos.some(v => !v);
  };

  _this.generar = function () {
    if (mapaPredefinido?.tiles) {
      generarDesdeMapaPredefinido(mapaPredefinido);
    } else {
      generarAleatorio();
    }
  };

  return _this;
}

// const mapeo = crearMapeo(); // no genera nada aún
// mapeo.generar(); // genera aleatorio

// o con mapa comprimido
const mapaComprimido = {
  tileSize: 48,
  mapWidth: 30,
  mapHeight: 12,
  tiles: [
    [ {wall: 10}, {rock: 2}, {water: 3} ],
    [ {wall: 10} ]
  ]
};
const mapT={
  "tileSize": 48,
  "mapWidth": 50,
  "mapHeight": 27,
  "tiles": [
    [
      {
        "wall": 20
      },
      {
        "grass": 3
      },
      {
        "wall": 1
      },
      {
        "grass": 13
      },
      {
        "rock": 2
      },
      {
        "grass": 6
      },
      {
        "wall": 5
      }
    ],
    [
      {
        "grass": 19
      },
      {
        "wall": 1
      },
      {
        "grass": 3
      },
      {
        "wall": 3
      },
      {
        "grass": 12
      },
      {
        "rock": 1
      },
      {
        "grass": 11
      }
    ],
    [
      {
        "grass": 19
      },
      {
        "wall": 1
      },
      {
        "grass": 6
      },
      {
        "wall": 1
      },
      {
        "grass": 11
      },
      {
        "rock": 1
      },
      {
        "grass": 11
      }
    ],
    [
      {
        "grass": 19
      },
      {
        "wall": 1
      },
      {
        "grass": 6
      },
      {
        "wall": 2
      },
      {
        "grass": 11
      },
      {
        "rock": 1
      },
      {
        "grass": 10
      }
    ],
    [
      {
        "grass": 19
      },
      {
        "wall": 1
      },
      {
        "grass": 7
      },
      {
        "wall": 1
      },
      {
        "grass": 11
      },
      {
        "rock": 2
      },
      {
        "grass": 9
      }
    ],
    [
      {
        "grass": 19
      },
      {
        "wall": 1
      },
      {
        "grass": 6
      },
      {
        "wall": 2
      },
      {
        "grass": 12
      },
      {
        "rock": 2
      },
      {
        "grass": 8
      }
    ],
    [
      {
        "grass": 26
      },
      {
        "wall": 1
      },
      {
        "grass": 13
      },
      {
        "rock": 1
      },
      {
        "grass": 9
      }
    ],
    [
      {
        "grass": 26
      },
      {
        "wall": 1
      },
      {
        "grass": 11
      },
      {
        "rock": 3
      },
      {
        "grass": 9
      }
    ],
    [
      {
        "grass": 26
      },
      {
        "wall": 1
      },
      {
        "grass": 10
      },
      {
        "rock": 2
      },
      {
        "grass": 11
      }
    ],
    [
      {
        "grass": 26
      },
      {
        "wall": 1
      },
      {
        "grass": 9
      },
      {
        "rock": 2
      },
      {
        "grass": 12
      }
    ],
    [
      {
        "grass": 26
      },
      {
        "wall": 2
      },
      {
        "grass": 8
      },
      {
        "rock": 1
      },
      {
        "grass": 13
      }
    ],
    [
      {
        "grass": 27
      },
      {
        "wall": 1
      },
      {
        "grass": 22
      }
    ],
    [
      {
        "grass": 27
      },
      {
        "wall": 1
      },
      {
        "grass": 22
      }
    ],
    [
      {
        "wall": 20
      },
      {
        "grass": 7
      },
      {
        "wall": 1
      },
      {
        "grass": 20
      },
      {
        "water": 2
      }
    ],
    [
      {
        "rock": 1
      },
      {
        "grass": 26
      },
      {
        "wall": 1
      },
      {
        "grass": 17
      },
      {
        "water": 5
      }
    ],
    [
      {
        "rock": 1
      },
      {
        "grass": 26
      },
      {
        "wall": 1
      },
      {
        "grass": 17
      },
      {
        "water": 5
      }
    ],
    [
      {
        "rock": 1
      },
      {
        "grass": 26
      },
      {
        "wall": 1
      },
      {
        "grass": 16
      },
      {
        "water": 3
      },
      {
        "grass": 2
      },
      {
        "rock": 1
      }
    ],
    [
      {
        "rock": 1
      },
      {
        "grass": 11
      },
      {
        "water": 2
      },
      {
        "grass": 28
      },
      {
        "water": 3
      },
      {
        "grass": 3
      },
      {
        "rock": 2
      }
    ],
    [
      {
        "rock": 1
      },
      {
        "grass": 10
      },
      {
        "water": 4
      },
      {
        "grass": 25
      },
      {
        "water": 3
      },
      {
        "grass": 5
      },
      {
        "rock": 2
      }
    ],
    [
      {
        "rock": 1
      },
      {
        "grass": 9
      },
      {
        "water": 6
      },
      {
        "grass": 23
      },
      {
        "water": 2
      },
      {
        "grass": 6
      },
      {
        "rock": 2
      },
      {
        "grass": 1
      }
    ],
    [
      {
        "rock": 1
      },
      {
        "grass": 8
      },
      {
        "water": 8
      },
      {
        "grass": 20
      },
      {
        "water": 3
      },
      {
        "grass": 6
      },
      {
        "rock": 2
      },
      {
        "grass": 2
      }
    ],
    [
      {
        "rock": 1
      },
      {
        "grass": 9
      },
      {
        "water": 6
      },
      {
        "grass": 11
      },
      {
        "wall": 1
      },
      {
        "grass": 8
      },
      {
        "water": 2
      },
      {
        "grass": 6
      },
      {
        "rock": 4
      },
      {
        "grass": 2
      }
    ],
    [
      {
        "rock": 1
      },
      {
        "grass": 10
      },
      {
        "water": 4
      },
      {
        "grass": 12
      },
      {
        "wall": 1
      },
      {
        "grass": 7
      },
      {
        "water": 2
      },
      {
        "grass": 7
      },
      {
        "rock": 3
      },
      {
        "grass": 3
      }
    ],
    [
      {
        "rock": 1
      },
      {
        "grass": 11
      },
      {
        "water": 2
      },
      {
        "grass": 13
      },
      {
        "wall": 1
      },
      {
        "grass": 6
      },
      {
        "water": 2
      },
      {
        "grass": 7
      },
      {
        "rock": 4
      },
      {
        "grass": 3
      }
    ],
    [
      {
        "rock": 2
      },
      {
        "grass": 25
      },
      {
        "wall": 1
      },
      {
        "grass": 6
      },
      {
        "water": 1
      },
      {
        "grass": 15
      }
    ],
    [
      {
        "rock": 3
      },
      {
        "grass": 24
      },
      {
        "wall": 1
      },
      {
        "grass": 7
      },
      {
        "rock": 2
      },
      {
        "grass": 13
      }
    ],
    [
      {
        "rock": 10
      },
      {
        "grass": 17
      },
      {
        "wall": 1
      },
      {
        "rock": 8
      },
      {
        "grass": 14
      }
    ]
  ]
}
const mapeo = crearMapeo(mapT);
mapeo.generar(); // genera desde mapa comprimido




function isValidNpcPosition(x, y) {
  return mapeo.isValidNpcPosition(x, y)
}
function isSolidTile(x, y) {
  return mapeo.isSolidTile(x, y)
}

function isInsideMap(x, y) {
  return mapeo.isInsideMap(x, y)
}
// === MAPA ===
function drawMap(ctx, camera, tileStyles = {}) {

  const startX = Math.floor(camera.x / mapeo.tileSize);
  const startY = Math.floor(camera.y / mapeo.tileSize);
  const endX = startX + Math.ceil(camera.w / mapeo.tileSize);
  const endY = startY + Math.ceil(camera.h / mapeo.tileSize);
  function _bucle(x, y) {
    return [x * mapeo.tileSize - camera.x, y * mapeo.tileSize - camera.y, mapeo.tileSize, mapeo.tileSize];
  }
  for (let y = startY; y < endY; y++) {

    for (let x = startX; x < endX; x++) {
      const tile = mapeo.map[y]?.[x];
      if (!tile) continue;

      const style = tileStyles[tile.type];

      if (style?.color) {
        ctx.fillStyle = style.color;
        ctx.fillRect(..._bucle(x, y));
      }


      if (style?.image) {
        ctx.drawImage(imgTile[tile.type].image, ..._bucle(x, y));
      }
      if (tile.solid) {
        ctx.strokeStyle = "#ff00004d";
        ctx.strokeRect(..._bucle(x, y));
      }
    }
  }
}

