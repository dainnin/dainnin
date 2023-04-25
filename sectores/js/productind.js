
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
 inindx.setAttribute("href","../../index.html")
 

 

  })
  function objImglistshop1(obj) {
    const objT=Object.keys(obj).length-1;
    
    var i=1;
    var b=2;
    var frcx=Object.keys(obj);
    
    let ci=0;
    const oKT=frcx.length;
   
for(ci;ci<oKT ;++ci){
      
      for(cix=0;cix<=oKT;++cix){
      if(obj[frcx[ci]][cix]["nompro"] == titlex.textContent) {

        const contx1 = document.createElement('div');
        const contx2 = document.createElement('div');
        const contx3 = document.createElement('div');
        const he2x = document.createElement('h2');
        const px = document.createElement('p');
        const hrx = document.createElement('hr');
        const ax = document.createElement('a');
        const imgx1 = document.createElement('img');
        
       
       
        
      
        imgx1.setAttribute("src",obj[frcx[ci]][cix]["imgz"]);
        he2x.textContent = obj[frcx[ci]][cix]["nompro"];
        px.textContent = obj[frcx[ci]][cix]["descrip"];
        ax.setAttribute("href", obj[frcx[ci]][cix]["linka"][1]);
        ax.textContent = obj[frcx[ci]][cix]["linka"][0];
        
      
        
        
       
        contx1.appendChild(contx2);
        contx2.appendChild(contx3);
        contx3.appendChild(he2x);
        contx3.appendChild(px);
        contx2.appendChild(hrx);
        contx2.appendChild(ax);
        contx1.appendChild(imgx1);
        
        mainx.appendChild(contx1);
        
        

const contz1 = document.createElement('div');
contz1.setAttribute("class", "dibx");
contz1.setAttribute("id","harrypx");
const hez1 = document.createElement('h1');
hez1.textContent=obj[frcx[ci]][0]["frc"][1];
const contz2 = document.createElement('div');
contz2.setAttribute("class", "prsh");
contz2.setAttribute("id", obj[frcx[ci]][0]["frc"][3] );
sectionxs.appendChild(contz1);
contz1.appendChild(hez1) 
contz1.appendChild(contz2);


console.log("Hola");
  for (i; i<b , 0!=b%7; ++i,++b) {
      
    const cont1az = document.createElement('article');
    const cont1z = document.createElement('a');
    const imgxz = document.createElement('img');
    const he4z = document.createElement('h4');
    const he3z = document.createElement('h3');
    const div1z = document.createElement('div');
    const div2z = document.createElement('div');
      
     
    cont1z.setAttribute("href", obj[frcx[ci]][i]["prolink"]);
      imgxz.setAttribute("src", obj[frcx[ci]][i]["imgz"]);
      he4z.textContent = obj[frcx[ci]][0]["frc"][0];
      he3z.textContent = obj[frcx[ci]][i]["nompro"];
      div1z.textContent = obj[frcx[ci]][i]["precio"];
      div2z.textContent = obj[frcx[ci]][i]["cuotas"];
     
      cont1az.appendChild(cont1z);
      cont1z.appendChild(imgxz);
       cont1z.appendChild(he4z);
       cont1z.appendChild(he3z);
       cont1z.appendChild(div1z);
       cont1z.appendChild(div2z);
         
       
        let a69=[(obj[frcx[ci]][0]["frc"][3])];
        
 document.getElementById(a69).appendChild(cont1az)


    }

        console.log("Cumplido");
      } else { }}
};
console.log();
 



  }

 
