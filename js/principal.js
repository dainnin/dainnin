const csl=console.log;
const linkLocal=location.href;


const lectJson2 = async () => {
  try {

    const resp = await fetch('https://raw.githubusercontent.com/dainnin/proyectowebimg/main/vinculos.json');
    const jsonObjList = await resp.json();
    return jsonObjList;
  } catch (pif) {
    csl(pif);

  };

};
 
lectJson2().then((obj) => {
  
  for(const link of obj){
  if( link == linkLocal){

const css1=document.createElement('script');
css1.setAttribute("src","https://raw.githubusercontent.com/dainnin/proyectowebimg/main/indexHTML.js");
 css1.setAttribute("type","application/javascript");
document.head.appendChild(css1);   

    csl("OK y porque ahora si");
  
  }else{csl("que paso")};
}
})

const css1=document.createElement('link');
css1.setAttribute("rel","stylesheet");
css1.setAttribute("href","./css/footer.css");


document.head.appendChild(css1);


 

