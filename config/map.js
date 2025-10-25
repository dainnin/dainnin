const mapeo = new function () {
  const _this = this;
  this.map = [];
  this.obstacles = {};
  const data = {
    tileSize: 48,
    mapWidth: 10500,
    mapHeight: 1250,
  }
  Object.defineProperties(this, {
    _map: {
      get: function () {
        return data
      },
      set: function (config) {
        Object.assign(data, config)

      }
    },
    tileSize: { get: function () { return data.tileSize } },
    mapWidth: { get: function () { return data.mapWidth } },
    mapHeight: { get: function () { return data.mapHeight } },

  })
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




  function actualizarObstaculosDesdeMapa() {

    for (let x = 0; x < data.mapWidth; x++) {
      _this.obstacles[x]=_this.obstacles[x]||{}
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
  actualizarObstaculosDesdeMapa();

  this.isSolidTile = function (x, y) {
    const tileX = Math.floor(x / data.tileSize);
    const tileY = Math.floor(y / data.tileSize);
    return _this.obstacles[tileX]?.[tileY]?.solid === true;
  }

  this.isInsideMap = function (x, y) {
    return (
      x >= 0 &&
      y >= 0 &&
      x < data.mapWidth * data.tileSize &&
      y < data.mapHeight * data.tileSize
    );
  }
  this.isValidNpcPosition = function (x, y) {
    const tileX = Math.floor(x / mapeo.tileSize);
    const tileY = Math.floor(y / mapeo.tileSize);

    // Si ya hay algo que bloquea el paso, no es válido
    if (mapeo.obstacles[tileX]?.[tileY]) return false;

    // Verificamos vecinos cardinales
    const vecinos = [
      mapeo.obstacles[tileX]?.[tileY - 1],
      mapeo.obstacles[tileX]?.[tileY + 1],
      mapeo.obstacles[tileX - 1]?.[tileY],
      mapeo.obstacles[tileX + 1]?.[tileY]
    ];

    // Si al menos uno está libre, es válido
    return vecinos.some(v => !v);
  };

}


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

