// const mapeo = new function () {

//     const map = [];
//     this.obstacles = [];
//     const data = {
//         tileSize: 32,
//         mapWidth: 50,
//         mapHeight: 30,
//     }
//     Object.defineProperties(this, {
//         _map: {
//             get: function () {
//                 return data
//             },
//             set: function (config) {
//                 Object.assign(data, ...config)
//                 return
//             }
//         },
//         tileSize: {get:function(){return data.tileSize}},
//         mapWidth: {get:function(){return data.mapWidth}},
//         mapHeight: {get:function(){return data.mapHeight}},

//     })
//     for (let y = 0; y < data.mapHeight; y++) {
//         const row = [];
//         for (let x = 0; x < data.mapWidth; x++) {
//             const isBorder = x === 0 || y === 0 || x === data.mapWidth - 1 || y === data.mapHeight - 1;
//             const type = isBorder ? "wall" : Math.random() < 0.1 ? "rock" : "grass";
//             const solid = isBorder || type === "rock";
//             row.push({ type, solid });
//         }
//         map.push(row);
//     }


//     // === GENERACIÓN DE OBSTÁCULOS FÍSICOS ===

//     function actualizarObstaculosDesdeMapa() {
//         this.obstacles.length = 0;
//         for (let y = 0; y < data.mapHeight; y++) {
//             for (let x = 0; x < data.mapWidth; x++) {
//                 const tile = map[y][x];
//                 if (tile.solid) {
//                     this.obstacles.push({
//                         x: x * data.tileSize,
//                         y: y * data.tileSize,
//                         w: data.tileSize,
//                         h: data.tileSize,
//                         solid: true
//                     });
//                 }
//             }
//         }
//     }
//     actualizarObstaculosDesdeMapa();

//     this.isSolidTile = function (x, y) {
//         const tileX = Math.floor(x / data.tileSize);
//         const tileY = Math.floor(y / data.tileSize);
//         return map[tileY]?.[tileX]?.solid === true;
//     }

//     this.isInsideMap = function (x, y) {
//         return (
//             x >= 0 &&
//             y >= 0 &&
//             x < data.mapWidth * data.tileSize &&
//             y < data.mapHeight * data.tileSize
//         );
//     }
// }