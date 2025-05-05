
function monitorIsConnected(element) {

  const y = new Proxy(element, {
    get(target, prop) {
      if (prop === 'target') {
        if (target.state === undefined) {
          target.state = target.isConnected

        }
        return target; // Retorna el elemento original si se accede a "target"
      }

      return target[prop]; // Para otras propiedades, delegar al elemento original
    },
    set(target, prop, value) {
      target[prop] = value;

      // Verificar manualmente si el elemento está conectado al DOM
      if (prop === 'isConnected' || document.body.contains(target)) {
        // console.log(`Elemento conectado al DOM:`, target);
      } else {

        // console.log(`Elemento NO conectado al DOM:`, target);
      }

      return true;
    }
  });
  y.state = y.isConnected//set
  setTimeout(() => { y.state = y.isConnected }, 100)
  return y//get
}

export function proxyFlex(obj, p,sp, renderFuncion) {
  const suscriptores = new Set(); // Almacenar callbacks

  // Método para agregar nuevas funciones al conjunto de suscriptores
  const suscribir = (callback) => {

    if (typeof callback === 'function' ||callback instanceof Element) {
      suscriptores.add(callback);
    }
  };

  // Método para notificar a todos los suscriptores
  const notificar = () => suscriptores.forEach((callback) => 
    callback instanceof Element?(Object.keys(callback).forEach(k=>{
    k.indexOf('AUTO')!==-1?callback[k]():''
  }))
  :
  callback());
  
  const proxy = new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value;
      
      if (prop === sp) {
       console.log(sp)
        setTimeout(()=>notificar(),325);
       
       }
      // Notifica a todos los suscriptores 
      return target[prop] ;
    }, get(target, prop) {
      // console.log(target,prop)
      if (prop === p) {
       
       setTimeout(()=>notificar(),1000);
      
      }
     
      
      return target[prop];
    }
  });
  suscribir(renderFuncion);
  // Suscribimos la función de renderizado
  return { proxy, suscribir, suscriptores };
}
export function fetchResReq({ setGlobal }) {

  if (typeof setGlobal === 'boolean' && setGlobal === true) {
    this.setGlobals = { data: null, load: true, error: null, promise: null };
    this.static = { url: '', opciones: '' };
  }
  
  // Cache temporal para reducir repetidos chequeos innecesarios
  const cacheTemp = new Map();

  this.setStatic = (url) => this.static = { url: url[0], opciones: url[1] };

  this.fetchE = async (url) => {
    
    const cacheKey = typeof url === 'object' ? JSON.stringify(url) : url;

    // Verificar si ya existe en caché
    if (cacheTemp.has(cacheKey)) {

      return cacheTemp.get(cacheKey);
    }

    let data = null;
    let isLoading = true;
    let error = null;

    try {
     
      const res = typeof url === 'object' ? fetch(url[0], url[1]) : fetch(url);

      const fetchPromise = res
        .then(resp => {
          if (!resp.ok) throw new Error(`Error: ${resp.status}`);
          return resp.json();
        })
        .then(datos => {
          if (setGlobal) {
            this.setGlobals = { data: datos, load: false, error: null, promise: null };
          }

          cacheTemp.set(cacheKey, Promise.resolve({ data: datos, isLoading: false, error: null }));
          return { data: datos, isLoading: false, error: null };
        })
        .catch(err => {
          if (setGlobal) {
            this.setGlobals = { data: null, load: false, error: err, promise: null };
          }

          cacheTemp.set(cacheKey, Promise.resolve({ data: null, isLoading: false, error: err }));
          return { data: null, isLoading: false, error: err };
        });

      cacheTemp.set(cacheKey, fetchPromise); // Almacenar la promesa en curso en el caché
      return fetchPromise;
    } catch (err) {
      isLoading = false;
      error = err;

      cacheTemp.set(cacheKey, Promise.resolve({ data: null, isLoading: false, error: err }));
      return { data: null, isLoading: false, error: err };
    } finally {
      setTimeout(() => cacheTemp.clear(), 1050);
    }
  };

  Object.defineProperties(this, {
    'fetchR': {
      get: async () => {
        
        const { url, opciones } = this.static;

        let data = null;
        let isLoading = true;
        let error = null;

        try {
          // Siempre forzar una nueva solicitud
          const res = await fetch(url, opciones);
          Object.assign(this.setGlobals,{res:res.ok})
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          data = await res.json();
          
          // Actualizar el estado global

          if (setGlobal) {
            
            Object.assign(this.setGlobals, { data, load: false, error: null, promise: null });
            
          }
          
          return { data, load: isLoading=false, error: error=null };
        } catch (err) {
          
          error = err;
          isLoading = false;
          
          if (setGlobal) {
            Object.assign(this.setGlobals, { data: null, load: false, error:err });
          }
          
          return { data: null, isLoading, error:err };
        }
        
      }
    }
  });
  this.text= async (...a) => {
    let text
    try {
      const response = await fetch(...a);
      if (!response.ok) {
        throw new Error('No se encontró el archivo');
        
      }
      const data = await response.text();
      text= data;
      return text
    } catch (error) {
      console.error(error);
      return JSON.stringify({ error: error.message });
    }
  },
  // Limpiar el caché temporal automáticamente después de 5 segundos
  setTimeout(() => cacheTemp.clear(), 1050);


}

