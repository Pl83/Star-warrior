const stars = 400;

for (let i = 0; i < stars; i++) {
  let star = document.createElement("div");
  star.className = "stars";
  var xy = randomPosition();
  star.style.top = xy[0] + "px";
  star.style.left = xy[1] + "px";
  document.body.append(star);
}

function randomPosition() {
  var y = window.innerWidth;
  var x = window.innerHeight;
  var randomX = Math.floor(Math.random() * x);
  var randomY = Math.floor(Math.random() * y);
  return [randomX, randomY];
}

gsap.to(".button" , {opacity : 1 , duration: 1 , delay : 33})

gsap.to(
  "#content",
  {
    top:"-200%",
    duration: 40,
    delay: 13,
    ease:Sine.easeInOut,
  }
);

// create a timeline
let introTimeline = gsap.timeline()

introTimeline.delay(0.5)

// add the tweens to the timeline - Note we're using tl.to not gsap.to
introTimeline.to(".intro", { opacity: 0, duration: 0.5 });
introTimeline.to(".intro", { opacity: 1, duration: 2.5});
introTimeline.to(".intro", { opacity: 1, duration: 2.5});
introTimeline.to(".intro", { opacity: 0, duration: 0.5 });




let logoTimeline = gsap.timeline();

logoTimeline.delay(9);

// add the tweens to the timeline - Note we're using tl.to not gsap.to
logoTimeline.to(".logo", { opacity: 1, scale :1 , duration:0.1} );

logoTimeline.to(".logo", { opacity: 0, scale: 0.1, duration: 4 });






// var swordfield = gsap.fromTo(
//   ".force_field .sword",
 
//   {   opacity: 0, tranform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)" },
//   {
//     opacity: 1, transform: "rotateX(360deg) rotateY(1080deg) rotateZ(2160deg)",
//     duration: 10, repeat: -1, ease: linear, delay: 9 ,
//   }
// );

gsap.to(".force_field .sword", {
  transform: "rotateX(360deg) rotateY(1080deg) rotateZ(2160deg)",
  duration: 5,
  opacity: 1,
  delay: 65,
  ease: Sine.linear,
  repeat: -1,
  onRepeat: () => {
    const sword = document.querySelector(".force_field .sword");
    sword.style.opacity = 1;
    console.log(sword.style.opacity);
  },

});


function music() {
  let musicale = document.getElementById("musicale");
  musicale.addEventListener("click", function () {
  var audio = new Audio("SoundEffect/intro.mp3");
  audio.play();
  audio.volume = 0.1;
  musicale.style.display = "none";
  });
}
