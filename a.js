$(document).ready(function () {
      $(window).resize(function () {
           pezon();
      });
      
     pezon();
      
      function pezon(){     
// Get the size of the device screen
var screenWidth = screen.width;
var screenHeight = window.innerHeight;

// Get the browser window size
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

// Get the size of the entire webpage
const pageWidth  = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;
var lupi = document.getElementById('lupi');lupi.style.color = 'red'; 
if ( windowWidth < 650 && windowWidth > 449){('lupi');lupi.style.fontSize = windowWidth / windowWidth * 120 - 12 + "%";} else if (windowWidth <= 449) {('lupi');lupi.style.fontSize = windowWidth / screenWidth * 105 + "%"} else{('lupi');lupi.style.fontSize = windowWidth / screenWidth * 100 + 70 + "%"}

// Showing the sizes on the webpage9
var x = document.getElementById("screen");
x.innerHTML = "Device Screen: width: " + screenWidth + ", height: " + screenHeight + ".";

var y = document.getElementById("window");
y.innerHTML = "Browser Window: width: " + windowWidth + ", height: " + windowHeight + ".";

var z = document.getElementById("page");
z.innerHTML = "Webpage: width:" + pageWidth + ", height: " + pageHeight + ".";

};
}
9
);
      
