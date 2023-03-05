$(document).ready(function () {
      $(window).resize(function () {
           Harry();
      });
      
      Harry();
      
      function Harry(){
          
         var screenWidth2 = screen.width/screen.width*100;
         var pte = window.innerWidth/screen.width*100;
      if (screen.width < screen.height ) { if (pte>=screenWidth2) {
          var lupi=document.getElementById(lupi);
          $("#lupi").css({"font-size":"150%"});
          
          } else {
            var lupi=document.getElementById(lupi);
          $("#lupi").css({"font-size":"100%"});
              
          }}else{}
      }
  }); 
           
$(document).ready(function () {
      $(window).resize(function () {
           pezon();
      });
      
     pezon();
      
      function pezon(){     
// Get the size of the device screen
var screenWidth = screen.width/screen.width*100;
var screenHeight = window.innerWidth/screen.width*100;

// Get the browser window size
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

// Get the size of the entire webpage
const pageWidth  = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;

// Showing the sizes on the webpage
var x = document.getElementById("screen");
x.innerHTML = "Device Screen: width: " + screenWidth + ", height: " + screenHeight + ".";

var y = document.getElementById("window");
y.innerHTML = "Browser Window: width: " + windowWidth + ", height: " + windowHeight + ".";

var z = document.getElementById("page");
z.innerHTML = "Webpage: width:" + pageWidth + ", height: " + pageHeight + ".";
}

}); 
      
