const { createUpdate, HashEnabled } =await import(urls.online.app+'/modulos/funciones/creacion.js')
HashEnabled();
const { ab } = await import(urls.online.app+'/modulos/req/checkToken.js')
const { rutas } = await import(urls.online.app+'/modulos/enrutador/rutas.js')
const { footer } = await import (urls.online.app+'/modulos/staticDOM/footer.js');
const { header } = await import( urls.online.app+'/modulos/staticDOM/header.js');




 await createUpdate(
    rutas,
    {
        header,
        footer
    })
    
ab.fetchR
