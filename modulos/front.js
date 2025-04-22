const { createUpdate, HashEnabled } =await import('/dainnin/modulos/funciones/creacion.js')
HashEnabled();
const { ab } = await import('/dainnin/modulos/req/checkToken.js')
const { rutas } = await import('/dainnin/modulos/enrutador/rutas.js')
const { footer } =  await import ('/dainnin/modulos/staticDOM/footer.js');
const { header } = await import( '/dainnin/modulos/staticDOM/header.js');




 await createUpdate(
    rutas,
    {
        header,
        footer
    })
    
ab.fetchR
