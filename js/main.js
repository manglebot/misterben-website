gsap.registerPlugin(ScrollTrigger);


// preload images
const images = gsap.utils.toArray('img');
const loader = document.querySelector('.loader--text');
const updateProgress = (instance) => 
  loader.textContent = `${Math.round(instance.progressedCount * 100 / images.length)}%`;


// sideways image scroller
const scrollPics = () => {
  document.body.style.overflow = 'auto';
  document.scrollingElement.scrollTo(100, 100);

  //get rid of loader
  gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });
  
  gsap.utils.toArray('section').forEach((section, index) => {
    const w = section.querySelector('.wrapper');
    const [x, xEnd] = (index % 2) ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
    gsap.fromTo(w, {  x  }, {
      x: xEnd,
      scrollTrigger: { 
        trigger: section, 
        scrub: 0.1 
      }
    });
  });
}

// skew
let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter("#title", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-30, 30); // don't let the skew go beyond 30 degrees. 

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

let tl = new TimelineMax({repeat:-1});

for(var i=50; i--;){
  tl.to(".wobble",R(0.03,0.17),{opacity:R(0.5,1),y:R(-1.5,1.5)})
};



function R(max,min){return Math.random()*(max-min)+min};