const { HTMLatDOM, voidElement, HTMLatObj } = await import(`${urls.online.app}/modulos/funciones/creacion.js`)
const { ab, setStateCheck, setStateArr} = await import(`${urls.online.app}/modulos/req/checkToken.js`)
$._main.id = 'mainx'
$._header.id = 'headerx'
$._footer.id = 'footerx'

const crearTagsHeader = () => {

  let carrito = [];
  let total = 0;
  
const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
const totalGuardado = Number(localStorage.getItem('total')) || 0;
carrito = carritoGuardado; // Restaurar carrito
total = totalGuardado.toFixed(2); // Restaurar total

  function eliminarDelCarrito(index) {
    total -= Number(carrito[index].precio);
    carrito.splice(index, 1);

    // Actualizar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', Number(total).toFixed(2));
    
    actualizarCarrito();
}
  function actualizarCarrito() {
    const listaCarrito = this||document.getElementById('carrito');
    
    total=0
    
    listaCarrito.innerHTML = ''; // Limpia la lista
    carrito.forEach((item, index) => {
      
        total+=Number(Number(item.precio).toFixed(2))
        const li = document.createElement('li');
        li.textContent = `${item.nombre} $${item.precio}`;

        // Botón para eliminar producto
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.onclick = () => eliminarDelCarrito(index);
        li.appendChild(HTMLatDOM('<br></br>'))
        li.appendChild(eliminarBtn);
        li.appendChild(HTMLatDOM('<hr></hr>'))
        listaCarrito.appendChild(li);
    });
    const carp=document.getElementById('totalProd')
    carp!==(undefined||null)?carp.textContent=carritoGuardado.length:''
    localStorage.setItem('total', Number(total).toFixed(2));
  
}
function agregarAlCarrito() {
  
  const nombre=this.parentElement.nombre;
  const precio=this.parentElement.precio.replace(",",".");
  carrito.push({ nombre, precio });
  
  total += Number(precio.replace(/[^0-9.]/g, '')).toFixed(2);

  // Guardar en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  localStorage.setItem('total', Number(total).toFixed(2));

  actualizarCarrito();
}

    async function logout() {
        
        
        fetch(
            `${urls.online.api}logout`,
            {
                "headers": {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'

                },
                mode: 'cors',
                credentials: "include",
            }
        ).then(a => { 
        alert(ab.setGlobals.data.user+" esta desconectando")
          ab.fetchR
         });


    }
    function xAUTO() {
        ![...setStateArr].includes(xAUTO) ? setStateCheck(this) : ''
        const data = ab.setGlobals.data
       
        let {user,email}=data||{user:null,email:null}
        if (this.tagName === 'A') {
            const text = data === null ? { href: "/login", textContent: "Ingresar", onclick: '' }
                :
                { onclick: logout, href: "/", textContent: "Cerrar Sesión" }
            Object.assign(this,
                text
            )
        }
        if (this.tagName === 'DIV') {

            data === null ? this.style = "display:none;" : this.style = "display:initial;"
            voidElement(this)
            this.appendChild(HTMLatDOM(`
               
                ${data !== null ? `
                    <p className="coa" tabIndex="0">${user}</p>` : ''}
                    <div className="collapsemen">
                    <p>${email}</p>
                    </div>
                
                `))
        }
        return

    }






    
    $.referencias(logout, xAUTO,actualizarCarrito,agregarAlCarrito);





    return HTMLatObj(`
   <a className="logo" href="/">
  <img className="logo" id="loghr" alt=""
    src="https://dainnin.github.io/dainnin/img/branding/logo_light_horizontal.svg"></img>
</a>
<div id="menuhr" className="menuMD">
  <div>
    <p className="coa x1" tabIndex="0">shop</p>
    <div className="collapsemen x1">
      <a href="/">Novedades</a>
      <hr>
      </hr>
      <a href="/sectores/shop">Categoria</a>
      <hr>
      </hr>
      <a href="/ds">Mas Vendidos</a>
    </div>
  </div>
  <div>
    <p className="coa" tabIndex="0"> Contacto</p>
    <div className="collapsemen x1">
      <a href="/soporte">Soporte</a>
      <hr>
      </hr>
      <a href="/help">Ayuda</a>
      <hr>
      </hr>
      <a href="/helpmy">Atencion personalizada</a>
    </div>
  </div>
  <div xAUTO="xAUTO||F">

  </div>
  <a xAUTO="xAUTO||F" className="coa"></a>


  <div><style>
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
    .carritoTotal {
  position: relative; 
  padding:0;
}



.carritoTotal b {
  position: absolute;
  bottom: 2px;
  right: -3px;
  text-align:center;
  font-size: calc(1vw + 10px) ; 
  background: rgba(125,125,125,0.6);
  border:solid 1px teal;
  border-radius:50%;
  width:calc(1vw + 10px);
  height:calc(1vw + 10px);
  color: red; 
}
</style>
    <p className="coa carritoTotal" tabIndex="0">
      <img src="https://dainnin.github.io/dainnin/img/icons/cart-icon.svg"></img>
      <b id="totalProd">${carritoGuardado.length||0}</b> 
    </p>
    <div className="collapsemen carrito" id="carrito" carroAUTO="actualizarCarrito||F">
     
    </div>
  </div>


</div>
<link rel="stylesheet" href="https://dainnin.github.io/dainnin/css/footer.css">
</link>
<link rel="stylesheet" href="${urls.online.app}/modulos/staticDOM/css/header.css">
</link>
<link rel="stylesheet" href="${urls.online.app}/modulos/css/principal.css">
</link>
     
  `)

}





export const header = crearTagsHeader();