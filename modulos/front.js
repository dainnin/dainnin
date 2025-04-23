const { createUpdate, HashEnabled } =await import('/modulos/funciones/creacion.js')
HashEnabled();
const { ab } = await import('/modulos/req/checkToken.js')
const { rutas } = await import('/modulos/enrutador/rutas.js')
const { footer } = await import ('/modulos/staticDOM/footer.js');
const { header } = await import( '/modulos/staticDOM/header.js');




 await createUpdate(
    rutas,
    {
        header,
        footer
    })
    
ab.fetchR
