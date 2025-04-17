

import { createUpdate, HashEnabled } from '/dainnin/modulos/funciones/creacion.js'
    import { rutas } from '/dainnin/modulos/enrutador/rutas.js' 
import { footer } from '/dainnin/modulos/staticDOM/footer.js';
 import { header } from '/dainnin/modulos/staticDOM/header.js';


 HashEnabled();


    
        await createUpdate(
    rutas,
    {
       header,
         footer  })
                         
