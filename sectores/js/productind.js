

const csl=console.log;

         function relx(a){
 location.href=a;
 window.location.reload();
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

var frcx = Object.keys(obj).length;

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
          const cont1z = document.createElement('a');
          
          cont1z.setAttribute("onclick", "relx("+"'"+SubFranc["prolink"]+"'"+")")
          const imgxz = document.createElement('img');
          const he4z = document.createElement('h4');
          const he3z = document.createElement('h3');
          const div1z = document.createElement('div');
          const div2z = document.createElement('div');
          var frc = Object.keys(obj);



          imgxz.setAttribute("src", SubFranc["imgz"]);
          cont1z.setAttribute("href", SubFranc["prolink"]);;
          he4z.textContent = franc[0]["frc"][0];
          he3z.textContent = SubFranc["nompro"];
          div1z.textContent = SubFranc["precio"];
          div2z.textContent = SubFranc["cuotas"];
         
          cont1az.appendChild(cont1z);
          cont1z.appendChild(imgxz);
          cont1z.appendChild(he4z);
          cont1z.appendChild(he3z);
          cont1z.appendChild(div1z);
          cont1z.appendChild(div2z);

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
