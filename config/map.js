function crearMapeo() {
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

  _this.generar = function (mapaPredefinido = null) {
    if (mapaPredefinido?.tiles) {
      generarDesdeMapaPredefinido(mapaPredefinido);
    } else {
      generarAleatorio();
    }
  };

  return _this;
}



const mapeo = crearMapeo();
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


function cerrarPrompt() {
  const contenedor = document.getElementById("promptOverlay");
  if (contenedor) contenedor.remove();
}

function mostrarSelectorDeMapas(listaArchivos) {
  const contenedor = document.createElement("div");
  contenedor.id = "promptOverlay";
  contenedor.style = `
    position: fixed;
    top: 10vh;
    left: 10vw;
    width: 80vw;
    height: 80vh;
    background: rgba(0,0,0,0.85);
    color: white;
    z-index: 99999999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-family: sans-serif;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
  `;

  const lista = listaArchivos
    .filter(item => item.name.endsWith(".json"))
    .map(item => `<option value="https://dainnin.github.io/${item.path}">${item.name}</option>`)
    .join("");

  contenedor.innerHTML = `
    <div style="margin-bottom: 20px; font-size: 1.2em;">Seleccioná un mapa para cargar</div>
    <select id="selectorMapa" style="width: 60%; padding: 10px; font-size: 1em;">
    <option value="ramdon">Aleatorio Generado</option>
      ${lista}
    </select>
    <button id="btnAceptarMapa" style="margin-top: 20px; padding: 10px 20px;">Aceptar</button>
  `;

  document.body.appendChild(contenedor);

  document.getElementById("btnAceptarMapa").onclick = () => {
    const url = document.getElementById("selectorMapa").value;
    if(url==="ramdon"){
       mapeo.generar();
       cerrarPrompt();
       GenerarNpc()
       return
    }
    fetch(url)
      .then(res => res.json())
      .then(json => {
       
       
        mapeo.generar(json);
        cerrarPrompt();
        GenerarNpc()
      })
      .catch(err => {
        alert("Error al cargar el mapa seleccionado");
        cerrarPrompt();
        GenerarNpc()
      });
  };
}

// 🔁 Cargar lista de mapas desde GitHub
fetch("https://api.github.com/repos/dainnin/dainnin.github.io/contents/assets/maps")
  .then(res => res.json())
  .then(lista => {
    
    mostrarSelectorDeMapas(lista)
  })
  .catch(err => {
    console.warn("No se pudo cargar lista de mapas, generando aleatorio");
  
    mapeo.generar();
    GenerarNpc()
  });

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