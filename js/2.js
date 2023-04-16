

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
  const prsvo = obj.prvh;

  for (const product of prsvo) {
    const contx1 = document.createElement('div');
    const contx2 = document.createElement('div');
    const contx3 = document.createElement('div');
    const he2x = document.createElement('h2');
    const px = document.createElement('p');
    const hrx = document.createElement('hr');
    const ax = document.createElement('a');
    const imgx1 = document.createElement('img');
    
   
   
    imgx1.setAttribute("src", product.imgz);
    he2x.textContent = product.serpel;
    px.textContent = product.descrip;
    ax.setAttribute("href", product.linka[1]);
    ax.textContent = product.linka[0];
    

   
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
  
  const prsho = obj.prsh;

  for (const product of prsho) {
    const cont1 = document.createElement('div');
    const imgx = document.createElement('img');
    const he4 = document.createElement('h4');
    const he3 = document.createElement('h3');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
   
    imgx.setAttribute("src", product.imgz);
    he4.textContent = product.serpel;
    he3.textContent = product.nompro;
    div1.textContent = product.precio;
    div2.textContent = product.cuotas;

   /* const superPowers = hero.powers;
    for (const power of superPowers) {
      const listItem = document.createElement('li');
      listItem.textContent = power;
      myList.appendChild(listItem);
    }*/
   cont1.appendChild(imgx);
    cont1.appendChild(he4);
    cont1.appendChild(he3);
    cont1.appendChild(div1);
    cont1.appendChild(div2);
    

    prsh.appendChild(cont1);
  }
}

objList();

