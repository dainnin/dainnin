/* 
Element.prototype.addEventListener = function (type, listener, options = {}) {
  const isOnce = options.once === true;
  const signal = options.signal;

  const nombre = listener.name || `anon_${type}_${Date.now()}`;
  const envuelto = function (event) {
    Object.assign(event, {
      nameEvent: type,
      nameFunc: listener
    });
    return listener.call(this, event);
  };

  const registro = listenerRegistry.get(this) || [];
  registro.push({ type, handler: envuelto, signal });
  listenerRegistry.set(this, registro);

  ElementAddEventListener.call(this, type, envuelto, options);

  // Si hay señal, agrego listener de aborto
  if (signal instanceof AbortSignal) {
    signal.addEventListener("abort", () => {
      this.removeEventListener(type, envuelto);
    });
  }

  return envuelto;
};

 */

//Listener..... 
   
const ElementAddEventListener = Element.prototype.addEventListener;
const DocumentAddEventListener = Document.prototype.addEventListener;
const WindowAddEventListener = Window.prototype.addEventListener;
const listenerRegistry = new WeakMap();

Element.prototype.addEventListener = function (type, listener, options) {
  const isOnce = options && options.once === true;
  if (isOnce) {
    return ElementAddEventListener.call(this, type, listener, options);
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

  const registro = listenerRegistry.get(this) || [];
  registro.push({ type, handler: envuelto });
  listenerRegistry.set(this, registro);

  return ElementAddEventListener.call(this, type, envuelto, options);
};
Document.prototype.addEventListener = function (type, listener, options) {

  const isOnce = options && options.once === true;

  if (isOnce) {
    return DocumentAddEventListener.call(this, type, listener, options);
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

  const registro = listenerRegistry.get(this) || [];
  registro.push({ type, handler: envuelto });
  listenerRegistry.set(this, registro);

  return DocumentAddEventListener.call(this, type, envuelto, options);
};
Window.prototype.addEventListener = function (type, listener, options) {
  const isOnce = options && options.once === true;

  if (isOnce) {
    return WindowAddEventListener.call(this, type, listener, options);
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


  const registro = listenerRegistry.get(this) || [];
  registro.push({ type, handler: envuelto });
  listenerRegistry.set(this, registro);

  return WindowAddEventListener.call(this, type, envuelto, options);
};

function _btoa(texto) {
function xorEncode(texto) {
  const bytes = new TextEncoder().encode(texto);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join(""); // hex seguro
}

  return xorEncode(texto) // 
}

function _atob(base64) {
function xorDecode(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return new TextDecoder().decode(bytes);
}

return xorDecode(base64)
}

function _$_carrusel() {
  
  this._insertarEvento = function ($control, $carrusel) {

    const _imagenes = $carrusel.children
    const _puntos = $control.getElementsByTagName("span")
    const lengthPuntos = () => _puntos.length > _imagenes.length ? _imagenes.length : _puntos.length
    let position = 0;
    const tempDots = document.createDocumentFragment()
    function mostrarImagen(indice) {

      if (_puntos.length > _imagenes.length) {
        while (_puntos.length > _imagenes.length) {
          tempDots.appendChild(_puntos[_puntos.length - 1]);
        }

      } else if ((tempDots.children.length > 0) && (_puntos.length < _imagenes.length)) {
        for (const x of tempDots.children) {

          $control.insertBefore(x, _puntos[0]);
        }
      }
      for (let i = 0; i < _imagenes.length; i++) {
        Object.assign(_imagenes[i], {
          _Carrusel_Cards: `_Carrusel_Cards`,
          style: `
                                height:0;
                                visibility:collapse;
                                opacity:0;
                                                `})

        _puntos[i % lengthPuntos()].classList.remove('_ActiveDots');
      }
      if (_imagenes.length === 1) {
        Object.assign(_imagenes[indice], {
          style: `
                              visibility:visibility;
                              opacity:1;
                                                    `})
      }
      _puntos[indice % lengthPuntos()].classList.add('_ActiveDots');
    }

    const pag = {
      mov: (a) => {
        position = (position + a + _imagenes.length) % _imagenes.length;
        return position;
      },

    }

    $control.addEventListener('click', function (event) {
      const etiqueta = event.target

      if (etiqueta.className.includes("btnIzq")) {

        return mostrarImagen(pag.mov(-1))

      } else if (etiqueta.className.includes("btnDer")) {
        return mostrarImagen(pag.mov(1))

      }

    });
    window.addEventListener("DOMContentLoaded", mostrarImagen(position), { once: true })
    if (document.querySelector("#__Bcarrusel")) return
    const _styleBase = document.createElement("style")
    _styleBase.id = "__Bcarrusel"
    _styleBase.textContent = `
            [_Carrusel_Cards] {
                position: relative;
                top: 0;
                transition: opacity 3s ease;
            }

            [_Carrusel_Control_Dots] {
                height: 15px;
                width: 15px;
                margin: 0 2px;
                background-color: #e04343ff;
                border-radius: 50%;
                display: inline-block;
                transition: background-color 0.6s ease;
                justify-content: center;
            }

            [_Carrusel_Control] {
                display: flex;
                justify-content: center;

            }

            [_Carrusel_Control_Dots]._ActiveDots {
                background-color: #139b94ff;
            }
            `
    document.body.appendChild(_styleBase)
  }
  this.bodyHTML = function (_arg) {

    const _setDefault = {
      attrContCarr: "Content_Cars" + _$_.queryAll("[_Carrusel]").length,
      attrControls: "Content_Controls" + _$_.queryAll("[_Carrusel_Controls]").length,
      attrContCards: "Content_Cards" + _$_.queryAll("[_Carrusel]").length,

    }
    if (!_arg) {
      _arg = { ..._setDefault }
    }

    const _control = document.createElement("div")

    const _carrusel = document.createElement("div")



    _control.innerHTML = `
            <button class="btnIzq">←</button>
            <span _Carrusel_Control_Dots="true" class="_ActiveDots"></span>
            <span _Carrusel_Control_Dots="true" class="_ActiveDots"></span>
            <span _Carrusel_Control_Dots="true" class="_ActiveDots"></span>
            <button class="btnDer">→</button>
                `;
    _control.setAttribute("_Carrusel_Controls", _arg.attrControls)
    _carrusel.setAttribute("_Carrusel", _arg.attrContCarr)
    _carrusel.innerHTML = "<div>Hola test2</div><div>Hola test3</div><div>Hola test4</div><div>Hola test5</div>"

    document.body.appendChild(_control)
    document.body.appendChild(_carrusel)

    this._insertarEvento(_control, _carrusel)

  }

  Object.defineProperties(this, {

  }
  )




}

const checkImages = () => {
  setTimeout(() => {
    const images = [...document.querySelectorAll("img")].filter(img => getAtt(img, "datasrc"));

    images.forEach(img => {
      const rect = () => img.getBoundingClientRect();
      const rectB = () => window.innerHeight;
      const isVisible = () => {
        const r = rect();
        return (
          r.top < window.innerHeight &&
          r.bottom > 0 /* &&
    r.left < window.innerWidth &&
    r.right > 0 */
        );

      };

      if (isVisible()) {
        img.src = getAtt(img, "datasrc");
        img.removeAttribute("datasrc");
      }
    });
  }, 145)
};

function activarScripts(nodo, nodoDestino = false, active = false) {
  const scripts = nodo.querySelectorAll("script");
  scripts.forEach(script => {
    const nuevoScript = document.createElement("script");
    if (active) { nuevoScript.textContent = "if(true){" + script.textContent + "}"; } else {
      nuevoScript.textContent = script.textContent;
    }
    // Copiar atributos si es necesario


    Array.from(script.attributes).forEach(attr => {
      nuevoScript.setAttribute(attr.name, attr.value);
    });
    if (nodoDestino) {
      _$_._doc.getElementById(nodoDestino).appendChild(nuevoScript)
      script.remove()
    } else {

      script.replaceWith(nuevoScript);
    }

  });

}

const estadoInicial = new Set(Object.getOwnPropertyNames(window));
let estadoFinal = Object.getOwnPropertyNames(window);

const createUpdate = async (vistas = {}, componentes = {}) => {

  const _$_b64 = vistas["path"]

  if (_$_b64 !== undefined){ 
    vistas = { ...JSON.parse(_atob(_$_b64))   }
  }else{
   
     vistas={...JSON.parse(_atob(vistas._$_Base64))  } 
  }
  function renderVista() {
    const _scripts = _$_._doc.getElementById("scripts-dinamicos");
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

        _$_._main.querySelectorAll('*').forEach(nodo => {
          const registro = listenerRegistry.get(nodo);

          if (registro) {

            registro.forEach(({ type, handler }) => {
              nodo.removeEventListener(type, handler);
            });
            listenerRegistry.delete(nodo);
          }

          nodo.remove()
        });
        Object.values(_scripts.children).forEach(e => e.remove())
        const path = _$_.path || '/';
        const idVista = vistas[path] || "vista-404";
         
        const vista = document.getElementById(idVista);


        if (!vista) throw new Error("Vista no encontrada: " + idVista);
        const vistaDoc = _$_._doc.createElement("div")
        vistaDoc.innerHTML = vista.innerHTML

        _$_._main.innerHTML = _atob(vistaDoc.innerHTML);
        vistaDoc.remove()


        activarScripts(_$_._main, "scripts-dinamicos", true)


        estadoFinal = Object.getOwnPropertyNames(window);

        if (controlMemory2()) location.reload()
        resolve();
      } catch (error) {
        console.error("Error en renderizado:", error);
        reject(error);
      }
    })).then(() => checkImages());
  }

