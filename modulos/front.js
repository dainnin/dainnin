import { createUpdate, HashEnabled } from "https://dainnin.github.io/dainnin/modulos/funciones/creacion.js";
import { rutas } from "https://dainnin.github.io/dainnin/modulos/enrutador/rutas.js";
import { footer } from "https://dainnin.github.io/dainnin/modulos/staticDOM/footer.js";
import { header } from "https://dainnin.github.io/dainnin/modulos/staticDOM/header.js";
alert()
HashEnabled();

await createUpdate(
    rutas,
    {
        header: header,
        footer: footer,
    }
);
