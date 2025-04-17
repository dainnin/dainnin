import { $ } from '/dainnin/modulos/funciones/utilidades.js';
import { HTMLatDOM, voidElement, HTMLatObj, classOnBody } from "/dainnin/modulos/funciones/creacion.js"
import { ab, setStateCheck, setStateArr } from "/dainnin/modulos/req/checkToken.js"
document.head.appendChild(HTMLatDOM( 
    `    
    <link rel="stylesheet" href="https://dainnin.github.io/dainnin/css/nav.css"></link>
    <link rel="stylesheet" href="https://dainnin.github.io/dainnin/css/main.css"></link>
    <link rel="stylesheet" href="https://dainnin.github.io/dainnin/css/footer.css"></link>
    <link rel="stylesheet" href="/dainnin/modulos/staticDOM/css/header.css"></link> 
    <link rel="stylesheet" href="https://dainnin.github.io/dainnin/css/principal.css"></link> 
    
     `   

))
$._main.id='mainx'
$._header.id='headerx'
$._footer.id='footerx'
const crearTagsHeader = () => {

    return HTMLatObj(`
   
     <a href="/">
        <img className="logo" id="loghr" alt="" src="https://dainnin.github.io/dainnin/img/branding/logo_light_horizontal.svg"></img>
     </a>
        <div id="menuhr" className="menuMD">
                <div>     
                <p className="coa x1" tabIndex="0">shop</p>
                <div className="collapsemen x1" >
                <a href="/" >Novedades</a>
                <a href="/sectores/shop">Categoria</a>
                <a href="/ds">Mas Vendidos</a>
                 </div>
               </div> 
                <p className="coa x2" tabIndex="0"> Contacto
                <div className="collapsemen x1">
                <a href="/">Novedades</a>
                <a href="/sectores/shop">Categoria</a>
                <a href="/ds">Mas Vendidos</a>
                 </div>
                </p>
                <p className="coa x3" tabIndex="0">Ingresar </p>
                <p><img id="carrito" src="https://dainnin.github.io/dainnin/img/icons/cart-icon.svg"></img></p>
            
        
        </div>

     
  `)

}
/* classOnBody({ header: "flexAround"}) */

// async function fetchHeader() {
//     const element = this || document.getElementById('menuHeader')
//     let qwe = false

//     if (!qwe && element !== undefined) {
//         setStateArr.forEach(a => {

//             element instanceof Element && a === element.fetchAUTO ? qwe = true : ''
//         });
//         setStateCheck(element.fetchAUTO)
//     }

//     async function logout() {
        
//         const req = new $.test({});
//         req.fetchE([
//             "http://localhost:3069/api/logout",
//             {
//                 "headers": {
//                     'Accept': 'application/json, text/plain, */*',
//                     'Content-Type': 'application/json'

//                 },
//                 mode: 'cors',
//                 credentials: "include",
//             }
//         ]).then(a=>{ab.fetchR});
       

//     }
//     $.referencias(logout);
    
//     voidElement(element);
     
//     element.appendChild(
//         HTMLatDOM(`
//                     <li data-key="1"><a href="/productos">Productos</a></li>
//                     <li key="4"><a href="/login">Iniciar Sesion</a></li>
//                     <li><a href="/registro">Unirte</a></li>
//                 `)
//     );
    
    
//     setTimeout( ()=>{
            
//             if(ab.setGlobals.data){
//             $.path==='/login'?location.hash='/':''
//                 voidElement(element);
//             element.appendChild(
//                 HTMLatDOM(`
//             <li data-key="1"><a href="/productos">Productos</a></li>
//             <li key="3"><a href="/profile">Perfil</a></li>
//             <li><a href="/settings">Configuración</a></li>
//             <li><a href="/" onclick="logout||F">Cerrar sesión</a></li>
//         `)
//             );
//         }
//         },300)

// }
// async function fetchAvatar() {
//     const element = this || document.getElementById('Avatar')
//     let qwe = false
    
//     if (!qwe && element !== undefined) {
//         setStateArr.forEach(a => {

//             element instanceof Element && a === element.fetchAUTO ? qwe = true : ''
//         });
//         setStateCheck(element.fetchAUTO)
//     }
   
    
   
//     voidElement(element);
    
//        setTimeout(()=> {if(ab.setGlobals.data){
           
//     voidElement(element);
//             element.appendChild( HTMLatDOM(`
//             <h3>
//             User: ${ab.setGlobals.data.user}
//             </h3>
//             <h4>
//             Mail: ${ab.setGlobals.data.email}
//             </h4>
//         `))
    
// }},300)
    
// }


// $.referencias(fetchHeader,fetchAvatar)


export const header = crearTagsHeader();
