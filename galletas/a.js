$(document).ready(function ()  {
   
    var HdeHermetica = document.getElementById ('HdeHermetica');HdeHermetica.style.color="red";
  
 })
 function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    let user = getCookie("culiao");
    if (user != "") {
        var valck = document.getElementById('valck');valck.value=("Welcome again " + user);
    } else {
      
    var HdeHermetica = document.getElementById ('HdeHermetica');HdeHermetica.innerHTML = "Escribi abajo tu nombre de Usuario"; 
     
    }
  }
function tuvieja() { 
    var valck=document.getElementById('valck');
    document.cookie = "culiao="+ valck.value;
}
function pingo(){
let pinga = document.cookie;
var valck=document.getElementById('valck');
 valck.value= pinga;
}