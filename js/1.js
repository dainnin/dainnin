

$(document).ready(
   function(){
    if(window.innerWidth<=450){
        readhrxm()
     }
    else{ 
    if(window.innerWidth<=965)
    {
        readhrx();
    }
    else{
        readhrt();
        
    }
}

   }


    
    );
$(window).resize(
    
function redimen(){
    if(window.innerWidth<=450){
        readhrxm()
    }
else{
    if(window.innerWidth<=965)
    {
        readhrx();
    }else{
        readhrt();
    }
    
}
}
    );
   
    function readhrx(){
        /*menor*/
        let ax1=window.innerWidth+18-loghr.clientWidth;
        let ax2=ax1/2;
        let axr=ax2+"px";
        headerx.style.padding= "2rem "+axr+" 2rem "+axr;
        headerx.style.height="12.4rem";
        headerx.style.fontSize="2.5rem";
        menuhr.style.float="none"
        logwi.textContent="";
    };
    function readhrt(){
        
        /*mayor*/
        headerx.style.padding="4.8rem 4vw 4.8rem 4vw";
        headerx.style.height="4.8rem";
        headerx.style.fontSize="3rem";
        menuhr.style.float="right"
        logwi.textContent="";
        
    };
    function readhrxm(){
        if(window.innerWidth<=450)
        {
             /*menormenor*/
             carrito.style.width="8%";
             loghr.style.width="90%";
             headerx.style.padding= "2rem 1vw 2rem 1.5vw";
             headerx.style.height="12.4rem";
             headerx.style.fontSize="1.35rem";
             menuhr.style.float="none";
             logwi.textContent="";
        }
    }