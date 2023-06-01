
document.head.insertAdjacentHTML("afterbegin",`<link rel="stylesheet" href="./css/nav.css">
<link rel="stylesheet" href="./css/section.css">
<link rel="stylesheet" href="./css/main.css">
<link rel="stylesheet" href="./css/footer.css">
<link rel="stylesheet" href="./css/header.css">
<link rel="stylesheet" href="./css/principal.css">
`);
document.body.insertAdjacentHTML("afterbegin",`<nav id="navx">
<div class="blurx"></div>

<div class="noblur">
    <p>Nuevos Ingresos</p>
    <p>Descubrí el próximo Funko Pop de tu colección</p>
    <div id="decoshopx">
        <p id="decoshop"> SHOP</p>
    </div></a>
</div>

</nav>


<main id="mainx">
<div id="prsv">

</div>
<hr>
<section>
<div id="dibx">
<h1>Ultimos lanzamientos</h1>

<div id="prsh">

   
</div>   
</div>



    

</section>


</main>`);


var i = 1;
var b = 2;
var ix = 1;
var bx = 2;



    lectJson().then( (obj)=> {

function randomx ()
{ 
  
  return Math.floor(Math.random()* Object.keys(obj).length);

}
   



for (i; i<b , 0!=b%7; i++, b++) {
const cont1az = document.createElement('article');

var frc=Object.keys(obj);
var frcx=frc[randomx()];
cont1az.innerHTML=`<a href=${urlAct+"#"+obj[frcx][i]["idu"]}>
<img src=${obj[frcx][i]["imgz"]}>
<h4>${obj[frcx][0]["frc"][0]}</h4>
<h3>${obj[frcx][i]["nompro"]}</h3>
<div>${obj[frcx][i]["precio"]}</div>
<div>${obj[frcx][i]["cuotas"]}</div>
</a>`;
 
prsh.appendChild(cont1az);

};



for (ix; ix<bx , 0!=bx%5; ix++,bx++) {

const contx1 = document.createElement('div');
var frcz=frc[randomx()];
contx1.innerHTML=
`<div>
    <div>
      <h2>${obj[frcz][0]["frc"][0]}</h2>
      <p>${obj[frcz][0]["descrip"]}</p>
      </div>
      <hr>
      <a href=${obj[frcz][ix]["linka"][1]}>${obj[frcz][ix]["linka"][0]}</a>
      </div>
      <img src=${obj[frcz][ix]["imgz"]}>`;

prsv.appendChild(contx1);



};
    })