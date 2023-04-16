



  const requestURL = 'https://raw.githubusercontent.com/dainnin/proyectowebimg/main/inventario.json';
     const request = new XMLHttpRequest;
    request.open('GET', requestURL);
    request.responseType='json';
    request.send();
    request.onload = function () {
    var obj = request.response;
    objImglistprvh(obj);
};

function objImglistprvh(obj) {
   
  var i=1;
  var b=2;
  var za1=[ "starwars", "pokemon","harryp"];
  var za = za1[Math.floor(Math.random()*3)] ;



for (i; i<b , 0!=b%7; ++i,++b) {
 
  const cont1z = document.createElement('div');
  const imgxz = document.createElement('img');
  const he4z = document.createElement('h4');
  const he3z = document.createElement('h3');
  const div1z = document.createElement('div');
  const div2z = document.createElement('div');
  
 
  
  imgxz.setAttribute("src", obj[za][i]["imgz"]);
  he4z.textContent = obj[za][0];
  he3z.textContent = obj[za][i]["nompro"];
  div1z.textContent = obj[za][i]["precio"];
  div2z.textContent = obj[za][i]["cuotas"];

 cont1z.appendChild(imgxz);
  cont1z.appendChild(he4z);
  cont1z.appendChild(he3z);
  cont1z.appendChild(div1z);
  cont1z.appendChild(div2z);
  
 
  prsh.appendChild(cont1z);
};

var ix=1;
var bx=2;
var zax = za1[Math.floor(Math.random()*3)] ;
for (ix; ix<b , 0!=bx%5; ++ix,++bx) {

  const contx1 = document.createElement('div');
  const contx2 = document.createElement('div');
  const contx3 = document.createElement('div');
  const he2x = document.createElement('h2');
  const px = document.createElement('p');
  const hrx = document.createElement('hr');
  const ax = document.createElement('a');
  const imgx1 = document.createElement('img');
  
 
  
  imgx1.setAttribute("src", obj[zax][ix]["imgz"]);
  he2x.textContent = obj[zax][0];
  px.textContent = obj[zax][ix]["descrip"];
  ax.setAttribute("href", obj[zax][ix]["linka"][1]);
  ax.textContent = obj[zax][ix]["linka"][0];
  

 
  contx1.appendChild(contx2);
  contx2.appendChild(contx3);
  contx3.appendChild(he2x);
  contx3.appendChild(px);
  contx2.appendChild(hrx);
  contx2.appendChild(ax);
  contx1.appendChild(imgx1);
  
  prsv.appendChild(contx1);


 
};
};
