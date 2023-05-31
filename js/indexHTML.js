






const urlCap =location.href;
         function relx(a){
window.location.href=a;
window.location.href;
window.location.reload(); 
}
  
var i = 1;
var b = 2;
var ix = 1;
var bx = 2;
const urlAct="";

  if(urlCap=='https://dainnin.github.io/dainnin/'){
 csl("If ejecutado");
  urlAct='https://dainnin.github.io/proyectowebimg/';

  }else{
    csl("Else ejecudatdo", urlAct, urlCap);
      urlAct==urlCap;
      
  }

    
 
    const lectJson=async()=>{
      try{
      
      const resp=await fetch(`${urlAct}inventario.json`);
      const jsonObjList= await resp.json();
      return jsonObjList;
      }catch(pif){
      csl(pif);
      
      };
    }
 
      lectJson().then( (obj)=> {
  
  function randomx ()
  { 
    
    return Math.floor(Math.random()* Object.keys(obj).length);

  }
     
 


for (i; i<b , 0!=b%7; i++, b++) {
  const cont1az = document.createElement('article');
  const cont1z = document.createElement('a');
  const imgxz = document.createElement('img');
  const he4z = document.createElement('h4');
  const he3z = document.createElement('h3');
  const div1z = document.createElement('div');
  const div2z = document.createElement('div');
  var frc=Object.keys(obj);
  var frcx=frc[randomx()];
 
  imgxz.setAttribute("src", obj[frcx][i]["imgz"]);
  cont1z.setAttribute("href", obj[frcx][i]["prolink"]);;
  he4z.textContent = obj[frcx][0]["frc"][0];
  he3z.textContent = obj[frcx][i]["nompro"];
  div1z.textContent = obj[frcx][i]["precio"];
  div2z.textContent = obj[frcx][i]["cuotas"];
 
  cont1az.appendChild(cont1z);
 cont1z.appendChild(imgxz);
  cont1z.appendChild(he4z);
  cont1z.appendChild(he3z);
  cont1z.appendChild(div1z);
  cont1z.appendChild(div2z);
   
  prsh.appendChild(cont1az);

};



for (ix; ix<bx , 0!=bx%5; ix++,bx++) {

  const contx1 = document.createElement('div');
  const contx2 = document.createElement('div');
  const contx3 = document.createElement('div');
  const he2x = document.createElement('h2');
  const px = document.createElement('p');
  const hrx = document.createElement('hr');
  const ax = document.createElement('a');
  const imgx1 = document.createElement('img');
  
 
 
  
  var frcz=frc[randomx()];

  
  
  imgx1.setAttribute("src", obj[frcz][ix]["imgz"]);
  he2x.textContent = obj[frcz][0]["frc"][0];
  px.textContent = obj[frcz][0]["descrip"];
  ax.setAttribute("href", obj[frcz][ix]["linka"][1]);
  ax.textContent = obj[frcz][ix]["linka"][0];
  

 
  contx1.appendChild(contx2);
  contx2.appendChild(contx3);
  contx3.appendChild(he2x);
  contx3.appendChild(px);
  contx2.appendChild(hrx);
  contx2.appendChild(ax);
  contx1.appendChild(imgx1);
  
  prsv.appendChild(contx1);


 
};
      })
   

  
