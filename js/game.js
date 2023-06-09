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
    laser.id = 'laser' + i
    let area = Math.floor(Math.random() * (95 - 0 + 1)) + 0;
    laser.style.top =  area - (i/2) + '%' ; // correctif car sinon les lasers sont de plus en plus bas jusqu'à disparaitre
    origine.appendChild(laser)
    gsap.to(".laser", {right: "1000000%", duration: 30}) // faire bouger les laser
  }
  await sleep(2500)
  let win = document.querySelector('#win')
  win.style.zIndex = "3";
  gsap.to("#win", {opacity: 1, duration: 1});
}

const DeleteLaser = async () => {
  await sleep(5000)
  for (let i = 0; i < Fire; i++) {
    await sleep(100)
    let laser = document.querySelector('#laser' + i)
    laser.remove()
  }
}


// hitbox with addeventlistener
var hit = 0; // initialise le compteur de hit

// console.log(ShildHp + Hp); // affiche le nombre de hp total
function detecterCollision() {

  var ShildHp = MyShip.shield; // definie les hp du shield
  var Hp = MyShip.hp; // definie les hp du Xwing

  let StatusShield = document.querySelector('#StatusShield')
  let StatusHp = document.querySelector('#StatusHp')
  
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
       // clean le shield a l'impact
      if (StatusShield.lastChild != null) {
        StatusShield.lastChild.remove();
      } else if (StatusHp.lastChild != null) {
        StatusHp.lastChild.remove();
      }
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

// music 
var audio = new Audio('SoundEffect/SFM.mp3');
let OnOff = document.querySelector('#music');
    OnOff.addEventListener('click', function() {
  if (OnOff.checked == true) {
    console.log("on");
    audio.play();
  } else {
    console.log("off");
    audio.pause();
  }
});

// status 
function stat() {
  let StatusShield = document.querySelector('#StatusShield');
  let StatusHp = document.querySelector('#StatusHp');
  nb1 = MyShip.hp;
  nb2 = MyShip.shield;
  console.log(nb1);
  console.log(nb2);
  for (let i = 0; i < nb1; i++) {
    let Hp = document.createElement('span');
    Hp.classList.add('spanstyle');
    StatusHp.appendChild(Hp);
  }
  for (let i = 0; i < nb2; i++) {
    let Shield = document.createElement('span');
    Shield.classList.add('spanstyle');
    StatusShield.appendChild(Shield);
  }
}

// launch game
function play(){
  console.log(MyShip);
  if (MyShip != 0) {
    dragElement(document.getElementById(MyShip.id));
    let MakeAppear = document.querySelector('#'+MyShip.id);
    MakeAppear.style.display = "block";
    document.getElementById("menu").style.display = "none";
    stat();
    background();
    ShootLaser();
    DeleteLaser();
    setInterval(detecterCollision, 10);
  } else {
    alert("You must choose a ship before playing");
  }
}

// restart game
function restart(){
  location.reload();
}


/* script game numero 2 */



// Ajoute un gestionnaire d'événements pour l'événement mousemove
let screen = document.querySelector('#screen');



var takedown = 0;

let target = document.createElement('div');
target.classList.add('target');
screen.appendChild(target);

var ennemies = {
  1 : {
    type: 'img/xwing.png'
  },
  2 : {
    type: 'img/awing.png'
  },
  3 : {
    type: 'img/ETA.png'
  }
}


const Traj1 = async () => {
  nb = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  let ship = document.createElement('div');
  ship.classList.add('target' + nb);
  ship.id = "Traj1";
  screen.appendChild(ship);
  if (nb == 3) {
    gsap.to("#Traj1", {rotate: "30deg", duration: 0, ease: "none"})
  } else {
    gsap.to("#Traj1", {rotate: "120deg", duration: 0, ease: "none"})
  }
  gsap.fromTo("#Traj1", {left: "-10%", top: "0%"}, {left: "100%", top: "100%", duration: 3, ease: "none"});
  // remove
  setTimeout(function(){
    ship.remove();
  }, 3000);
}

const Traj2 = async () => {
  nb = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  let ship = document.createElement('div');
  ship.classList.add('target' + nb);
  ship.id = "Traj2";
  screen.appendChild(ship);
  if (nb == 3) {
    gsap.to("#Traj2", {rotate: "-210deg", duration: 0, ease: "none"})
  } else {
    gsap.to("#Traj2", {rotate: "-120deg", duration: 0, ease: "none"})
  }
  gsap.fromTo("#Traj2", {left: "110%", top: "0%"}, {left: "-10%", top: "100%", duration: 3, ease: "none"});
  // remove
  setTimeout(function(){
    ship.remove();
  }, 3000);
}

const Traj3 = async () =>{
  nb = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  let ship = document.createElement('div');
  ship.classList.add('target' + nb);
  ship.id = "Traj3";
  screen.appendChild(ship);
  if (nb == 3) {
    gsap.to("#Traj3", {rotate: "210deg", duration: 0, ease: "none"})
  } else {
    gsap.to("#Traj3", {rotate: "300deg", duration: 0, ease: "none"})
  }
  gsap.fromTo("#Traj3", {left: "110%", top: "100%"}, {left: "-10%", top: "0%", duration: 3, ease: "none"});
  // remove
  setTimeout(function(){
    ship.remove();
  }, 3000);
}

const Traj4 = async () =>{
  nb = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  let ship = document.createElement('div');
  ship.classList.add('target' + nb);
  ship.id = "Traj4";
  screen.appendChild(ship);
  if (nb == 3) {
    gsap.to("#Traj4", {rotate: "-30deg", duration: 0, ease: "none"})
  } else {
    gsap.to("#Traj4", {rotate: "-300deg", duration: 0, ease: "none"})
  }
  gsap.fromTo("#Traj4", {left: "-10%", top: "100%"}, {left: "100%", top: "0%", duration: 3, ease: "none"});
  // remove
  setTimeout(function(){
    ship.remove();
  }, 3000);
}

var Aim = 0;
var currentEventListener = 'click'; // initial value

async function AimOn() {
  if (Aim == 0) {
    Aim = 1;
    currentEventListener = 'mouseover';
    document.querySelector('.blank2>p').style.color = "red";
  } else {
    currentEventListener = 'click'; 
    Aim = 0;
    document.querySelector('.blank2>p').style.color = "rgb(70, 70, 70)";
  }
}

async function laugth(){
  for (let i = 0; i < 50000 ; i++){
    nb1 = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    nb2 = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    if (nb1 == nb2) {
      nb2 = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    } else {
      if (nb1 == 1) {
        Traj1();
      }
      if (nb1 == 2) {
        Traj2();
      }
      if (nb1 == 3) {
        Traj3();
      }
      if (nb1 == 4) {
        Traj4();
      }
      if (nb2 == 1) {
        Traj1();
      }
      if (nb2 == 2) {
        Traj2();
      }
      if (nb2 == 3) {
        Traj3();
      }
      if (nb2 == 4) {
        Traj4();
      }
      let ship1 = document.querySelector('#Traj' + nb1);
      let ship2 = document.querySelector('#Traj' + nb2);
      let ships = [ship1, ship2];

      console.log(Aim);
        ships.forEach(ship => {
          ship.addEventListener(currentEventListener, function(){
            takedown++;
            let takedownText = document.querySelector('#takedown');
            takedownText.innerHTML = takedown;  
            let tire = document.createElement('div');
            tire.classList.add('tire');
            screen.appendChild(tire);
            gsap.to(tire, {left: ship.offsetLeft, top: ship.offsetTop, duration: 0.1, ease: "none"});
            setTimeout(function(){
              tire.remove();
            }, 200);
            ship.style.backgroundImage = "url('img/explosion.png')";
            setTimeout(function(){
              ship.remove();
            }, 400);
          })
        })
      await sleep(3000)
    }    
  }
}


function empire() {
  let Faction = document.querySelector('#Faction');
  Faction.style.display = "none";
  laugth();
}

function rebel() {
  let Faction = document.querySelector('#Faction');
  Faction.style.display = "none";
  let GameTwo = document.querySelector('#GameTwo');
  GameTwo.style.display = "none";
}

function reload() {
  window.location.href = "intro.html";
}