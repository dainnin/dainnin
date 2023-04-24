
  $(document).ready(function (){
    const requestURL = '../../inventario.json';
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
    var frcx=obj["frcrmd"];
    var za0=frcx[0];
    var za1=frcx[1];
    var za2=frcx[2];
    var zax=[za0,za1,za2]
    let ci=0;
    const oKT=obj[zax[ci]].length-1;
    function aaa2(){
      return Array.aaa=["starwarsx2", "pokemonx2",harrypx2]; }
for(ci;ci<3 ;++ci){
      console.log(oKT);
      for(cix=0;cix<=oKT;++cix){
      if(obj[zax[ci]][cix]["nompro"] == titlex.textContent) {

        const contx1 = document.createElement('div');
        const contx2 = document.createElement('div');
        const contx3 = document.createElement('div');
        const he2x = document.createElement('h2');
        const px = document.createElement('p');
        const hrx = document.createElement('hr');
        const ax = document.createElement('a');
        const imgx1 = document.createElement('img');
        
       
       
        
      
        imgx1.setAttribute("src",obj[zax[ci]][cix]["imgz"]);
        he2x.textContent = obj[zax[ci]][cix]["nompro"];
        px.textContent = obj[zax[ci]][cix]["descrip"];
        ax.setAttribute("href", obj[zax[ci]][cix]["linka"][1]);
        ax.textContent = obj[zax[ci]][cix]["linka"][0];
        
      
        
        
       
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
hez1.textContent=obj[zax[ci]][0]["frc"][1];
const contz2 = document.createElement('div');
contz2.setAttribute("class", "prsh");
contz2.setAttribute("id", "harrypx2" );
sectionxs.appendChild(contz1);
contz1.appendChild(hez1) 
contz1.appendChild(contz2);


console.log("Hola");
  for (i; i<b , 0!=b%7; ++i,++b) {
      
      
      const contz3 = document.createElement('div');
      const imgxz = document.createElement('img');
      const he4z = document.createElement('h4');
      const he3z= document.createElement('h3');
      const div1z = document.createElement('div');
      const div2z = document.createElement('div');
      
     
      
      imgxz.setAttribute("src", obj[zax[ci]][i]["imgz"]);
      he4z.textContent = obj[zax[ci]][0]["frc"][0];
      he3z.textContent = obj[zax[ci]][i]["nompro"];
      div1z.textContent = obj[zax[ci]][i]["precio"];
      div2z.textContent = obj[zax[ci]][i]["cuotas"];
     
     contz3.appendChild(imgxz);
     contz3.appendChild(he4z);
     contz3.appendChild(he3z);
     contz3.appendChild(div1z);
     contz3.appendChild(div2z);
         
  
     aaa2()[2].appendChild(contz3);


    }

        console.log("Cumplido");
      } else { }}
};
console.log();
 



  }

 