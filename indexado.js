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

const checkImages = () => {
  const images = Array.from(document.querySelectorAll("img")).filter(x => x.datasrc);
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      img.src = img.datasrc;
      delete img.datasrc;
    }
  });
};
function activarScripts(nodo) {
  const scripts = nodo.querySelectorAll("script");
  scripts.forEach(script => {
    const nuevoScript = document.createElement("script");
    if (script.src) {
      nuevoScript.src = script.src;
    } else {
      nuevoScript.textContent = script.textContent;
    }
    // Copiar atributos si es necesario
    Array.from(script.attributes).forEach(attr => {
      nuevoScript.setAttribute(attr.name, attr.value);
    });
    script.replaceWith(nuevoScript);
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

    return new Promise((resolve, reject) => {
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

        const parser = new DOMParser();
        const vistaDoc = parser.parseFromString(vista.innerHTML, "text/html");
        
        _scripts.innerHTML = "";
       
        
        $.classInBody({ main: vista.getAttribute("data-class") || "" });
        
        $._main.innerHTML = atob(vistaDoc.body.innerHTML)
        /* .replaceAll(/<script_\b[^>]*>[\s\S]*?<\/script_>/gi, "") */.replace("<_>","").replace("&lt;_&gt;","").replace(/<!--_-->/gi,"");
        
        [...$._main.getElementsByTagName("script")]
.forEach(a=>{
  const nuevo =$._doc.createElement("script")
  nuevo.textContent=a.textContent
  $._doc.getElementById("scripts-dinamicos").appendChild(nuevo)
  a.innerHTML=""
})        
       

        estadoFinal = Object.getOwnPropertyNames(window);

        checkImages();
        resolve();
      } catch (error) {
        console.error("Error en renderizado:", error);
        reject(error);
      }
    });
  }

  $._body.addEventListener("click", (event) => {
    const Target = event.target;
    const Father = Target.parentNode;
    const eTag = Target.tagName;
    const eHref = Target.href;

    if (eTag === 'A' || Father.tagName === 'A') {
      
     if(!(Target.getAttribute("r")==="true"||Father.getAttribute("r")==="true"))event.preventDefault();
     
      const destino = (eTag === 'A' ? eHref : Father.href).replace(location.origin, '');
      if (destino !== location.href && destino !== $.QPPath(location, true).url) {
        location.hash = destino;
      }
    }
  });

  window.addEventListener('hashchange', () => {
    renderVista().then(() => checkImages());
  });

  if (componentes.header && $._doc.getElementById("_header").innerHTML.trim() === "") {
    const r = await fetch(componentes.header);
    const html = await r.text();
    $._doc.getElementById("_header").innerHTML = atob(html).replace("&lt;_&gt;","").replace(/<!--_-->/gi,"");
  }

  if (componentes.footer && $._doc.getElementById("_footer").innerHTML.trim() === "") {
    const r = await fetch(componentes.footer);
    const html = await r.text();
    $._doc.getElementById("_footer").innerHTML = atob(html).replace("&lt;_&gt;","").replace(/<!--_-->/gi,"");
  }

  renderVista().then(() => checkImages());
};

$._header.innerHTML=atob($._header.innerHTML).replace("<_>","").replace("&lt;_&gt;","").replace(/<!--_-->/gi,"")
$._footer.innerHTML=atob($._footer.innerHTML).replace("<_>","").replace("&lt;_&gt;","").replace(/<!--_-->/gi,"")

activarScripts($._header);
activarScripts($._footer);