const { $,proxyFlex ,fetchResReq } =await import(`${urls.online.app}/modulos/funciones/utilidades.js`);


const abc = new fetchResReq({ setGlobal: true });
abc.setStatic([`${urls.online.api}checkToken`, {
  "method": 'GET',
  "credentials": 'include', // Asegura que las cookies se envíen
  "headers": {
    'Content-Type': 'application/json',
  },
  "mode": "cors"
}])
 const abcPorxy = proxyFlex(abc,'fetchR');

 export const ab = abcPorxy.proxy

 export const setStateCheck=abcPorxy.suscribir
 function loginFront(){
    if(ab.setGlobals.data!==null){
    $.path==='/login'?location.hash='/':''
  }
}
 setStateCheck(loginFront)
 export const setStateArr = abcPorxy.suscriptores
 window.addEventListener("popstate",(e)=>{
  if(ab.setGlobals.data!==null){
    $.path==='/login'?location.hash='/':''
  }
})
