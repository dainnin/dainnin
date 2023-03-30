

/*$(document).ready(
   function(){
    if(window.innerWidth<=450){
        readhrxm()
     }
    
    if(window.innerWidth<=965 && window.innerWidth>450){
    
        readhrx();
    }
    if(window.innerWidth>965)
    {
       
    readhrt();
    }   


   }
    
    );
$(window).resize(
    
function redimen(){
    if(window.innerWidth<=450){
        readhrxm()
    }
else{
    if(window.innerWidth<=965 && window.innerWidth>450)
    {
        readhrx();
    }else{  if(window.innerWidth>965)
        {
           
        readhrt();
        }
    }
}
}
    );
   
    function readhrx(){
        /*menor*/
        var ax1=window.innerWidth+18-loghr.clientWidth;
        var ax2=ax1/2;
        var axr=ax2+"px";
        headerx.style.padding= "2rem "+axr+" 2rem "+axr;
        headerx.style.height="14.4rem";
        headerx.style.fontSize="2.5rem";
        menuhr.style.float="none"
        loghr.style.width="auto";
        logwi.textContent="";
    };
    function readhrt(){
        
        /*mayor*/
        headerx.style.padding="4.8rem 4vw 4.8rem 4vw";
        headerx.style.height="4.8rem";
        headerx.style.fontSize="3rem";
        headerx.style.height="14.4rem";
        menuhr.style.float="right"
        loghr.style.width="auto";
        logwi.textContent="";
        
    };
    function readhrxm(){
      
        
             /*menormenor*/
             carrito.style.width="8%";
             loghr.style.width="90%";
             headerx.style.padding= "3rem 1vw 2rem 10vw";
             headerx.style.height="14.4rem";
             headerx.style.fontSize="1.35rem";
             menuhr.style.float="none";
             logwi.textContent="";
        
    }*/