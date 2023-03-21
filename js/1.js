

$(document).ready(function () {
    $(window).resize(function () {
        
         pezo();
         
    });
    
   pezo();
    
    function pezo(){    
        
        if(window.innerWidth<=1005){
            logwi.textContent=""+xheader.clientWidth;
            let marglog = (xheader.clientWidth*0.918789-logohr.width)/2+"px";
            let mhr = (xheader.clientWidth*0.918789-menuheader.clientWidth)/2+"px";
            xheader.padding="0px 0px 0px 0px";
            
            logohr.style.padding= "0 0 0 "+ marglog; 
            menuheader.style.float="none";
            menuheader.style.padding= "0 0 0 " + mhr;
           
                     
        }
        if(window.innerWidth>1005){
            let centloghr=(xheader.clientHeight-logohr.height)/2+"px";
            let centhr=(xheader.clientHeight-menuheader.clientHeight)/2+"px";
            xheader.style.padding = "0 4vw 0 4vw";
            logohr.style.padding=centloghr + " 0 "+centloghr +" 0"; 
            menuheader.style.float="right";
            menuheader.style.padding= centhr + " 0 "+centhr +" 0"; 
            logwi.textContent="";
        }
       /* if (window.innerWidth>1275) {
            let shopx = document.getElementById('shopx')
            shopx.style.fontSize=30+'px';            
            let contacx = document.getElementById('contacx')
            contacx.style.fontSize=30+'px';  
            let ingrex = document.getElementById('ingrex')
            ingrex.style.fontSize=30+'px'; 
        } 
       
        if (window.innerWidth<=1275){
          
        let shopx = document.getElementById('shopx');
        shopx.style.fontSize=30*0.9+'px';            
        let contacx = document.getElementById('contacx');
        contacx.style.fontSize=30*0.9+'px';  
        let ingrex = document.getElementById('ingrex');
        ingrex.style.fontSize=30*0.9+'px';  
        } 
        if (window.innerWidth<=1157) {
            let shopx = document.getElementById('shopx');
            shopx.style.fontSize=30*0.8+'px';            
            let contacx = document.getElementById('contacx');
            contacx.style.fontSize=30*0.8+'px';  
            let ingrex = document.getElementById('ingrex');
            ingrex.style.fontSize=30*0.8+'px'; 
        } 
        
        if (window.innerWidth<=1030) {
            let shopx = document.getElementById('shopx');
            shopx.style.fontSize=30*0.7+'px';            
            let contacx = document.getElementById('contacx');
            contacx.style.fontSize=30*0.7+'px';  
            let ingrex = document.getElementById('ingrex');
            ingrex.style.fontSize=30*0.7+'px'; 
        } 
        if (window.innerWidth<=926){
        let shopx = document.getElementById('shopx');
        let shopxicon = document.getElementById('shopxicon');
        
            shopx.style.fontSize=30*0.7+'px';
           
            shopxicon.style.gridColumnStart=143;
            shopxicon.style.gridColumnEnd=155;
            shopxicon.style.gridRowStart=14;
            shopxicon.style.gridRowEnd=16;
            shopx.style.gridColumnStart=111;
            shopx.style.gridColumnEnd=121;
            shopx.style.gridRowStart=13;
            shopx.style.gridRowEnd=15;
          
        let contacx = document.getElementById('contacx');
            contacx.style.fontSize=30*0.7+'px'; 
            
            contacx.style.gridColumnStart=165;
            contacx.style.gridColumnEnd=175;
            contacx.style.gridRowStart=13;
            contacx.style.gridRowEnd=15;

        let ingrex = document.getElementById('ingrex');
            ingrex.style.fontSize=30*0.7+'px';
              
            ingrex.style.gridColumnStart=229;
            ingrex.style.gridColumnEnd=250;
            ingrex.style.gridRowStart=13;
            ingrex.style.gridRowEnd=15;
        
            let carrito = document.getElementById('carrito');
            ingrex.style.fontSize=30*0.7+'px';
              
            carrito.style.gridColumnStart=290;
            carrito.style.gridColumnEnd=300;
            carrito.style.gridRowStart=13;
            carrito.style.gridRowEnd=15;

            let logohr = document.getElementById('logohr');
            ingrex.style.fontSize=30*0.7+'px';
              
            logohr.style.gridColumnStart=111;
            logohr.style.gridColumnEnd=270;
            logohr.style.gridRowStart=3;
            logohr.style.gridRowEnd=12;
        } */

      /* mainx.style.width= window.innerWidth*1+ "px";

       let ax = mainx.style.height=  window.innerHeight * 1-200 + "px";
       
       barra.style.width= window.innerWidth*0.3+ "px";
        
        wh.textContent=  "Alto ventana: " + window.innerHeight +" px"  ;    
        
        barwh.textContent="Alto Barra: " + ax;*/


}

});


/*function menuHeaderx(){
    
var a=document.getElementById("headerx");
    
    if (headerx.style.height<="1px"){
       
        
    headerx.style.height="1px";}
   
    
}*/