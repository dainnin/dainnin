
         
$(document).ready(function () {
    $(window).resize(function () {
         pezon();
    });
    
   pezon();
    
    function pezon(){     
// Get the size of the device screen
var screenWidth = screen.width;
var screenHeight = screen.height;

// Get the browser window size
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var centnav=document.getElementById('centnav');centnav.style.width= windowWidth*0.7+"px";
centnav.style.height= windowHeight*0.98-33+"px";
var barizq=document.getElementById('barizq');barizq.style.width= windowWidth*0.27-7+"px";
barizq.style.height= windowHeight*0.98-33+"px";


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
    
