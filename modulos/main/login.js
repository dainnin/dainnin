
import { HTMLatObj } from "/dainnin/modulos/funciones/creacion.js"
import { $ } from '/dainnin/modulos/funciones/utilidades.js';
import { ab } from '/dainnin/modulos/req/checkToken.js'
import { urls } from '/dainnin/modulos/env.js';
async function login(event) {
    event.preventDefault()
    const form = event.target.form

    const data = new FormData(form)
    const body = {}
    for (let [k, v] of data.entries()) {
        body[k] = v;
    }

    if (event.target.tagName === "BUTTON" && Object.values(body).indexOf("") === -1) {
        const req = new $.test({});

         req.fetchE([`${urls.local.api}login`, {
            "credentials": "include",
            "headers": {

                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",

            },
            "mode": "cors",
            "body": JSON.stringify(body),
            "method": "POST",

        }]).then(()=>ab.fetchR)

        


    }


}

$.referencias(login)
export const LoginForm = () => HTMLatObj(`
    <form onclick="login||F">
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