// ✅ Estado inicial
const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
const totalGuardado = Number(localStorage.getItem("total")) || 0;

estadoGlobal.set("carrito", carritoGuardado);
estadoGlobal.set("total", totalGuardado.toFixed(2));
estadoGlobal.set("cant", carritoGuardado.length || -1);

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
  estadoGlobal.set("cant", carrito.length || -1);
}

// ✅ Renderizar carrito
function actualizarCarrito() {
  
  const listaCarrito = document.getElementById("carrito");
  
  if (!listaCarrito) return setTimeout(actualizarCarrito,250);

  listaCarrito.innerHTML = "";
  let total = 0;

  const carrito = estadoGlobal.get("carrito");
  
  carrito.forEach((item, index) => {
    total += Number(item.precio);

    const span = document.createElement("span");
    span.innerHTML = `
      ${item.nombre} $${item.precio}
      <br>
      <button>Eliminar</button>
      <hr>
    `;
    span.querySelector("button").addEventListener("click", function () {
      eliminarDelCarrito(this);
    });

    listaCarrito.appendChild(span);
  });

  const carp = document.getElementById("totalProd");
  if (carp) carp.textContent = carrito.length;

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

actualizarCarrito()
