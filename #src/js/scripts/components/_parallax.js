// gsap.utils.toArray(".section").forEach((section, i) => {
// 	section.bg = section.querySelector(".bg");

// 	// Do the parallax effect on each section
// 	if (i) {
// 		section.bg.style.backgroundPosition = `50% ${innerHeight / 2}px`;

// 		gsap.to(section.bg, {
// 			backgroundPosition: `50% ${-innerHeight / 2}px`,
// 			ease: "none",
// 			scrollTrigger: {
// 				trigger: section,
// 				scrub: true
// 			}
// 		});
// 	}
// });

// gsap.to(".parallax:not(:last-child)", {
// 	yPercent: -100,
// 	ease: Linear.easeNone,
// 	stagger: .5,
// 	scrollTrigger: {
// 		trigger: ".parallax-wrapper",
// 		start: "top top",
// 		end: "+=400%",
// 		scrub: 1,
// 		pin: true
// 	}
// });

// gsap.set(".parallax", { zIndex: (i, target, targets) => targets.length - i });

// var largeTL = gsap.timeline({
// 	scrollTrigger: {
// 		trigger: '.start-trig',
// 		pin: '.anchor',
// 		pinSpacing: false,
// 		start: "top top",
// 		markers: true,
// 		end: '+=200%',
// 	},
// })


// const fadeInElements = gsap.timeline({ paused: true })

// fadeInElements
// 	.to('h1', { duration: 1, autoAlpha: 1 }, 1)
// 	.to('p', { duration: 1, autoAlpha: 1 }, 3)
// 	.to('body', { duration: 1 }, 5)
// 	;

// ScrollTrigger.create({
// 	trigger: '.section-feedback',
// 	pin: false,
// 	start: 'top top',
// 	end: '+=100%',
// 	scrub: 1,
// 	// animation: fadeInElements
// })


const panels = gsap.utils.toArray(".parallax");
gsap.set(panels, { zIndex: (i, target, targets) => targets.length - i });

function sizePanels() {
	let heightSoFar = 0;
	panels.forEach((panel, i) => {
		if (i !== panels.length - 1) {
			gsap.to(panel, {
				yPercent: -100,
				ease: "none",
				scrollTrigger: {
					start: heightSoFar,
					end: heightSoFar + panel.offsetHeight,
					scrub: true,
				}
			});
		}

		heightSoFar += panel.offsetHeight;
	});

	gsap.set("body", { height: heightSoFar });
}

ScrollTrigger.addEventListener("refreshInit", () => {
	// Kill off old ones
	ScrollTrigger.getAll().forEach(ST => ST.kill());

	// Create new ones
	sizePanels();
});

// Init
sizePanels();

ScrollTrigger.create({
	trigger: '.section-feedback',
	pin: '.anchor',
	start: 'top top',
	endtrigger: '.anchor2',
	//end: 'bottom top-=' + window.innerHeight, 
	end: () => 'bottom top-=' + window.innerHeight,
});