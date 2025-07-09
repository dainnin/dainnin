
const { $, atest, parseHTML, voidThis} =await import(`${urls.online.app}/modulos/funciones/utilidades.js`);

export const elements = (a) => atest(a);
export const HTMLatDOM = (a) => atest(parseHTML(a));
export const HTMLatObj = parseHTML;
export const voidElement = voidThis;
export const HashEnabled = (() => $.HashEnabled);
export const classOnBody = $.classInBody;
const importMod = function (element) {
    if (Array.isArray(element)) {
        return Promise.resolve(atest(element)); 
    } else if (typeof element === 'object' && element.urlModulo) {
        // Import dinámico con concatenación, pero usando Promesas en lugar de async/await
        return import(urls.online.app + element.urlModulo)
            .then(modulo => {
                if (typeof modulo[element.componente] === 'function') {
                    return atest(modulo[element.componente]());
                }
                return Promise.reject(new Error('El componente no es una función'));
            });
    }
    
}
export const checkImages = function () {
        const images = Object.values(document.querySelectorAll("img")).filter(x=>x.datasrc);
        
        images.forEach(img => {
            
            if(!!img.datasrc){
                
            const rect = img.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.src = img.datasrc;
               delete img["datasrc"];
            }
           
        }
        
        
        });
         
    }
    
export const createUpdate = async (e, b) => {

    function createUpdateX(e) {
    return new Promise((resolve, reject) => {
        try {
            $.voidMain();

            let targetModule;
            if ($.hash !== '' && $.path.replace('/', '') === '') {
                targetModule = e[$.hash.replace('#', '')];
            } else if ($.hash === "" && !!e[$.path.replace('/', '')]) {
                targetModule = e[$.path.replace('/', '')];
            } else if ($.hash === "" && ($.path === '/' || $.path === '')) {
                targetModule = e[$.path];
            } else {
                targetModule = e['404'];
            }

            importMod(targetModule)
                .then(fff => {
                    $._main.appendChild(fff);
                    return checkImages();
                })
                .then(resolve)
                .catch(reject);
        } catch (error) {
            console.error("Error en actualización:", error);
            reject(error);
        }
    });
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
    window.addEventListener('hashchange',async()=>{
        
         createUpdateX(e).then(()=>checkImages())
     });
    if (b.header) {
       
            importMod(b.header).then((fff)=>{
                $._header.appendChild(fff)
                
            }).then(()=>checkImages())
          
      
    }
    if (b.footer) {

        importMod(b.footer).then((fff)=>{
                $._footer.appendChild(fff)
                
            }).then(()=>checkImages())
    }

     createUpdateX(e).then(()=>checkImages())

}



// Uso con .then():

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
