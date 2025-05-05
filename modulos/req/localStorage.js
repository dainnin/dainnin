const { proxyFlex  } =await import(`${urls.online.app}/modulos/funciones/utilidades.js`);
 
const carrito = {value:[],cant:null}
const carroProxy=proxyFlex(carrito,'','cant');
export const upDataCarro = carroProxy.proxy;
export const setCarroSus=carroProxy.suscribir;
export const setsSusCarro=carroProxy.suscriptores;


