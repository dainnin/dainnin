import { $,fetchResReq } from '/dainnin/modulos/funciones/utilidades.js';
export const FETCH = new fetchResReq({})
import { HTMLatObj } from "/dainnin/modulos/funciones/creacion.js"
import { urls } from '/dainnin/modulos/env.js';

export const rutas = {
    "/":{
        componente: 'index',
        urlModulo: `/modulos/main/index.js`,
    },

    "productos": {
        componente: 'productos',
        urlModulo: `${urls.online.app}/modulos/main/productos/productos.js`,
    },
    
    "404": HTMLatObj(
        `<div>
       <h1 className="titulo"><a href="/" >Inicio </a></h1>
       <hr></hr>
      <h2>Página no encontrada</h2>
      <p>La página que estás buscando no existe. Por favor, verifica la URL e intenta nuevamente.</p>
    </div>
`),
    "1": HTMLatObj(
        `<div>  
       
            <h3>otro test ;)</h4>
            <h4>$Son todos pruebas y no de embarazo</h4>
            <h5>asdasdas</h4>
               
        </div>
`),
    "login": {
        componente: 'LoginForm',
        urlModulo: `${urls.online.app}/modulos/main/login.js`
    },
}
