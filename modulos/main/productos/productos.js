import { HTMLatDOM, voidElement, HTMLatObj } from "/dainnin/modulos/funciones/creacion.js"
import { $ } from '/dainnin/modulos/funciones/utilidades.js';
import { urls } from '/dainnin/modulos/env.js';
$._header.insertAdjacentElement("afterend",HTMLatDOM(`<nav id="navx">
    <div className="blurx"></div>

<div className="noblur">
    <p>Nuevos Ingresos</p>
    <p>Descubrí el próximo Funko Pop de tu colección</p>
    <div id="decoshopx">
        <p id="decoshop"> SHOP</p>
    </div></a>
</div>
    </nav>`).firstChild)

 async function crearTags ({ data, load, error, element })  {
   
   voidElement(element)
 
     if(Object.entries($.search).length===0){
        if (load) {
          element.appendChild(HTMLatDOM(`<h1>Esta cargando...</h1>`))
     } else {
 
         data.forEach(a => {
             element.appendChild(HTMLatDOM(
                 `<div>
                     <h3>${a.nombre}</h4>
                     <h4>${a.id}</h4>
                     <h5>${a.descripcion}</h4>
                 </div>
                 <div className="content">
                 </div>
 `
             )
             )
         })
     }
    }else if($.search.idu!==undefined){
        fetch('https://dainnin.github.io/proyectowebimg/inventario.json')
    .then(a=>a.json())
    .then(a=>{
       
        function randomx (obj)
    { 
      
      return obj.sort(() => 0.5 - Math.random());
    
    }
        const temp=[...a[$.search['frc']]]
        const principal=[]
        const relacionado=[]
        const tempKey=temp[0]['frc']
        temp.forEach((b,i) => {
            
            if(b.idu===$.search['idu']){
                b['frc']=tempKey
                principal.push(b)
            }else if(i!==0){
                b['frc']=tempKey
                relacionado.push(b)
            }
              
        })
        
       principal.forEach(a=>{
            console.log(a)
            document.getElementById('prsv').appendChild(HTMLatDOM(`
      <div>          
        <div>
         <div>
         <h2>${a["nompro"]}</h2>
         
         </div>
         <hr></hr>
         <p>${a["descrip"]}</p>
         </div>
         <img src="${a["imgz"]}"></img>
    </div> 
                `))
        })
        randomx(relacionado).forEach(a=>{
            
            document.getElementById('prsh').appendChild(HTMLatDOM(`
      <article>          
     <a href="/productos?idu=${a["idu"]}&frc=${$.search["frc"]}">
<img src="${a["imgz"]}"></img>
<h4>${a["frc"][1]}</h4>
<h3>${a["nompro"]}</h3>
<div>${a["precio"]}</div>
<div>${a["cuotas"]}</div>
</a>
      </article>
                `))
        })
       
        
    })
    
    
  
        
    }else if($.search.frc!==undefined){
        element.appendChild(HTMLatDOM(`<h1>Esta cargando 3...</h1>`))
    }
     if (error) {
        element.appendChild(HTMLatDOM(`<h1>$lol....${error}</h1>`))
    } 
    }
 Object.defineProperties(crearTags,{
     'url':{
         get:()=>`${urls.online.api}productos/`
     }
 })
export const productos = () => {
    return  HTMLatObj(`
        <div id="prsv" fetchEvent="crearTags||F">
    
    </div>
    <hr></hr>
    <section>
    <div id="dibx">
    <h1>Ultimos lanzamientos</h1>
    
    <div id="prsh">
    
    </div>   
    </div>
    
    </section>
    <head>
<link rel="stylesheet" href="${urls.online.app}/css/section.css"></link> 
</head>
        `)
   

};

$.referencias(crearTags)