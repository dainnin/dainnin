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

  const images = [...document.querySelectorAll("img")].filter(x => x.attributes.datasrc
  );

  images.forEach(img => {

    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      img.src = img.attributes.datasrc.value;
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
const estadoGlobal = {
  datos: {},
  listeners: [],

  set(clave, valor) {
    this.datos[clave] = valor;
    this.listeners.forEach(fn => fn(clave, valor));
  },

  get(clave) {
    return this.datos[clave];
  },

  observar(fn) {
    this.listeners.push(fn);
  }
};

function actualizarEstadoSesion(usuario = null, msj = "") {
  const conectado = !!usuario;
  estadoGlobal.set("conectado", conectado ? true : false);
  estadoGlobal.set("usuario", usuario);
}

function checkToken(urlBase = "https://dainnin.alwaysdata.net/api/") {
  estadoGlobal.set("cargandoToken", true);

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${urlBase}checkToken`, true);
  xhr.withCredentials = true; // 🔐 Esto permite enviar cookies

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      estadoGlobal.set("cargandoToken", false);

      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          estadoGlobal.set("conectado", { estado: true });
          estadoGlobal.set("usuario", data.usuario || null);
        } catch (e) {
          estadoGlobal.set("conectado", { estado: false, msj: "Error de formato" });
          estadoGlobal.set("usuario", null);
        }
      } else {
        estadoGlobal.set("usuario", null);
      }
    }
  };

  xhr.onerror = function () {
    const tipo = xhr.status === 0 ? "CORS o red" : "Error HTTP";
    estadoGlobal.set("cargandoToken", false);
    estadoGlobal.set("conectado", { estado: false, msj: tipo });
    estadoGlobal.set("usuario", null);
  };

  xhr.send();
}





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
        const vistaDoc = $._doc.createDocumentFragment()
        vistaDoc.innerHTML = vista.innerHTML

        _scripts.innerHTML = "";


        $.classInBody({ main: vista.getAttribute("data-class") || "" });

        $._main.innerHTML = atob(vistaDoc.innerHTML)
        /* .replaceAll(/<script_\b[^>]*>[\s\S]*?<\/script_>/gi, "") */.replace("<_>", "").replace("&lt;_&gt;", "").replace(/<!--_-->/gi, "");

        [...$._main.getElementsByTagName("script")]
          .forEach(a => {
            const nuevo = $._doc.createElement("script")
            nuevo.textContent = a.textContent
            $._doc.getElementById("scripts-dinamicos").appendChild(nuevo)
            a.innerHTML = ""
          })


        estadoFinal = Object.getOwnPropertyNames(window);
        checkToken()
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

      if (!(Target.getAttribute("r") === "true" || Father.getAttribute("r") === "true")) event.preventDefault();

      const destino = (eTag === 'A' ? eHref : Father.href).replace(location.origin, '');
      if (destino !== location.href && destino !== $.QPPath(location, true).url) {
        checkToken()
        if (location.hash.replace("#") !== destino) window.scrollTo(0, 0);
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
    $._doc.getElementById("_header").innerHTML = atob(html).replace("&lt;_&gt;", "").replace(/<!--_-->/gi, "");
  }

  if (componentes.footer && $._doc.getElementById("_footer").innerHTML.trim() === "") {
    const r = await fetch(componentes.footer);
    const html = await r.text();
    $._doc.getElementById("_footer").innerHTML = atob(html).replace("&lt;_&gt;", "").replace(/<!--_-->/gi, "");
  }

  renderVista().then(() => checkImages());
};

$._header.innerHTML = atob($._header.innerHTML).replace("<_>", "").replace("&lt;_&gt;", "").replace(/<!--_-->/gi, "")
$._footer.innerHTML = atob($._footer.innerHTML).replace("<_>", "").replace("&lt;_&gt;", "").replace(/<!--_-->/gi, "")

activarScripts($._header);
activarScripts($._footer);
window.addEventListener("scroll", checkImages);
window.addEventListener("resize", checkImages);


const sessionButton = $._doc.getElementById("sessionButton")
estadoGlobal.observar((clave, valor) => {

  if (clave === "conectado") {

    Object.assign(sessionButton, {
      textContent: valor.estado ? "Cerrar Sesion" : "Sesion",
      href: valor.estado ? "/" : "/login",
    })
    if (valor.estado) {
      sessionButton.onclick = async function logout() {
        try {
          const r = await fetch("https://dainnin.alwaysdata.net/api/logout", {
            "headers": {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'

            },
            mode: 'cors',
            credentials: "include",
          })
          const f = await r.json()
          if (!f.ok) {
            estadoGlobal.set("conectado", { estado: false, msj: "Cerrar Session" });
          }
          estadoGlobal.set("conectado", { estado: false, msj: "Cerrar Session" });
        } catch (e) {
          estadoGlobal.set("conectado", { estado: false, msj: "Cerrar Session" });
        }
      }

      if($.path=="/login")location.hash="#/"
    }
  }
});