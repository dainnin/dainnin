
const monitorIsConnected = function (element) {

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

const proxyFlex = function (obj, p, sp, renderFuncion) {
  const suscriptores = new Set(); // Almacenar callbacks

  // Método para agregar nuevas funciones al conjunto de suscriptores
  const suscribir = function (callback)  {

    if (typeof callback === 'function' || callback instanceof Element) {
      suscriptores.add(callback);
    }
  };

  // Método para notificar a todos los suscriptores
  const notificar = () => suscriptores.forEach((callback) =>
    callback instanceof Element ? (Object.keys(callback).forEach(k => {
      k.indexOf('AUTO') !== -1 ? callback[k]() : ''
    }))
      :
      callback());

  const proxy = new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value;

      if (prop === sp) {
        
        setTimeout(() => notificar(), 5);

      }
      // Notifica a todos los suscriptores 
      return target[prop];
    }, get(target, prop) {
      // console.log(target,prop)
      if (prop === p) {

        setTimeout(() => notificar(), 10);

      }


      return target[prop];
    }
  });
  suscribir(renderFuncion);
  // Suscribimos la función de renderizado
  return { proxy, suscribir, suscriptores };
}
const fetchResReq = function ({ setGlobal }) {
  if (typeof setGlobal === 'boolean' && setGlobal === true) {
    this.setGlobals = { data: null, load: true, error: null, promise: null };
    this.static = { url: '', opciones: '' };
  }

  const cacheTemp = new Map();

  this.setStatic = (url) => {
    this.static = { url: url[0], opciones: url[1] };
  };

  const fallbackFetch = (url, options) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options?.method || 'GET', url, true);

      if (options?.headers) {
        for (const key in options.headers) {
          xhr.setRequestHeader(key, options.headers[key]);
        }
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const json = JSON.parse(xhr.responseText);
            resolve(json);
          } catch (e) {
            reject(new Error('Error al parsear JSON'));
          }
        } else {
          reject(new Error(`Error: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('Error de red'));
      xhr.send(options?.body || null);
    });
  };

  const safeFetch = (url, options) => {
    if (typeof fetch === 'function') {
      return fetch(url, options).then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      });
    } else {
      return fallbackFetch(url, options);
    }
  };

  this.fetchE = async (url) => {
    const cacheKey = typeof url === 'object' ? JSON.stringify(url) : url;

    if (cacheTemp.has(cacheKey)) {
      return cacheTemp.get(cacheKey);
    }

    const [targetUrl, options] = typeof url === 'object' ? url : [url, undefined];

    const fetchPromise = safeFetch(targetUrl, options)
      .then(datos => {
        if (setGlobal) {
          this.setGlobals = { data: datos, load: false, error: null, promise: null };
        }
        const result = { data: datos, isLoading: false, error: null };
        cacheTemp.set(cacheKey, Promise.resolve(result));
        return result;
      })
      .catch(err => {
        if (setGlobal) {
          this.setGlobals = { data: null, load: false, error: err, promise: null };
        }
        const result = { data: null, isLoading: false, error: err };
        cacheTemp.set(cacheKey, Promise.resolve(result));
        return result;
      });

    cacheTemp.set(cacheKey, fetchPromise);
    setTimeout(() => cacheTemp.clear(), 1050);
    return fetchPromise;
  };

  Object.defineProperty(this, 'fetchR', {
    get: async () => {
      const { url, opciones } = this.static;
      try {
        const data = await safeFetch(url, opciones);
        if (setGlobal) {
          Object.assign(this.setGlobals, { data, load: false, error: null });
        }
        return { data, load: false, error: null };
      } catch (err) {
        if (setGlobal) {
          Object.assign(this.setGlobals, { data: null, load: false, error: err });
        }
        return { data: null, isLoading: false, error: err };
      }
    }
  });

  this.text = async (...a) => {
    try {
      const response = await safeFetch(a[0], a[1]);
      return typeof response === 'string' ? response : JSON.stringify(response);
    } catch (error) {
      console.error(error);
      return JSON.stringify({ error: error.message });
    }
  };

  setTimeout(() => cacheTemp.clear(), 1050);
};

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

const $ = new function () {


  this._doc = document;
  this._body = this._doc.body;
  const docChild = this._body.children;
  this._main = this._body.children._main;
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
        const { hash } = location;
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


const atest = (a, b = null) => {



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

const parseAttributes = function (attributeString) {
  const attributes = {};
  const attrRegex = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
  let attrMatch;
  while ((attrMatch = attrRegex.exec(attributeString)) !== null) {
    attributes[attrMatch[1]] = attrMatch[2];
  }
  // console.log("🎯 Atributos extraídos:", attributes);
  return attributes;
}
const autoClosedTags = new Set(["br", "hr", "img", "input", "meta", "link"]);
const parseHTML = function (htmlString) {
  const domTree = [];
  const stack = [];

  const tagRegex = /<!--([\s\S]*?)-->|<\/?([a-zA-Z0-9]+)([^>]*)\s*(\/?)>|([^<]+)/g;
  htmlString = htmlString.replace(/<\/(br|hr|img|input|meta|link)>/gi, "");

  let match;
  while ((match = tagRegex.exec(htmlString)) !== null) {
    const [fullMatch, commentContent, tagName, attributes, selfClosing, textContent] = match;
    let tempR = /[\/a-zA-Z0-9_-]+/g

    if (commentContent) {
      const commentNode = { comment: { content: commentContent.trim(), children: [] } };
      stack.length ? stack[stack.length - 1][Object.keys(stack[stack.length - 1])].children.push(commentNode) : domTree.push(commentNode);
    } else if (textContent) {

      stack.length ? stack[stack.length - 1][Object.keys(stack[stack.length - 1])].children.push(textContent) : domTree.push(textContent);
    } else if (fullMatch.startsWith("</")) {

      // ✅ Verificar antes de hacer `stack.pop()` para evitar `undefined`
      if (stack.length > 0) {
        // ✅ Verificar si la etiqueta ya estaba marcada como auto-cerrada antes de intentar cerrarla
        if (stack.length > 0) {
          if (!!tagName && tagName === "hr") console.log([...stack], tagName)
          const closedNode = stack.pop();
          const tagType = Object.keys(closedNode)[0];

          if (autoClosedTags.has(tagType.toLowerCase())) {
            delete closedNode[tagType].children;

            closedNode[tagType].selfClosing = true;
            // Las auto-cerradas no tienen hijos
          } else {
            // ✅ Procesar solo etiquetas que NO sean auto-cerradas
            stack.length ?
              stack[stack.length - 1][Object.keys(stack[stack.length - 1])].children.push(closedNode) :
              domTree.push(closedNode);
          }
        }
      }
    } else if (tagName) {

      // ✅ Verificar que `tagName` no sea `undefined`
      if (!tagName) continue;
      const isAutoClosed = autoClosedTags.has(tagName.toLowerCase()) || !!selfClosing;
      const node = {
        [tagName]: {
          ...parseAttributes(attributes || ""),
          children: [],
          selfClosing: isAutoClosed, // Detectar si es auto-cerrada
        },
      };

      if (isAutoClosed) {

        stack.length ? stack[stack.length - 1][Object.keys(stack[stack.length - 1])].children.push(node) : domTree.push(node);
        delete node[tagName].children;
      } else {

        stack.push(node);
      }

    }


  }

  return domTree.filter(x => typeof x !== "string");
}

const voidThis = (e, b = false) => {
  if (!b) {
    while (e.firstChild) {
      e.removeChild(e.firstChild);
    }
  } else {

  }
}


const API = { voidThis, parseHTML, atest, $, fetchResReq, proxyFlex };


export { voidThis, parseHTML, atest, $, fetchResReq, proxyFlex }




