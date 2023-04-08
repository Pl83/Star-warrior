var aircraft = {
  1: {shield: 4, hp: 2, path: '../img/xwing.png', name: 'X-Wing', id: 'Xwing', box: 'Xbase'},
  2: {shield: 2, hp: 2, path: '../img/awing.png', name: 'A-Wing', id: 'Awing' , box: 'Abase'},
  3: {shield: 2, hp: 3, path: '../img/ETA.png', name: 'ETA', id: 'ETA' , box: 'ETAbase'},
}



var MyShip = 0;
var Fire = 100;


let card = document.querySelectorAll('.descrip')
card.forEach((card) => {
  card.addEventListener('click', () => {
    MyShip = aircraft[card.id]
    console.log(MyShip)
    let textarea = document.querySelector('#MyShip')
    textarea.innerHTML = 'You choose the ' + MyShip.name
  })
})

let textnbl = document.querySelector('#textnbl')
let nbl = document.querySelector('#nbl')
nbl.addEventListener('change', () => {
  Fire = nbl.value
  textnbl.innerHTML = 'Nombre de Lasers :' + Fire
})




//Controller 1 : Drag and drop

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
  // active le drag and drop sur l'élément Xwing


// Controller 2 : mouse
// function cursorxwing() {
//   const cursor = document.querySelector('#Xwing');

// document.addEventListener('mousemove', e => {
//   cursor.style.display = 'block';
//   cursor.style.left = e.clientX - cursor.offsetWidth / 2 + 'px';
//   cursor.style.top = e.clientY - cursor.offsetHeight / 2 + 'px';
//   document.body.style.cursor = 'none'; // masque le curseur de la souris
// });

// document.addEventListener('mouseleave', e => {
//   cursor.style.display = 'none';
//   document.body.style.cursor = 'default'; // rétablit le curseur de la souris par défaut
// });
// }
// cursorxwing(); // active le curseur sur l'élément Xwing



// laser beam


const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
} 
const ShootLaser = async () => {
  for (let i = 0; i < Fire; i++) {
    await sleep(100)
    let origine = document.querySelector('#origine')
    let laser = document.createElement('div')
    laser.classList.add('laser')
    let area = Math.floor(Math.random() * (95 - 0 + 1)) + 0;
    laser.style.top =  area - (i/1.2) + '%' ; // correctif car sinon les lasers sont de plus en plus bas jusqu'à disparaitre
    origine.appendChild(laser)
    gsap.to(".laser", {right: "1000000%", duration: 30}) // faire bouger les laser
  }
  await sleep(2500)
  let win = document.querySelector('#win')
  win.style.zIndex = "3";
  gsap.to("#win", {opacity: 1, duration: 1});
}


// hitbox with addeventlistener
var hit = 0; // initialise le compteur de hit

 // console.log(ShildHp + Hp); // affiche le nombre de hp total

function detecterCollision() {

  var ShildHp = MyShip.shield; // definie les hp du shield
  var Hp = MyShip.hp; // definie les hp du Xwing
  
  const base = document.getElementById(MyShip.box);
  //console.log(base);
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
      console.log('Hit: ' + hit + 'Shield: ' + ShildHp );
      //console.log(hit);
      laser.remove(); // clean le laser a l'impact
      if (hit == ShildHp) {

        let base = document.querySelector('#' + MyShip.box);
        base.style.backgroundColor = "rgba(0, 0, 0, 0)";
      } else if (hit - ShildHp == Hp) {
        let destroid = document.querySelector('#' + MyShip.id);
        destroid.style.display = "none";
        let endgame = document.querySelector('#endgame')
        endgame.style.zIndex = "4";
        gsap.to("#endgame", {opacity: 1, duration: 1});
      }
    }
  });
}


// animate background 
function background() {
  gsap.to("#bg", {
    x: "-100%",
    duration: 40,
    ease: "none",
    repeat: 0
  });
}


// launch game
function play(){
  console.log(MyShip);
  if (MyShip != 0) {
    dragElement(document.getElementById(MyShip.id));
    let MakeAppear = document.querySelector('#'+MyShip.id);
    MakeAppear.style.display = "block";
    document.getElementById("menu").style.display = "none";
    background();
    ShootLaser();
    setInterval(detecterCollision, 10);
  } else {
    alert("You must choose a ship before playing");
  }
}



// restart game
function restart(){
  location.reload();
}