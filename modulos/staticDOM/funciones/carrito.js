const { upDataCarro, setCarroSus } = await import(`${urls.online.app}/modulos/req/localStorage.js`)
const { HTMLatDOM} = await import(`${urls.online.app}/modulos/funciones/creacion.js`)
const { $ } = await import(`${urls.online.app}/modulos/funciones/utilidades.js`);
let carrito = [];
let total = 0;

export const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
const totalGuardado = Number(localStorage.getItem('total')) || 0;
total = totalGuardado.toFixed(2); // Restaurar total
carrito = carritoGuardado; // Restaurar carrito


export function eliminarDelCarrito() {

const indexE=this.parentElement
const masterI=Object.values(indexE.parentElement.children).indexOf(indexE)


carrito[masterI].precio?total -= Number(carrito[masterI].precio):total=0;

  carrito.splice(masterI, 1);

  // Actualizar en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  localStorage.setItem('total', Number(total).toFixed(2));

  upDataCarro.cant=carrito.length||-1
  
}
export function actualizarCarrito() {
  
  const listaCarrito = this || document.getElementById('carrito');
  
  total = 0

  listaCarrito.innerHTML = '';
 
  (JSON.parse(localStorage.getItem("carrito"))||carrito).forEach((item, index) => {

    total += Number(Number(item.precio).toFixed(2))
     
    // Botón para eliminar producto
    
    listaCarrito.appendChild(HTMLatDOM(`
        <span>
        ${item.nombre} $${item.precio}
        <br></br>
        <button onclick="eliminarDelCarrito||F">Eliminar</button>
        <hr></hr>
        </span>
      `));
      
  });
 
  
  const carp = document.getElementById('totalProd')
  carp !== (undefined || null) ? carp.textContent = (JSON.parse(localStorage.getItem("carrito"))||carrito).length : ''
  localStorage.setItem('total', Number(total).toFixed(2));
  
}
setCarroSus(actualizarCarrito)
export function agregarAlCarrito() {

  const nombre = this.parentElement.nombre;
  const precio = this.parentElement.precio.replace(",", ".");
  carrito.push({ nombre, precio });

  total += Number(precio.replace(/[^0-9.]/g, '')).toFixed(2);

  // Guardar en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  localStorage.setItem('total', Number(total).toFixed(2));
  upDataCarro.cant=JSON.parse(localStorage.getItem("carrito")).length
  
}
