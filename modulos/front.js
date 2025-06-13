const { createUpdate, HashEnabled } =await import(urls.online.app+'/modulos/funciones/creacion.js')
HashEnabled();
const { ab } = await import(urls.online.app+'/modulos/req/checkToken.js')
const { rutas } = await import(urls.online.app+'/modulos/enrutador/rutas.js')
const { footer } = await import (urls.online.app+'/modulos/staticDOM/footer.js');
const { header } = await import(urls.online.app+ '/modulos/staticDOM/header.js');




 await createUpdate(
    rutas,
    {
        header,
        footer
    }).then(x=>{
  console.log(x)

    function checkImages() {
        const images = Object.values(document.querySelectorAll("img")).filter(x=>x.datasrc);
        
        images.forEach(img => {
            
            if(!!img.datasrc){
                console.log(img["datasrc"])
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.src = img.datasrc;
               delete img["datasrc"];
            }
           
        }
        console.log(images.length===0)
        if(images.length===0){
            window.removeEventListener("scroll", checkImages);
            window.removeEventListener("resize", checkImages);
         }
        });
         
    }

    window.addEventListener("scroll", checkImages);
    window.addEventListener("resize", checkImages);
    checkImages(); // Ejecutar al cargar la página
    })
    
ab.fetchR
