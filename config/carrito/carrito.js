

// ✅ Estado inicial
const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
const totalGuardado = Number(localStorage.getItem("total")) || 0;

estadoGlobal.set("carrito", carritoGuardado);
estadoGlobal.set("total", totalGuardado.toFixed(2));
estadoGlobal.set("cant", carritoGuardado.length || 0);

// ✅ Agregar producto
function agregarAlCarrito(ele) {
  const nombre = getAtt(ele.parentElement, "nombre");
  const precio = getAtt(ele.parentElement, "precio").replace(",", ".");
  const carrito = estadoGlobal.get("carrito");

  carrito.push({ nombre, precio });

  const nuevoTotal = Number(estadoGlobal.get("total")) + Number(precio.replace(/[^0-9.]/g, ''));
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", nuevoTotal.toFixed(2));

  estadoGlobal.set("carrito", carrito);
  estadoGlobal.set("total", nuevoTotal.toFixed(2));
  estadoGlobal.set("cant", carrito.length);
}

// ✅ Eliminar producto
function eliminarDelCarrito(ele) {
  
  const indexE = ele.parentElement;
  const masterI = Object.values(indexE.parentElement.children).indexOf(indexE);

  const carrito = estadoGlobal.get("carrito");
  let total = Number(estadoGlobal.get("total"));

  carrito[masterI].precio ? total -= Number(carrito[masterI].precio) : total = 0;
  carrito.splice(masterI, 1);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", total.toFixed(2));

  estadoGlobal.set("carrito", carrito);
  estadoGlobal.set("total", total.toFixed(2));
  estadoGlobal.set("cant", carrito.length || 0);
}

// ✅ Renderizar carrito
function actualizarCarrito() {
  
  const listaCarrito = document.getElementById("carrito");
  const precioT=document.createElement("div")
  
  if (!listaCarrito) return setTimeout(actualizarCarrito,250);
  
  listaCarrito.innerHTML = "";
  let total = 0;

  const carrito = estadoGlobal.get("carrito");
  
  carrito.forEach((item) => {
    total += Number(item.precio);

    const span = document.createElement("span");
    span.innerHTML = `
      ${item.nombre} $${item.precio}
      <br>
      <button class="carDel">Eliminar</button>
      <hr>
    `;

    listaCarrito.appendChild(span);
   
  });
 if(carrito && carrito.length>0 && 
  !document.getElementById("precioT")) listaCarrito.insertBefore(precioT, listaCarrito.firstChild);
  precioT.innerHTML=`<h3 style="color:red;">Total a pagar $${total.toFixed(2)}</h3><hr>` 
  precioT.id="precioT"
  const carp = document.getElementById("totalProd");
 
  if (carp) carp.textContent =carrito.length;

  localStorage.setItem("total", total.toFixed(2));
  estadoGlobal.set("total", total.toFixed(2));
}

// ✅ Observadores
estadoGlobal.observar((clave, valor) => {
  if (clave === "cant") {
    const el = document.getElementById("totalProd");
    if (el) el.textContent = valor;
  }

  if (clave === "carrito") {
    actualizarCarrito();
  }
});
(function(){
 setTimeout(()=>document.getElementById("carrito").addEventListener("click", function (event) {
  
    if(event.target.closest(".carDel")){
      
  eliminarDelCarrito(event.target);
     }
    }),55)
  ;}
)()

actualizarCarrito()