const QPPath = (req, enabled = false) => {
  const inital = { search: {}, path: '', hash: '' }
  if (req === undefined) {
    return ''
  }
  const { pathname, hash, href, origin } = req
  const texto = pathname;
  const caracter = '/';
  let posiciones = [];
  let indice = texto.indexOf(caracter);

  while (indice !== -1) {
    posiciones = (indice);
    indice = texto.indexOf(caracter, indice + 1);
  }



  if (req !== undefined) {



    if (href.includes('?') !== -1) {

      for (const a of href.substring(href.indexOf('?')).replace('?', '').split("&")) {

        const [k, v] = a.split("=")
        if (v) {
          Object.assign(inital['search'], { [k]: v })
        }
      }
    }
  }
  if (enabled) {

    hash.indexOf('#', 1) === -1 ? inital.hash = '' : inital.hash = hash.substring(hash.indexOf('#', 1))
    Object.assign(inital, {
      path: hash.indexOf('#', 1) === -1 ? hash.replace('#', '') : hash.substring(1, hash.indexOf('#', 1) - 1)
    })

  } else {
    Object.assign(inital, {
      path: pathname.length - 1 === posiciones ? (hash === '' ? pathname.substring(0, posiciones) :
        '/' + hash.substring(0, hash.indexOf('?')))
        : pathname
    })
  }
  inital.path.indexOf('?') === -1 ? '' : inital.path = inital.path.substring(0, inital.path.indexOf('?'))
  Object.assign(inital, { url: origin + inital.path, href: href, /* hash: hash.substring(0, hash.indexOf('?')) */ })


  return inital
}

export function $$() {
  const docBody = document.body;
  const doc = document;
  const docChild = docBody.children;
  this._body = docBody;
  this._doc = doc;
  this._main = docBody.children._main;
  this._header = docChild._header;
  this._footer = docChild._footer;
  this._enabled = false;
  this._referenciasInternas = [];

  // Método para agregar funciones al array de referencias
  this.referencias = (...funciones) => {
    const temp = []
    funciones.forEach((funcion) => {

      if (typeof funcion === 'function') {

        this._referenciasInternas.forEach(a => typeof a === 'function' ? temp.push(a.name) : console.log('error...'))


        // Agregar funciones al array

        temp.indexOf(funcion.name) === -1 ? this._referenciasInternas.push(funcion) : console.log('nope')
      } else {

        console.error(`"${funcion}" no es una función válida.`, error);
      }


    });
  };

  this.setData = (a, b) => {
    b = JSON.parse(JSON.stringify(b).toLocaleLowerCase())
    return Object.assign(a.dataset, b)
  }
  this.getData = (a, b) => {
    const x = b ? `[data-${a}]=${b}` : `[data-${a}]`

    return doc.querySelectorAll(x)
  }


  this.voidMain = () => {

    while (this._main.firstChild) {
      this._main.removeChild(this._main.firstChild);
    }
  }
  this.classInBody = ({ header, main, footer }) => {
    if (typeof header !== "undefined") {
      Object.assign(this._header, { className: header })
    }
    if (typeof main !== "undefined") {
      Object.assign(this._main, { className: main })
    }
    if (typeof header !== "undefined") {
      Object.assign(this._footer, { className: footer })
    }

  }

  Object.defineProperties(this, {
    'hash': {
      get: () => QPPath(location, this.enabled).hash,

    },
    'search': {
      get: () => QPPath(location, this._enabled).search,

    },
    'path': {
      get: () => QPPath(location, this._enabled).path,

    },
    'QPPath': {
      get: () => QPPath,

    },
    'HashEnabled': {
      get: () => {
        const { hash, pathname } = location;
        this._enabled ? this._enabled = false : this._enabled = true
        hash === '' ? (() => {
          location.hash += '#/';

        })() : ''
      },
    },
    'test': {
      get: () => fetchResReq
    },
    'ProxyElement': {
      get: () => monitorIsConnected
    }
  })



}
export const $ = new $$()
const maped = (config) => {

  try {
    Object.entries(config)
  }
  catch {

  }
  return Object.entries(config).map(([x, c]) => {

    const b = { ...c }

    typeof b !== null ? delete b.children : ""
    const props = b

    const children = c !== null ? c.children : c.children = []
    const EspecialAttr = [
      "innerText", "textContent"
    ]
    EspecialAttr.find(a => {
      if (props.hasOwnProperty(a)) {
        if (Array.isArray(children)) {
          children.unshift(props[a])
          delete props[a]
        }

      }
    })
    if (x !== "#text") {
      return { type: x, props: props, children: children }
    }


  }).at()

}


