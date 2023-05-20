



const csl=console.log;

         function relx(a){
      
    
 window.location.href=a;
window.location.href;



 /* window.location.reload(); */
}

const lectJson = async () => {
  try {

    const resp = await fetch('https://dainnin.github.io/proyectowebimg/inventario.json');
    const jsonObjList = await resp.json();
    return jsonObjList;
  } catch (pif) {
    csl(pif);

  };

};
const lengurl = location.href;
lectJson().then((obj) => {

let compr=1;



const contx1 = document.createElement('div');
          const contx2 = document.createElement('div');
          const contx3 = document.createElement('div');
          const he2x = document.createElement('h2');
          const px = document.createElement('p');
          const hrx = document.createElement('hr');
          const ax = document.createElement('a');
          const imgx1 = document.createElement('img');

/*###################################
#####################################
###################################*/



for (i=0;i<Object.keys(obj).length&&compr!="";++i){
  
  const franc=obj[Object.keys(obj)[i]]
   
      for( const ObjFranc of franc )  {   
      
    if(ObjFranc["idu"]!=undefined){
   

        if (lengurl.substring(lengurl.length - ObjFranc["idu"].length, lengurl.length).toLowerCase() ==  ObjFranc["idu"].toLowerCase()) {

         
          imgx1.setAttribute("src", ObjFranc["imgz"]);
          he2x.textContent = ObjFranc["nompro"];
          px.textContent = ObjFranc["descrip"];
          ax.setAttribute("href", ObjFranc["linka"][1]);
          titlex.textContent=ObjFranc["nompro"];
          ax.textContent = ObjFranc["linka"][0];



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
          contz1.setAttribute("id", franc[0]["frc"][2]);
          const hez1 = document.createElement('h1');
          hez1.textContent = franc[0]["frc"][1];
          const contz2 = document.createElement('div');
          contz2.setAttribute("class", "prsh");
          contz2.setAttribute("id", franc[0]["frc"][3]);
          sectionxs.appendChild(contz1);
          contz1.appendChild(hez1)
          contz1.appendChild(contz2);
         for(const SubFranc of franc){
         
          if (SubFranc["prolink"]!=undefined && ObjFranc["prolink"]!=SubFranc["prolink"]) {

          const cont1az = document.createElement('article');
          cont1az.innerHTML=
          `
          <a onclick="relx('${SubFranc["prolink"]}')"  >
            <img src="${SubFranc["imgz"]}">
            <h4>${franc[0]["frc"][0]}</h4>
            <h3>${SubFranc["nompro"]}</h3>
            <div>${SubFranc["precio"]}</div>
            <div>${SubFranc["cuotas"]}</div>
          </a>
        `;
        

          document.getElementById(franc[0]["frc"][3]).appendChild(cont1az);

          };
          compr="";
          
          };
        };
        };
        
      };
    
    };
  

  console.log();




});

