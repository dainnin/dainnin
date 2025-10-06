//Listener.....    
const originalAddEventListener = Element.prototype.addEventListener;

const listenerRegistry = new WeakMap();

Element.prototype.addEventListener = function (type, listener, options) {
  const isOnce = options && options.once === true;

  // Si es once:true, no envolvemos ni registramos
  if (isOnce) {
    return originalAddEventListener.call(this, type, listener, options);
  }

  const nombre = listener.name || `anon_${type}_${Date.now()}`;

  const envuelto = function (event) {
    if (listener.name === "") listener.name = nombre;
    Object.assign(event, {
      nameEvent: type,
      nameFunc: listener
    });
    return listener.call(this, event);
  };

  // Guardar en WeakMap solo si no es once:true
  const registro = listenerRegistry.get(this) || [];
  registro.push({ type, handler: envuelto });
  listenerRegistry.set(this, registro);

  return originalAddEventListener.call(this, type, envuelto, options);
};

const QPPath = (req, enabled = false) => {
  const inital = { search: {}, path: '', hash: '' };
  if (!req) return '';
  const { pathname, hash, href, origin } = req;

  if (href.includes('?')) {
    for (const a of href.substring(href.indexOf('?') + 1).split("&")) {
      const [k, v] = a.split("=");
      if (v) inital.search[k] = v;
    }
  }

  if (enabled) {
    inital.hash = hash.includes('#', 1) ? hash.substring(hash.indexOf('#', 1)) : '';
    inital.path = hash.includes('#', 1)
      ? hash.substring(1, hash.indexOf('#', 1) - 1)
      : hash.replace('#', '');
  } else {
    const lastSlash = pathname.lastIndexOf('/');
    inital.path = pathname.length - 1 === lastSlash
      ? (hash === '' ? pathname.substring(0, lastSlash) : '/' + hash.substring(0, hash.indexOf('?')))
      : pathname;
  }

  if (inital.path.includes('?')) {
    inital.path = inital.path.substring(0, inital.path.indexOf('?'));
  }

  Object.assign(inital, { url: origin + inital.path, href });
  return inital;
};

const $ = new function () {
  this._doc = document;
  this._body = this._doc.body;
  this._main = this._doc.getElementById("_main");
  this._header = this._doc.getElementById("_header");
  this._footer = this._doc.getElementById("_footer");
  this._enabled = false;

  this.voidMain = () => {
    this._main.innerHTML = "";
  };

  this.classInBody = ({ header, main, footer }) => {
    if (header) this._header.className = header;
    if (main) this._main.className = main;
    if (footer) this._footer.className = footer;
  };

  Object.defineProperties(this, {
    hash: { get: () => QPPath(location, this._enabled).hash },
    search: { get: () => QPPath(location, this._enabled).search },
    path: { get: () => QPPath(location, this._enabled).path },
    QPPath: { get: () => QPPath },
    HashEnabled: {
      get: () => {
        this._enabled = !this._enabled;
        if (location.hash === '') location.hash = '#/';
      }
    }
  });
};
function getAtt(el, attr) {
  return el.getAttribute(attr)
}
const checkImages = () => {
  const images = [...document.querySelectorAll("img")].filter(img => getAtt(img,"datasrc"));

  images.forEach(img => {
    const rect =()=> img.getBoundingClientRect();
    const rectB=()=> window.innerHeight;
    const isVisible = () => {
   const r = rect();
   return (
    r.top < window.innerHeight &&
    r.bottom > 0 &&
    r.left < window.innerWidth &&
    r.right > 0
  );
};

    
     
    if (isVisible()) {
      img.src = getAtt(img,"datasrc");
      img.removeAttribute("datasrc");
    }
  });
};

