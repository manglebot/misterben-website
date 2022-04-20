/*jshint esversion: 6 */
gsap.registerPlugin(ScrollTrigger);


// preload images
const images = gsap.utils.toArray("img");
const loader = document.querySelector(".loader--text");
const updateProgress = (instance) => 
  loader.textContent = `${Math.round(instance.progressedCount * 100 / images.length)}%`;

// rainbor colours on  BETA text
function betaRandom() {
  gsap.to(".beta", { 
    duration: gsap.utils.random(0.1, 0.5), 
    color: "rgb(random(0,155,100), random(1,255,0), random(155,0,1))", 
    onComplete: betaRandom 
  });
}

betaRandom();

// preload then sideways text scroller
const scrollPics = () => {
  document.body.style.overflow = "auto";
  document.scrollingElement.scrollTo(0,0);

  //get rid of loader
  gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });
  
  //animate text
  gsap.utils.toArray('aside').forEach((aside, index) => {
    const w = aside.querySelector(".wrapper");
    const [x, xEnd] = (index % 2) ? ["100%", (w.scrollWidth - aside.offsetWidth) * -0.7] : [w.scrollWidth * -1, 0];
    gsap.fromTo(w, {  x  }, {
      x: xEnd,
      scrollTrigger: { 
        trigger: aside,
        end: "+=" + (window.innerHeight * 1),
        scrub: true 
      }
    });
  });
};


//sideways scroll images
const boxes = gsap.utils.toArray('.container');

boxes.forEach(box => {

gsap.to(box, { 
	// xPercent: () => -100 * (boxes.length -1),
  x: () => -(document.querySelector('.container').scrollWidth - document.documentElement.clientWidth) + "px",
	ease: "none", // <-- IMPORTANT!
	scrollTrigger: {
	trigger: box,
	pin: true,
	start: "-=100px",
	end: () => "+=" + (document.querySelector('.container').scrollWidth - window.innerWidth),
	scrub: true
    }
  });
});


//sideways scroll images (1)
const boxes1 = gsap.utils.toArray('.container1');

boxes1.forEach(box => {

gsap.to(box, { 
	// xPercent: () => -100 * (boxes.length -1),
  x: () => -(document.querySelector('.container1').scrollWidth - document.documentElement.clientWidth) + "px",
	ease: "none", // <-- IMPORTANT!
	scrollTrigger: {
	trigger: box,
	pin: true,
	start: "-=100px",
	end: () => "+=" + (document.querySelector('.container1').scrollWidth - window.innerWidth),
	scrub: true
    }
  });
});

//sideways scroll images (2)
const boxes2 = gsap.utils.toArray('.container2');

boxes2.forEach(box => {

gsap.to(box, { 
	// xPercent: () => -100 * (boxes.length -1),
  x: () => -(document.querySelector('.container2').scrollWidth - document.documentElement.clientWidth) + "px",
	ease: "none", // <-- IMPORTANT!
	scrollTrigger: {
	trigger: box,
	pin: true,
	start: "-=100px",
	end: () => "+=" + (document.querySelector('.container2').scrollWidth - window.innerWidth),
	scrub: true
    }
  });
});

//sideways scroll images (3)
const boxes3 = gsap.utils.toArray('.container3');

boxes3.forEach(box => {

gsap.to(box, { 
	// xPercent: () => -100 * (boxes.length -1),
  x: () => -(document.querySelector('.container3').scrollWidth - document.documentElement.clientWidth) + "px",
	ease: "none", // <-- IMPORTANT!
	scrollTrigger: {
	trigger: box,
	pin: true,
	start: "-=100px",
	end: () => "+=" + (document.querySelector('.container3').scrollWidth - window.innerWidth),
	scrub: true
    }
  });
});

//sideways scroll images (4)
const boxes4 = gsap.utils.toArray('.container4');

boxes4.forEach(box => {

gsap.to(box, { 
	// xPercent: () => -100 * (boxes.length -1),
  x: () => -(document.querySelector('.container4').scrollWidth - document.documentElement.clientWidth) + "px",
	ease: "none", // <-- IMPORTANT!
	scrollTrigger: {
	trigger: box,
	pin: true,
	start: "-=100px",
	end: () => "+=" + (document.querySelector('.container4').scrollWidth - window.innerWidth),
	scrub: true
    }
  });
});

//sideways scroll images (5)
const boxes5 = gsap.utils.toArray('.container5');

boxes5.forEach(box => {

gsap.to(box, { 
	// xPercent: () => -100 * (boxes.length -1),
  x: () => -(document.querySelector('.container5 ').scrollWidth - document.documentElement.clientWidth) + "px",
	ease: "none", // <-- IMPORTANT!
	scrollTrigger: {
	trigger: box,
	pin: true,
	start: "-=100px",
	end: () => "+=" + (document.querySelector('.container5').scrollWidth - window.innerWidth),
	scrub: true
    }
  });
});

ScrollTrigger.refresh();

// skew
let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter("#title", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 30 degrees. 

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -30);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {skew: 0, duration: 0.4, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
    }
  }
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set("#title", {transformOrigin: "right center", force3D: true});

//preloader then run image scroller
imagesLoaded(images).on('progress', updateProgress).on('always', scrollPics);

//old movie style animated text
/* modified from a Pen by Diaco m.lotfollahi  : https://diacodesign.com */

let tl = gsap.timeline({repeat:-1});

for(var i=50; i--;){
  tl.to(".wobble",R(0.03,0.17),{opacity:R(0.6,1),y:R(-1.5,1.5)});
}

function R(max,min){
	return Math.random()*(max-min)+min;
}
