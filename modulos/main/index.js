const { $,xhrFetch } =await import(`${urls.online.app}/modulos/funciones/utilidades.js`);
const { HTMLatDOM, voidElement, HTMLatObj, classOnBody } =await import(`${urls.online.app}/modulos/funciones/creacion.js`)
const { ab, setStateCheck, setStateArr } =await import(`${urls.online.app}/modulos/req/checkToken.js`)

const dat = xhrFetch('https://dainnin.github.io/proyectowebimg/inventario.json')
    .then(a => a.json())
    .then(a => {

      function randomx(obj) {

        return obj.sort(() => 0.5 - Math.random());

      }
      const temp = {}
      const recomendados = []
      const masVendidos = []
      Object.values(a).forEach(b => {
        const tempKey = b[0]['frc']
        b.shift(0)
        b.forEach((c) => {
          c['frc'] = tempKey

        })
        temp[tempKey] = randomx(b)
        recomendados.push(temp[tempKey][0])
        temp[tempKey].shift(0)
        masVendidos.push(...temp[tempKey])
      })

      dat.temp = [randomx(recomendados).map(a => {

        return (`
      <div>          
        <div>
            <div>
                <p className="h2">${a["frc"][0]}</p>
                <p>${a["descrip"]}</p>
            </div>
            <hr></hr>
            <a style="color:teal;font-size:calc(1vw + 1vh);margin:10px;" href="/productos?frc=${a["frc"][4]}" >
            ${a["linka"][0]}
            </a>
        </div>
      <img src="${a["imgz"]}"></img>

      </div>
   
                `)
      }).join(""),
      randomx(masVendidos).map(a => {

        return (`
      <article>          
     <a href="/productos?idu=${a["idu"]}&frc=${a["frc"][4]}" >
<img src="${a["imgz"]}"></img>
<p className="h4">${a["frc"][1]}</p>
<p className="h3">${a["nompro"]}</p>
<div>${a["precio"]}</div>
<div>${a["cuotas"]}</div>
</a>
      </article>
                `)
      }).join("")
      ]

      return dat.temp
    }
    )
 
 
    const index = () => {



    function asd() {
      this.media = "all"
    }

    $.referencias(asd);

    return HTMLatObj(`

  <nav  id="navx">
     <img onAppend="" alt="banner con diversos funkos Pop" datasrc="${urls.online.app + "/img/funkos-banner.webp"}" className="blurx"></img>
    
    <div className="noblur">
        <p  className="bannerTittle">Nuevos Ingresos</p>
        <p className="bannerText">Descubrí el próximo Funko Pop de tu colección</p>
        <div id="decoshopx">
            <p id="decoshop"> SHOP</p>
        </div></a>
    </div>
        </nav> <link rel="stylesheet" media="print" onloadAUTO="asd||F" href="${urls.online.app}/css/nav.css"></link>
        <link rel="stylesheet" href="${urls.online.app}/modulos/css/main.css"></link>
        <link rel="stylesheet" href="${urls.online.app}/css/section.css"></link>
<div id="prsv" onAppend="prsv||F">
cargando
</div>
<hr></hr>
<section>
<div id="dibx">
<p className="h1">Ultimos lanzamientos</p>
<div id="prsh" onAppend="prsh||F">
cargando
</div>   
</div>
</section>
<style>
 .h1,.h2,.h4{  
 font-weight: 1100 !importan;
 }
 #dibx .h1{
font-size: calc(2rem + 1.5vw);
grid-column-start: 2;
   grid-column-end: 3;
}
#prsv .h2{
font-size: calc(1rem + 2vw);
}
#prsh a .h3{
font-weight: var(--font-bold);
    font-size: calc(1.25rem + 0.6vw);
}
#prsh a .h4{
font-size: calc(1.5rem + 0.8vw);
}
</style>
    `, {
      prsv: function ({ nodo }) {

        nodo.textContent = ""

        return dat.then(a => { nodo.appendChild(HTMLatDOM(dat.temp[0])) })
      },
      prsh: function ({ nodo }) {
        nodo.textContent = ""

        return dat.then(a => {

          nodo.appendChild(HTMLatDOM(dat.temp[1]))
        })
      }
    })
  }
 
    

export {index}