window.addEventListener("popstate",renderVista );

  

  if (componentes.header && _$_._doc.getElementById("_header").innerHTML.trim() === "") {
    const r = await fetch(componentes.header);
    const html = await r.text();
    _$_._doc.getElementById("_header").innerHTML = _atob(html);

  }

  if (componentes.footer && _$_._doc.getElementById("_footer").innerHTML.trim() === "") {
    const r = await fetch(componentes.footer);
    const html = await r.text();
    _$_._doc.getElementById("_footer").innerHTML = _atob(html);
  }

  renderVista();
};

_$_._header.innerHTML = _atob(_$_._header.innerHTML)
_$_._footer.innerHTML = _atob(_$_._footer.innerHTML)

activarScripts(_$_._header);
activarScripts(_$_._footer);

function controlMemory2() {
  const largeMain = _$_._main.querySelectorAll('*').length
  if (performance.memory) {
    if (Math.round(performance.memory.totalJSHeapSize / 1024 ** 2) > 80) {
      return true
    } else {
      return false
    }
  } else
    if (largeMain > 2500) {
      return true
    }
  return false
}
window.addEventListener("scroll", checkImages);
window.addEventListener("resize", checkImages);
_$_._body.addEventListener("click", (event) => {
  const Target = event.target;
  const Father = Target.parentNode;
  const eTag = Target.tagName;
  const eHref = Target.href;
  const hrefSTR= Target.getAttribute("href")
  if (eTag === 'A' || Father.tagName === 'A') {
    
    
    if (!(getAtt(Target, "r") === "true" || getAtt(Father, "r") === "true")) event.preventDefault();

    const destino = (eTag === 'A' ? eHref : Father.href).replace(location.origin, '');
    
     if (destino !== location.href && destino !== _$_.QPPath(location, true).url) {
      
      if(!hrefSTR.includes("/")&&hrefSTR.indexOf("#")===0){
        try{
       return _$_.queryAll(hrefSTR,true).scrollIntoView({ behavior: "smooth" })
      }catch{
        return
      }
      }else if (location.hash.replace("#","") !== destino) window.scrollTo(0, 0);


      location.hash = destino;
      
    }

  }
});
