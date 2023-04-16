

async function objList() {

  const requestURL = 'https://raw.githubusercontent.com/dainnin/proyectowebimg/449c9c3d358a93d0e8cc307f7f6d63a29adb4a21/inventario.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const jsonObjListText = await response.text();

  const jsonObjList = JSON.parse(jsonObjListText);
  objImglistprsh(jsonObjList);
  objImglistprvh(jsonObjList);
}

function objImglistprvh(obj) {
  let i=1;
  let b=2;
  let za1=[ "starwars", "pokemon","harryp"]
  let za = za1[Math.floor(Math.random()*3)] ;
  console.log(za)
  for (i; i<b , 0!=b%6; ++i,++b) {

    const contx1 = document.createElement('div');
    const contx2 = document.createElement('div');
    const contx3 = document.createElement('div');
    const he2x = document.createElement('h2');
    const px = document.createElement('p');
    const hrx = document.createElement('hr');
    const ax = document.createElement('a');
    const imgx1 = document.createElement('img');
    
   
   
    imgx1.setAttribute("src", obj[za][i]["imgz"]);
    he2x.textContent = obj[za][0];
    px.textContent = obj[za][i]["descrip"];
    ax.setAttribute("href", obj[za][i]["linka"][1]);
    ax.textContent = obj[za][i]["linka"][0];
    

   
    contx1.appendChild(contx2);
    contx2.appendChild(contx3);
    contx3.appendChild(he2x);
    contx3.appendChild(px);
    contx2.appendChild(hrx);
    contx2.appendChild(ax);
    contx1.appendChild(imgx1);
    
    prsv.appendChild(contx1);
}
}
function objImglistprsh(obj) {
  let i=1;
  let b=2;
  let za1=[ "starwars", "pokemon","harryp"]
  let za = za1[Math.floor(Math.random()*3)] ;
 
  const prsho = obj;
 
 for (i; i<b , 0!=b%7; ++i,++b) {
  console.log(i,b)
    const cont1 = document.createElement('div');
    const imgx = document.createElement('img');
    const he4 = document.createElement('h4');
    const he3 = document.createElement('h3');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    
   

    imgx.setAttribute("src", prsho[za][i]["imgz"]);
    he4.textContent = prsho[za][0];
    he3.textContent = prsho[za][i]["nompro"];
    div1.textContent = prsho[za][i]["precio"];
    div2.textContent = prsho[za][i]["cuotas"];

   cont1.appendChild(imgx);
    cont1.appendChild(he4);
    cont1.appendChild(he3);
    cont1.appendChild(div1);
    cont1.appendChild(div2);
    /* console.log(prsho[za][i]["imgz"]) */
   
    prsh.appendChild(cont1);
  }
}

objList();

