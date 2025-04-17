import { $, atest, parseHTML, voidThis} from 'dainnin/modulos/funciones/utilidades.js';

export const elements = (a) => atest(a);
export const HTMLatDOM = (a) => atest(parseHTML(a));
export const HTMLatObj = parseHTML;
export const voidElement = voidThis;
export const HashEnabled = (() => $.HashEnabled);
export const classOnBody = $.classInBody;
export const createUpdate = async (e, b) => {

    
    const createUpdateX = async (e) => {
        
        try {


           
            if ($.hash !== '' && $.path.replace('/', '') === '') {

                $.voidMain()
                $._main.appendChild(await importMod(await e[$.hash.replace('#', '')]))

            } else if ($.hash === "" && $.path.replace('/', '') !== '' && e[$.path.replace('/', '')] !== undefined) {

                $.voidMain()
                $._main.appendChild(await importMod(await e[$.path.replace('/', '')]))


            } else if ($.hash === "" && ($.path === '/' || $.path === '')) {

                $.voidMain()
                $._main.appendChild(await importMod(await e[$.path]))

            } else {

                $.voidMain()
                typeof e['404'] === 'function' ? await e['404']() : $._main.appendChild(await importMod(await e['404']))
            }
        } catch (ee) {
            console.error('Jajaja no anda che', $._referenciasInternas, ee)
            $.voidMain()
            typeof e[404] === 'function' ? await e['404']() : $._main.appendChild(await importMod(await e[404]))
        }
    }

    
   
   
    $._body.addEventListener("click", (event) => {
        const Target = event.target
        const Father = Target.parentNode
        const eTag = Target.tagName
        const eHref = Target.href
        
        if (eTag === 'A' || Father.tagName === 'A') {
            
            event.preventDefault()
            if (Father.tagName === 'A' && eHref !== location.href && eHref !== $.QPPath(location, true).url) {
                
                location.hash = `${Father.href.replace(location.origin, '')}`
                    
            }
            if (eTag === 'A' && eHref !== location.href && eHref !== $.QPPath(location, true).url) {
                
                location.hash = `${eHref.replace(location.origin, '')}`
                    
            }
           
        }
    })
    window.addEventListener('hashchange',async(ty)=>{
        
        await createUpdateX(e)
     });
    if (b.header) {
        (async () => $._header.appendChild(await importMod(b.header)))()
    }
    if (b.footer) {

        (async () => $._footer.appendChild(await importMod(b.footer)))()
    }

    await createUpdateX(e)

}
// Nueva función para manejar la importación dinámica y el uso de atest
async function importMod(element) {
    
   
    if (Array.isArray(element)) {
        return atest(element);
         // Tomamos el primer objeto del array
       
    } else if (typeof element === 'object' && element.urlModulo) {
        // Si el elemento procesado es un objeto con `urlModulo`, manejarlo aquí también
        
        const modulo = await import(location.origin+element.urlModulo);
        
        if (typeof modulo[element.componente] === 'function') {
            return await atest(modulo[element.componente]());
        }
    }
    
    // Si no es ni array ni objeto con urlModulo, devolvemos el elemento procesado normalmente
   
}
export function deepFreeze(obj) {
    // Congelar el objeto actual
    Object.freeze(obj);

    // Recorrer las propiedades del objeto
    Object.getOwnPropertyNames(obj).forEach(function (prop) {
        // Si la propiedad es un objeto y no está congelada, lo congelamos recursivamente
        if (
            typeof obj[prop] === "object" &&
            obj[prop] !== null &&
            !Object.isFrozen(obj[prop])
        ) {
            deepFreeze(obj[prop]);
        }
    });

    return obj; // Devolver el objeto congelado
}
