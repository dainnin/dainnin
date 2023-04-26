
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
  let ci = 0;
  var frcx = Object.keys(obj);
  var  nObj=Object.keys(obj).length; 
  var  nObjp=Object.keys(obj[frcx[ci]]).length;

  
  
  
  
  
  
 console.log(nObj, nObjp);
  for (ci; ci <nObj; ++ci) {
   
    for (cix = 0; cix <nObjp; ++cix) {
      if (obj[frcx[ci]][cix]["nompro"] == titlex.textContent) {
        
        const contx1 = document.createElement('div');
        const contx2 = document.createElement('div');
        const contx3 = document.createElement('div');
        const he2x = document.createElement('h2');
        const px = document.createElement('p');
        const hrx = document.createElement('hr');
        const ax = document.createElement('a');
        const imgx1 = document.createElement('img');
       

        
        imgx1.setAttribute("src", obj[frcx[ci]][cix]["imgz"]);
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
        contz1.setAttribute("id", "harrypx");
        const hez1 = document.createElement('h1');
        hez1.textContent = obj[frcx[ci]][0]["frc"][1];
        const contz2 = document.createElement('div');
        contz2.setAttribute("class", "prsh");
        contz2.setAttribute("id", obj[frcx[ci]][0]["frc"][3]);
        sectionxs.appendChild(contz1);
        contz1.appendChild(hez1)
        contz1.appendChild(contz2);
         
        console.log("Cumplido");
      

      } else { }
    }
  };
    
