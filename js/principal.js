


const csl=console.log;
const hash=location.hash;
const urlCap =location.origin+location.pathname;

function comprobarValor(a,b,c){
 
  
  if (a.substring(a.length-b.length,a.length)==b){
    
    csl("Encontrado",a);
 
 return a.substring(0,a.length-b.length)
}else{
    a;
   csl("Sin Coincidencia",a);
   return a;
  }

} 
if(hash==""){
  const scrypt1=document.createElement("script");
  scrypt1.setAttribute("src", './js/indexHTML.js');
  document.head.appendChild(scrypt1);
 }

const urlAct=[];

if(urlCap==('https://dainnin.github.io/dainnin/' || 'https://dainnin.github.io/dainnin/index.html')){
 
   urlAct[0]='https://dainnin.github.io/proyectowebimg/';
   csl("If ejecutado",urlAct);
   }else{
   
       urlAct[0] = [comprobarValor(urlCap,"index.html",hash)];
      
      
   }
 csl(urlAct)

   
 const lectJson=async()=>{
    

 
  try{
  
  const resp=await fetch(`${urlAct[0]}inventario.json`);
  const jsonObjList= await resp.json();
  return jsonObjList;
  }catch(pif){
  csl(pif);
  
  };
}
lectJson().then((obj) => {
  for(const Obj in obj){
    for(const SubObj of obj[Obj]){
      if(hash=="#"+SubObj["idu"]){
        const scrypt1=document.createElement("script");
        scrypt1.setAttribute("src", './js/productind.js');
        document.head.appendChild(scrypt1);
        document.title=SubObj["nompro"];
        csl("#"+SubObj["idu"])
      }
    }
  }
})