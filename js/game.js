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
    laser.classList.add('laser')
    let area = Math.floor(Math.random() * (95 - 0 + 1)) + 0;
    laser.style.top =  area - (i/1.5) + '%' ; 
    origine.appendChild(laser)
    gsap.to(".laser", {right: "1000000%", duration: 30})
  }
}
ShootLaser();

