document.head.insertAdjacentHTML("afterbegin",`
<link rel="stylesheet" href="./css/prest.css">
<link rel="stylesheet" href="./css/seccion1.css">
<link rel="stylesheet" href="./css/footer.css">
<link rel="stylesheet" href="./css/header.css">
<link rel="stylesheet" href="./css/principal.css">
`);




const lengurl = location.href;
lectJson().then((obj) => {

let compr=1;

document.body.insertAdjacentHTML("afterbegin",`

<main id="mainx">

</main>`);

const contx1 = document.createElement('div');
          
       




for (i=0;i<Object.keys(obj).length&&compr!="";++i){
  
  const franc=obj[Object.keys(obj)[i]]
   
      for( const ObjFranc of franc )  {   
      
    if(ObjFranc["idu"]!=undefined){
   

        if (lengurl.substring(lengurl.length - ObjFranc["idu"].length, lengurl.length).toLowerCase() ==  ObjFranc["idu"].toLowerCase()) {

         contx1.innerHTML=`<div>
         <div>
         <h2>${ObjFranc["nompro"]}</h2>
         <p>${ObjFranc["descrip"]}</p>
         </div>
         <hr>
         <a href=${ObjFranc["linka"][1]}>${ObjFranc["linka"][0]}</a>
         </div>
         <img src=${ObjFranc["imgz"]}>`;
       
          
          

          mainx.appendChild(contx1);
          document.body.insertAdjacentHTML("afterbegin",`<section id="sectionxs">

<div class="dibx" id=${franc[0]["frc"][2]}>
<h1>${franc[0]["frc"][1]}</h1>
<div class="prsh" id=${franc[0]["frc"][3]}>
</div>
</div>
</section>`)
         
         for(const SubFranc of franc){
         
          if (SubFranc["idu"]!=undefined && ObjFranc["idu"]!=SubFranc["idu"]) {

          const cont1az = document.createElement('article');
          cont1az.innerHTML=
          `
          <a onclick="relx('${urlCap+"#"+SubFranc["idu"]}')"  >
            <img src="${SubFranc["imgz"]}">
            <h4>${franc[0]["frc"][0]}</h4>
            <h3>${SubFranc["nompro"]}</h3>
            <div>${SubFranc["precio"]}</div>
            <div>${SubFranc["cuotas"]}</div>
          </a>
        `;
        
        document.getElementById(franc[0]["frc"][3]).appendChild(cont1az)
 

          };
          compr="";
          
          };
        };
        };
        
      };
    
    };
  

 



});

