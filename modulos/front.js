const { createUpdate, HashEnabled,checkImages } =await import(urls.online.app+'/modulos/funciones/creacion.js')
HashEnabled();
const { ab } = await import(urls.online.app+'/modulos/req/checkToken.js') 
const { rutas } = await import(urls.online.app+'/modulos/enrutador/rutas.js')
const { footer } = await import (urls.online.app+'/modulos/staticDOM/footer.js');
const { header } = await import(urls.online.app+ '/modulos/staticDOM/header.js');
console.log('ok mmmm',checkImages)



 await createUpdate(
    rutas,
    {
        header,
        footer
    }).then(()=>{
          
    window.addEventListener("scroll", checkImages);
    window.addEventListener("resize", checkImages);
    
    })
    
ab.fetchR