export const atest = (a, b = null) => {


  
  if (!window) {
    const remap = Object.entries(a).map(([x, c]) => {

      const b = { ...c }
      delete b.children
      const props = b
      const children = c.children
      return { type: x, props: props, children: children }

    }
    )

    const cElement = (config) => {


      const eTag = {
        "Link": Link,
        "Imagen": Imagen,
        "Head": Head,
        "Script": Script,
        "NextScript": NextScript,
      }
      let remap

      const maper = (rmap) => rmap.children.map(child =>
        typeof child === 'string' ? child === null ? "" : child : cElement(child))
      const Especials = () => {
        //Especials tag
        return React.createElement(eTag[remap.type],
          remap.props, ...(remap.children && remap.children.at() ? maper(remap) : []))
      }
      remap = maped(config)
      if (!Array.isArray(config) && remap) {


        if (eTag[remap.type]) {

          return Especials()
        }

        return React.createElement(
          remap.type,
          remap.props,
          ...(remap.children && remap.children.at() ? maper(remap) : [])
        );
      } else {

        const t = config.map((a, i) => {

          remap = maped(a)
          if (eTag[remap.type]) {
            return Especials()
          }

          return React.createElement(
            remap.type,
            remap.props,
            ...(remap.children ? maper(remap) : [])
          )

        }
        )
        return React.createElement("div", null, t)
      }



    }
  }


  const fargment = $._doc.createDocumentFragment()

  const createElementsFromConfig = (config, parent = null) => {

    Array.isArray(config) ? config : config = [config]
    config.forEach(item => {


      if (typeof item === "string") {

        const element = document.createTextNode(item)


        if (parent) {

          return parent.appendChild(element);

        }
      } else {

        if (item !== undefined) {
          Object.entries(item).forEach(([tagName, attributes]) => {

            const element = document.createElement(tagName)
            
            const x = { ...attributes }
            Object.keys(x).forEach((i) => {
             
              if (typeof x[i] === 'string' && x[i].length - 3 === x[i].indexOf('||F')) {

                $._referenciasInternas.forEach((p, m) => {
                  typeof x[i] === 'string' && p.name === x[i].replace('||F', '') ? x[i] = $._referenciasInternas[m] : ''
                  
                })

              }
            })
            if (x.defineProperty) {
              Object.defineProperties(element, x.defineProperty)
            }
            Object.assign(element, [x].filter(a => {
              delete a.children;
              return a.dataset ? "" : a
            })[0]
            );

            Object.assign(element.dataset, x.dataset)

            if (attributes.children) {

              createElementsFromConfig(attributes.children, element);

            }


            if (x.fetchEvent !== undefined) {
              if (Array.isArray(x.fetchEvent)) {
                (async () => {
                  if (typeof x.fetchEvent[0] === 'object' && x.fetchEvent[0].promise) {
                    const { data, isLoading, error, promise } = x.fetchEvent[0]

                    x.fetchEvent[1]({ data: data, load: isLoading, error: error, element: element, promise: promise })
                  } else {
                    const res = new fetchResReq({});
                    const { data, isLoading, error } = await res.fetchE(x.fetchEvent[0])
                    x.fetchEvent[1]({ data: data, load: isLoading, error: error, element: element })
                  }

                })()
              } else if (typeof x.fetchEvent === 'function') {
                (async () => {

                  const res = new fetchResReq({});
                  const { data, isLoading, error } = await res.fetchE(x.fetchEvent.url)
                  x.fetchEvent({ data: data, load: isLoading, error: error, element: element })
                })()
              }
            }
            Object.keys(element).forEach(a => {
                 
              a.indexOf('AUTO') === -1 ? '' : element[a]()
            })
            if (parent) {
             

              return parent.appendChild(element);

            } else {

              return fargment.appendChild(element);
            }
          })
        }
      };
    });

  };
  createElementsFromConfig(a, b)


  return fargment
};


export function parseHTML(htmlString) {
  const domTree = [];
  const tagRegex = /<\/?([a-zA-Z0-9]+)([^>]*)>|([^<]+)/g;
  const stack = [];
  let match;
  while ((match = tagRegex.exec(htmlString)) !== null) {
    const [fullMatch, tagName, attributes, textContent] = match;

    if (textContent && textContent.trim()) {

      const textNode = textContent.trim();

      if (stack.length > 0) {

        stack[stack.length - 1][Object.keys(stack[stack.length - 1])].children.push(Object.keys(stack[stack.length - 1])[0] !== 'script' ? textContent : '');
      } else {
        domTree.push(textNode);
      }
    } else if (fullMatch.startsWith('</')) {

      const closedNode = stack.pop();
      if (stack.length > 0) {
        stack[stack.length - 1][Object.keys(stack[stack.length - 1])].children.push(closedNode);
      } else {
        domTree.push(closedNode);
      }
    } else if (tagName) {
      const node = {
        [tagName]: {

          ...parseAttributes(attributes),
          children: [],
        }

      };

      stack.push(node);

    }
  }
  return domTree;


  function parseAttributes(attributeString) {
    const attributes = {};
    const attrRegex = /([a-zA-Z]+)="([^"]*)"/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attributeString)) !== null) {
      attributes[attrMatch[1]] = attrMatch[2];
    }
    return attributes;
  }
}
export const voidThis = (e, b = false) => {
  if (!b) {
    while (e.firstChild) {
      e.removeChild(e.firstChild);
    }
  } else {

  }
}




