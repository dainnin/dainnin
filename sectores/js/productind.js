
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
  

      } else { }
    }
  };
    
