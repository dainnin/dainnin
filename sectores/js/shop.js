async function objList() {

    const requestURL = 'https://raw.githubusercontent.com/dainnin/proyectowebimg/main/inventario.json';
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    const jsonObjListText = await response.text();
  
    const jsonObjList = JSON.parse(jsonObjListText);
    objImglistshop1(jsonObjList);
   /*  objImglistshop2(jsonObjList);
    objImglistshop3(jsonObjList); */
  }
  $(document).ready (function (){
   
    const cont1 = document.createElement('div');
    cont1.setAttribute("class", "dibx");
    cont1.setAttribute("id", "harrypx");
    const he1 = document.createElement('h1');
    he1.textContent="Harry Potter";
    const cont2 = document.createElement('div');
    cont2.setAttribute("class", "prsh");
    cont2.setAttribute("id", "harrypx2");
    sectionxs.appendChild(cont1);
    cont1.appendChild(he1) 
    cont1.appendChild(cont2);

    /****/
    const contx1 = document.createElement('div');
    contx1.setAttribute("class", "dibx");
    contx1.setAttribute("id", "starwarsx");
    const hex1 = document.createElement('h1');
    hex1.textContent="Star Wars";
    const contx2 = document.createElement('div');
    contx2.setAttribute("class", "prsh");
    contx2.setAttribute("id", "starwarsx2");
    sectionxs.appendChild(contx1);
    contx1.appendChild(hex1) 
    contx1.appendChild(contx2);
/********/

const contz1 = document.createElement('div');
contz1.setAttribute("class", "dibx");
contz1.setAttribute("id", "pokemonx");
const hez1 = document.createElement('h1');
hez1.textContent="Pokemon";
const contz2 = document.createElement('div');
contz2.setAttribute("class", "prsh");
contz2.setAttribute("id", "pokemonx2");
sectionxs.appendChild(contz1);
contz1.appendChild(hez1) 
contz1.appendChild(contz2);

  })
  function objImglistshop1(obj) {
    
  var i=1;
  var b=2;
  var za=[ "harryp","starwars", "pokemon"];
  var za0=za[0];
  var za1=za[1];
  var za2=za[2];
  console.log(obj[za0][0],obj[za0][i]["nompro"]);

  for (i; i<b , 0!=b%6; ++i,++b) {
      
      
      const contz3 = document.createElement('div');
      const imgxz = document.createElement('img');
      const he4z = document.createElement('h4');
      const he3z= document.createElement('h3');
      const div1z = document.createElement('div');
      const div2z = document.createElement('div');
      
     
      console.log(obj[za0][i]["imgz"]);
      imgxz.setAttribute("src", obj[za2][i]["imgz"]);
      he4z.textContent = obj[za2][0];
      he3z.textContent = obj[za2][i]["nompro"];
      div1z.textContent = obj[za2][i]["precio"];
      div2z.textContent = obj[za2][i]["cuotas"];
     
     contz3.appendChild(imgxz);
     contz3.appendChild(he4z);
     contz3.appendChild(he3z);
     contz3.appendChild(div1z);
     contz3.appendChild(div2z);
     
      
      
  
      pokemonx2.appendChild(contz3);


      const cont3 = document.createElement('div');
      const imgx = document.createElement('img');
      const he4 = document.createElement('h4');
      const he3 = document.createElement('h3');
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      
     
     
      imgx.setAttribute("src", obj[za0][i]["imgz"]);
      he4.textContent =obj[za0][0];
      he3.textContent = obj[za0][i]["nompro"];
      div1.textContent =obj[za0][i]["precio"];
      div2.textContent = obj[za0][i]["cuotas"];
     
     
     cont3.appendChild(imgx);
     cont3.appendChild(he4);
     cont3.appendChild(he3);
     cont3.appendChild(div1);
     cont3.appendChild(div2);
     
      
      
  
      harrypx2.appendChild(cont3);

      const contx3 = document.createElement('div');
      const imgxx = document.createElement('img');
      const he4x = document.createElement('h4');
      const he3x = document.createElement('h3');
      const div1x = document.createElement('div');
      const div2x = document.createElement('div');
      
     
     
      imgxx.setAttribute("src",obj[za1][i]["imgz"]);
      he4x.textContent = obj[za1][0];
      he3x.textContent = obj[za1][i]["nompro"];
      div1x.textContent =obj[za1][i]["precio"];
      div2x.textContent = obj[za1][i]["cuotas"];
     
     contx3.appendChild(imgxx);
     contx3.appendChild(he4x);
     contx3.appendChild(he3x);
     contx3.appendChild(div1x);
     contx3.appendChild(div2x);
     
      
      
  
      starwarsx2.appendChild(contx3);
    }
   /* for (i; i<b , 0!=b%6; ++i,++b) {
      
      
     
    }
    for (i; i<b , 0!=b%6; ++i,++b) {
      
      
    
    } */
  }

 
  objList();
