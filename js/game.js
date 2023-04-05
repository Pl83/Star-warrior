
//Make the X-wing draggagle:
dragElement(document.getElementById("Xwing"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


// laser beam
const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
} 
const ShootLaser = async () => {
  for (let i = 0; i < 200; i++) {
    await sleep(100)
    let origine = document.querySelector('#origine')
    let laser = document.createElement('div')
    let box = document.createElement('div')
    laser.classList.add('laser')
    box.classList.add('laserbox')
    laser.appendChild(box)
    let area = Math.floor(Math.random() * (95 - 0 + 1)) + 0;
    laser.style.top =  area - (i/1.5) + '%' ; // correctif car sinon les lasers sont de plus en plus bas jusqu'à disparaitre
    origine.appendChild(laser)
    gsap.to(".laser", {right: "1000000%", duration: 30}) // faire bouger les laser
    let base = document.querySelector('#base')
  }
}


// hitbox with addeventlistener
var hit = 0;
var ShildHp = 3;
var XwingHp = 1; 

function detecterCollision() {
  
  const base = document.getElementById("base");
  const lasers = document.querySelectorAll(".laser");
  // Récupérer les coordonnées de l'élément base
  const rectBase = base.getBoundingClientRect();
  
  // Boucler sur tous les éléments laser
  lasers.forEach(laser => {
    // Récupérer les coordonnées de l'élément laser
    const rectLaser = laser.getBoundingClientRect();
    
    // Vérifier s'il y a une collision entre les deux éléments
    if (rectBase.left < rectLaser.right && rectBase.right > rectLaser.left &&
        rectBase.top < rectLaser.bottom && rectBase.bottom > rectLaser.top) {
      // Il y a collision !
      console.log("Collision détectée entre la base et un laser !");
      hit ++;
      lasers.forEach(laser => laser.remove());
      if (hit == ShildHp) {
        let base = document.querySelector('#base');
        base.style.backgroundColor = "rgba(0, 0, 0, 0)";
      } else if (hit - ShildHp == XwingHp) {
        let Xwing = document.querySelector('#Xwing')
        Xwing.style.display = "none";
      }
    }
  });
}

// animate background 
gsap.to("#bg", {
  x: "-100%",
  duration: 40,
  ease: "none",
  repeat: 0
});


function play(){
  ShootLaser();
  setInterval(detecterCollision, 10);
}
play();