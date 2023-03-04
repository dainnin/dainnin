$(document).ready(function () {
      $(window).resize(function () {
           Harry();
      });
      
      Harry();
      
      function Harry(){
          
          
        if ($(window).width() >=900 ) {
          var lupi=document.getElementById(lupi);
          $("#lupi").css({"font-size":"150%"});
          
          } else {
            var lupi=document.getElementById(lupi);
          $("#lupi").css({"font-size":"100%"});
              
          }
      }
  }); 
