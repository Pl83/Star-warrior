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

gsap.to





gsap.to(
  "#content",
  {
    top:"-200%",
    duration: 50,
    delay: 15,
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

logoTimeline.to(".logo", { opacity: 0,  scale: 0.1 , duration: 4 });