function activarScripts(nodo, nodoDestino = false) {
  const scripts = nodo.querySelectorAll("script");
  scripts.forEach(script => {
    const nuevoScript = document.createElement("script");
    nuevoScript.textContent = script.textContent;
    // Copiar atributos si es necesario


    Array.from(script.attributes).forEach(attr => {
      nuevoScript.setAttribute(attr.name, attr.value);
    });
    if (nodoDestino) {
      $._doc.getElementById(nodoDestino).appendChild(nuevoScript)
      script.remove()
    } else {

      script.replaceWith(nuevoScript);
    }




  });

}



const estadoInicial = new Set(Object.getOwnPropertyNames(window));
let estadoFinal = Object.getOwnPropertyNames(window);



const createUpdate = async (vistas = {}, componentes = {}) => {



  function renderVista() {
    const _scripts = $._doc.getElementById("scripts-dinamicos");
    estadoFinal = Object.getOwnPropertyNames(window);
    const nuevasClaves = estadoFinal.filter((k) => {

      return !estadoInicial.has(k)
    });

    return (new Promise((resolve, reject) => {
      try {
        if (estadoFinal.length > estadoInicial.size) {

          for (const a of nuevasClaves) {

            window[a] = null
            delete window[a]

          }

        }
        $.voidMain();
        const path = $.path || '/';
        const idVista = vistas[path] || "vista-404";
        const vista = document.getElementById(idVista);





        if (!vista) throw new Error("Vista no encontrada: " + idVista);
        const vistaDoc = $._doc.createDocumentFragment()
        vistaDoc.innerHTML = vista.innerHTML

        _scripts.innerHTML = "";


        $.classInBody({ main: getAtt(vista,"data-class") || "" });

        $._main.innerHTML = atob(vistaDoc.innerHTML)
        /* .replaceAll(/<script_\b[^>]*>[\s\S]*?<\/script_>/gi, "") */.replace("<_>", "").replace("&lt;_&gt;", "").replace(/<!--_-->/gi, "");

        activarScripts($._main, "scripts-dinamicos")


        estadoFinal = Object.getOwnPropertyNames(window);
        checkToken()

        resolve();
      } catch (error) {
        console.error("Error en renderizado:", error);
        reject(error);
      }
    })).then(() => checkImages());
  }

  $._body.addEventListener("click", (event) => {
    const Target = event.target;
    const Father = Target.parentNode;
    const eTag = Target.tagName;
    const eHref = Target.href;

    if (eTag === 'A' || Father.tagName === 'A') {

      if (!(getAtt(Target,"r") === "true" || getAtt(Father,"r") === "true")) event.preventDefault();

      const destino = (eTag === 'A' ? eHref : Father.href).replace(location.origin, '');
      if (destino !== location.href && destino !== $.QPPath(location, true).url) {

        if (location.hash.replace("#") !== destino) window.scrollTo(0, 0);
        location.hash = destino;
      }
    }
  });

  window.addEventListener('hashchange', () => {

    renderVista()

  });

  if (componentes.header && $._doc.getElementById("_header").innerHTML.trim() === "") {
    const r = await fetch(componentes.header);
    const html = await r.text();
    $._doc.getElementById("_header").innerHTML = atob(html).replace("&lt;_&gt;", "").replace(/<!--_-->/gi, "");

  }

  if (componentes.footer && $._doc.getElementById("_footer").innerHTML.trim() === "") {
    const r = await fetch(componentes.footer);
    const html = await r.text();
    $._doc.getElementById("_footer").innerHTML = atob(html).replace("&lt;_&gt;", "").replace(/<!--_-->/gi, "");
  }

  renderVista();
};

$._header.innerHTML = atob($._header.innerHTML).replace("<_>", "").replace("&lt;_&gt;", "").replace(/<!--_-->/gi, "")
$._footer.innerHTML = atob($._footer.innerHTML).replace("<_>", "").replace("&lt;_&gt;", "").replace(/<!--_-->/gi, "")

activarScripts($._header);
activarScripts($._footer);
setTimeout(checkImages, 35)
window.addEventListener("scroll", checkImages);
window.addEventListener("resize", checkImages);


const sessionButton = $._doc.getElementById("sessionButton")