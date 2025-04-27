
const { HTMLatObj } =await import( `${urls.online.app}/modulos/funciones/creacion.js`)
const { $ } = await import(`${urls.online.app}/modulos/funciones/utilidades.js`);
const { ab } =await import (`${urls.online.app}/modulos/req/checkToken.js`)




async function login(event) {
    event.preventDefault()
    const form = event.target.form
    const name = form.name
    const data = new FormData(form)
    const body = {}
    for (let [k, v] of data.entries()) {
        body[k] = v;
    }

    if (event.target.tagName === "BUTTON" && Object.values(body).indexOf("") === -1) {
        const req = new $.test({});

         req.fetchE([`${urls.online.api+name}`, {
            "credentials": "include",
            "headers": {

                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",

            },
            "mode": "cors",
            "body": JSON.stringify(body),
            "method": "POST",

        }]).then((a)=>{
   if(a.error===null){
                alert(name==='login'?a.data.user+" has iniciado con exito":`has ${form.user.value} ${a.data.data} con exito`)
            }else{
                alert(a.error)
            }

a.error===null&&name==='register'?menR.checked=false:''
ab.fetchR


        })

    }

}

$.referencias(login)
export const LoginForm = () => {
   
   return HTMLatObj(`
    <link rel="stylesheet" href="${urls.online.app}/modulos/css/login.css"></link>
     <input id="menR" name="menR" type="checkbox"></input><label htmlFor="menR" ></label>
    <form onclick="login||F" className="registrar" name="register">
            <label>
                Usuario:
                <input type="text" name="user"  required ></input>
            </label>
            <label>
                Nombre:
                <input type="text" name="nombre"  required></input>
            </label>
            <label>
                Correo:
                <input type="email" name="email"  required ></input>
            </label>
            <label>
                Password:
                <input type="password" name="password"  required></input>
            </label>
             
            <button >Registrar</button>
    </form>
    <form onclick="login||F" name="login">
            <label>
                Usuario:
                <input type="text" name="user"  required ></input>
            </label>
            <label>
                Password:
                <input type="password" name="password"  required></input>
            </label>
            <button >Iniciar sesión</button>
    </form>`
)
}
