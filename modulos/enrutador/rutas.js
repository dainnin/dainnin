const { $,fetchResReq } =await import(`${urls.online.app}/modulos/funciones/utilidades.js`);
export const FETCH = new fetchResReq({})
const { HTMLatObj } =await import(`${urls.online.app}/modulos/funciones/creacion.js`)


export const rutas = {
    "/":{
        componente: 'index',
        urlModulo: '/modulos/main/index.js',
    },

    "productos": {
        componente: 'productos',
        urlModulo: '/modulos/main/productos/productos.js',
    },
    "testText": HTMLatObj(await FETCH.text('/modulos/test.html')),
    "404": HTMLatObj(
        `<div>
       <h1 className="titulo"><a href="/" >Inicio </a></h1>
       <hr></hr>
      <h2>Página no encontrada</h2>
      <p>La página que estás buscando no existe. Por favor, verifica la URL e intenta nuevamente.</p>
    </div>
`),
    "1": HTMLatObj(
        `<div class="productos">
    <div class="producto">
        <p>Producto A</p>
        <p>Precio: $10</p>
        <button id="b1">Añadir al carrito</button>
    </div>
    <div class="producto">
        <p>Producto B</p>
        <p>Precio: $15</p>
        <button id="b2">Añadir al carrito</button>
    </div>
</div>

<div class="carrito">
    <h3>Carrito de Compras</h3>
    <ul id="lista-carrito"></ul>
    <p>Total: $<span id="total"></span></p>
</div>

<style>
main *{font-size: 25px;}
.productos, .carrito {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
}

.producto {
    margin-bottom: 10px;
}

button {
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
}
</style>

<script src="${urls.online.app}/modulos/testC.js">

</script>

`),
    "login": {
        componente: 'LoginForm',
        urlModulo: '/modulos/main/login.js'
    },
}
