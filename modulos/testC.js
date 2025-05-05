const { setCarroSus } = await import(`${urls.online.app}/modulos/req/localStorage.js`)
const { HTMLatObj, HTMLatDOM } = await import(`${urls.online.app}/modulos/funciones/creacion.js`)
const { $ } = await import(`${urls.online.app}/modulos/funciones/utilidades.js`);

let total = 0;

// Cargar carrito desde localStorage al iniciar
let carrito = []
const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];

carrito = carritoGuardado; // Restaurar carrito


function actualizarCarrito2() {


    const listaCarrito = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total');
    const totalGuardado = parseInt(localStorage.getItem('total')) || total;
    total = totalGuardado;
    if (listaCarrito && totalElemento) {
        listaCarrito.innerHTML = ''; // Limpia la lista
        (JSON.parse(localStorage.getItem("carrito")) || carrito).forEach((item, index) => {

            listaCarrito.appendChild(HTMLatDOM(`
 <li> ${item.nombre} $${item.precio}
  <br></br>
    
 <button onclick="eliminarDelCarrito||F">Eliminar</button>
 <hr></hr>
 </li>
`));
        });

        totalElemento.textContent = (JSON.parse(localStorage.getItem("carrito")).length !== 0) ? total : 0; // Actualiza el total
    } else {

        setTimeout(actualizarCarrito2, 333)
    }

}



// Asignar funcionalidad a los botones
$.referencias(actualizarCarrito2)
setCarroSus(actualizarCarrito2)

export const t1 = () => HTMLatObj(
    `<div class="productos">
<div class="producto"  precio="${Math.ceil(Math.random() * 999999)}" nombre="${"pro"}">
    <p>Producto A</p>
    <p>Precio: $10</p>
    <button id="b1" onclick="agregarAlCarrito||F">Añadir al carrito</button>
</div>
<div class="producto" precio="${Math.ceil(Math.random() * 999999)}" nombre="${"nompro"}">
    <p >Producto B </p>
    <p >Precio: $15</p>
    <button id="b2" onclick="agregarAlCarrito||F">Añadir al carrito</button>
</div>
</div>

<div class="carrito">
<h3>Carrito de Compras</h3>
<ul carAUTO="actualizarCarrito2||F" id="lista-carrito"></ul>
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
background-color:rgb(${Math.ceil(Math.random() * 99) + 111},${Math.ceil(Math.random() * 99)},${Math.ceil(Math.random() * 99) + 50});
color: white;
border: none;
padding: 5px 10px;
border-radius: 5px;
}
</style>

<script type="module" src="${urls.online.app}/modulos/testC.js">

</script>
<script src="${urls.online.app}/modulos/asd.js">

</script>

`)
