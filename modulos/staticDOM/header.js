const { $ } = await import(`${urls.online.app}/modulos/funciones/utilidades.js`);
const { HTMLatDOM, voidElement, HTMLatObj, classOnBody } = await import(`${urls.online.app}/modulos/funciones/creacion.js`)
const { ab, setStateCheck, setStateArr} = await import(`${urls.online.app}/modulos/req/checkToken.js`)
$._main.id = 'mainx'
$._header.id = 'headerx'
$._footer.id = 'footerx'

const crearTagsHeader = () => {

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
        ).then(a => { ab.fetchR });


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
    $.referencias(logout, xAUTO);

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


  <div>
    <p className="coa" tabIndex="0"><img id="carrito" src="https://dainnin.github.io/dainnin/img/icons/cart-icon.svg"></img></p>
    <div className="collapsemen">
      <li>Producto A - $10<button>Eliminar</button></li>
      <li>Producto B - $15<button>Eliminar</button></li>
      <li>Producto B - $15<button>Eliminar</button></li>
      <li>Producto B - $15<button>Eliminar</button></li>
      <li>Producto A - $10<button>Eliminar</button></li>
      <li>Producto B - $15<button>Eliminar</button></li>
      <li>Producto B - $15<button>Eliminar</button></li>
      <li>Producto B - $15<button>Eliminar</button></li>
      <li>Producto B - $15<button>Eliminar</button></li>
      <li>Producto A - $10<button>Eliminar</button></li>
      <li>Producto A - $10<button>Eliminar</button></li>
      <li>Producto B - $15<button>Eliminar</button></li>
      <li>Producto B - $15<button>Eliminar</button></li>
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