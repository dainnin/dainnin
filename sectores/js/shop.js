var csl=console.log;
  $(document).ready(function (){
    const requestURL = 'https://dainnin.github.io/proyectowebimg/inventario.json';
    const request = new XMLHttpRequest;
    request.open('GET', requestURL);
    request.responseType='json';
    request.send();
    request.onload = function () {
    const obj = request.response;
      objImglistshop1(obj); 
      
  
  };
 
 

 

  })
  function objImglistshop1(obj) {
    
    var ci=0;
    var frcx=Object.keys(obj);
    
    var  nObj=Object.keys(obj).length; 
    var  nObjp=Object.keys(obj[frcx[ci]]).length;
    
   
    console.log(nObjp);

for (ci;ci<nObj;++ci){
     
    const cont1 = document.createElement('div');
   
    cont1.setAttribute("class", "dibx");
    cont1.setAttribute("id",obj[frcx[ci]][0]["frc"][2])
    const he1 = document.createElement('h1');
    he1.textContent=obj[frcx[ci]][0]["frc"][1];
    const cont2 = document.createElement('div');
    cont2.setAttribute("class", "prsh");
    cont2.setAttribute("id", obj[frcx[ci]][0]["frc"][3]);
    sectionxs.appendChild(cont1);
    cont1.appendChild(he1) 
    cont1.appendChild(cont2); 
  for (i=1; i<nObjp ; ++i) {
      const cont3 = document.createElement('a');
      const imgx = document.createElement('img');
      const he4 = document.createElement('h4');
      const he3 = document.createElement('h3');
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      
     
     csl(obj[frcx[ci]][i]["prolink"])
      cont3.setAttribute("href", obj[frcx[ci]][i]["prolink"]);
      imgx.setAttribute("src",  obj[frcx[ci]][i]["imgz"]);
      he4.textContent =obj[frcx[ci]][0]["frc"][0];
      he3.textContent = obj[frcx[ci]][i]["nompro"];
      div1.textContent =obj[frcx[ci]][i]["precio"];
      div2.textContent = obj[frcx[ci]][i]["cuotas"];
      
     
     cont3.appendChild(imgx);
     cont3.appendChild(he4);
     cont3.appendChild(he3);
     cont3.appendChild(div1);
     cont3.appendChild(div2);
     
   
    let a69=[(obj[frcx[ci]][0]["frc"][3])];
   
 document.getElementById(a69).appendChild(cont3)
     
    } 
  }



  }

 
