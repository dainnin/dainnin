let frameCount = 0;
let waveOffset = 0;
 const urlDefault="https://dainnin.github.io/proyectowebimg/assets/img/"
function urlTerrain(url,default_=urlDefault) {
   const wallImg = new Image();
  wallImg.src = default_+url;
  return wallImg
}
const imgTile ={}

const tileStyles = {
  wall: { color: "#594769", solid: true},
  rock: { image: "rock.png", /* color: "#6d351bf1", */ solid: true },
  grass: { image:"grass.png", /* color: "#88c070", */ solid: false },
  /* lava: { image: lavaImg }, */
  water: { color: "#3399ff", solid: false }
};
for(const key in tileStyles){

  if(tileStyles[key].image)imgTile[key]={["image"]:urlTerrain(tileStyles[key].image)}
}