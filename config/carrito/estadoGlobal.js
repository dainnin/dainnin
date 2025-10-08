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
  estadoGlobal.set("conectado", {estado:conectado ? true : false,msj:msj});
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
          estadoGlobal.set("usuario", data.user || null);
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

      if(_69$.path=="/login")location.hash="#/" 
    
   if(estadoGlobal.get("usuario")){
    document.getElementById("user").innerHTML="<p style='color:bluesky;'>"+estadoGlobal.get("usuario")+"</p>"
  }
  }else{
    document.getElementById("user").innerHTML=""
  }
 
  }
  
});
