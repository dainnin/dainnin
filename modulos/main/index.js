const { $ } =await import(`${urls.online.app}/modulos/funciones/utilidades.js`);
const { HTMLatDOM, voidElement, HTMLatObj, classOnBody } =await import(`${urls.online.app}/modulos/funciones/creacion.js`)
const { ab, setStateCheck, setStateArr } =await import(`${urls.online.app}/modulos/req/checkToken.js`)


    
export const index = () =>{
   
    fetch('https://dainnin.github.io/proyectowebimg/inventario.json')
    .then(a=>a.json())
    .then(a=>{
       
        function randomx (obj)
    { 
      
      return obj.sort(() => 0.5 - Math.random());
    
    }
        const temp={}
        const recomendados=[]
        const masVendidos=[]
        Object.values(a).forEach(b => {
            const tempKey=b[0]['frc']
            b.shift(0)
            b.forEach((c)=>{
                c['frc']=tempKey
                
            })
            temp[tempKey]=randomx(b)
            recomendados.push(temp[tempKey][0])
            temp[tempKey].shift(0) 
            masVendidos.push(... temp[tempKey])    
        })
        
        randomx(recomendados).forEach(a=>{
            
            document.getElementById('prsv').appendChild(HTMLatDOM(`
      <div>          
        <div>
            <div>
                <h2>${a["frc"][0]}</h2>
                <p>${a["descrip"]}</p>
            </div>
            <hr></hr>
            <a style="color:teal;font-size:calc(1vw + 1vh);margin:10px;" href="/productos?frc=${a["frc"][4]}" >
            ${a["linka"][0]}
            </a>
        </div>
      <img src="${a["imgz"]}"></img>

      </div>
    </div> 
                `))
        })
        randomx(masVendidos).forEach(a=>{
            
            document.getElementById('prsh').appendChild(HTMLatDOM(`
      <article>          
     <a href="/productos?idu=${a["idu"]}&frc=${a["frc"][4]}">
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
    
    
  return  HTMLatObj(`

  <nav id="navx">
     <img alt="banner con diversos funkos Pop" src="${urls.online.app}/img/funkos-banner.webp" className="blurx"></img>
    
    <div className="noblur">
        <p className="bannerTittle">Nuevos Ingresos</p>
        <p className="bannerText">Descubrí el próximo Funko Pop de tu colección</p>
        <div id="decoshopx">
            <p id="decoshop"> SHOP</p>
        </div></a>
    </div>
        </nav> <link rel="stylesheet" href="${urls.online.app}/css/nav.css"></link>
        <link rel="stylesheet" href="${urls.online.app}/modulos/css/main.css"></link>
        <link rel="stylesheet" href="${urls.online.app}/css/section.css"></link>
<div id="prsv">
</div>
<hr></hr>
<section>
<div id="dibx">
<h1>Ultimos lanzamientos</h1>
<div id="prsh">
</div>   
</div>
</section>

    `)}
    
