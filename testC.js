let carrito = [];
let total = 0;

// Cargar carrito desde localStorage al iniciar

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalGuardado = parseInt(localStorage.getItem('total')) || 0;

    carrito = carritoGuardado; // Restaurar carrito
    total = totalGuardado; // Restaurar total
    
    actualizarCarrito();


function agregarAlCarrito() {
    const nombre='this.name';
    const precio=11111

    carrito.push({ nombre, precio });
    total += precio;

    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total);

    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total');

    listaCarrito.innerHTML = ''; // Limpia la lista
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio}`;

        // Botón para eliminar producto
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.onclick = () => eliminarDelCarrito(index);

        li.appendChild(eliminarBtn);
        listaCarrito.appendChild(li);
    });

    totalElemento.textContent = total; // Actualiza el total
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);

    // Actualizar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total);

    actualizarCarrito();
}

// Asignar funcionalidad a los botones
b1.onclick = function () {
    agregarAlCarrito('Producto A', 10);
};
b2.onclick = function () {
    agregarAlCarrito('Producto B', 15);
};