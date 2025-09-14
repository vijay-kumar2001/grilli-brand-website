gsap.registerPlugin(ScrollTrigger);
let menuOpenButton = document.querySelector(".tap-target-open");
let menuCloseButton = document.querySelector(".tap-target-close")
let navOpen = document.querySelector(".nav-bar");
let menuLogo = document.querySelector("[data-menuLogo]");
let menuItems = document.querySelectorAll("[data-itemList]");
let touchStartX = 0;
let touchEndX = 0;
const swipeThresholdX = 50;
let touchStartY = 0;
let touchEndY = 0;
const swipeThresholdY = 50;
let nav = document.querySelector('nav');
let navHidden = 0;


setTimeout(heroImgHandler,3100)
function heroImgHandler() {
    let index = 0, intervalHandler;
    let imgTags = document.querySelectorAll("[data-backgroundImages]")

    function showBg(index) {
        imgTags.forEach(img => img.classList.remove("active"));
        imgTags[index].classList.add("active")
    }
    function autoChangeBg() {
        index = ((index + 1) % imgTags.length);
        showBg(index);
    }

    intervalHandler = setInterval(autoChangeBg, 5000)

    function manualChangeBg(newIndex) {
        index = newIndex;
        showBg(index);
        resetInterval()
    }

    function resetInterval() {
        clearInterval(intervalHandler)
        intervalHandler = setInterval(autoChangeBg, 5000)
    }
    showBg(index);

    let prevBtn = document.querySelector("[data-bgImgChangerPrev]")
    let nextBtn = document.querySelector("[data-bgImgChangerNext]")

    prevBtn.addEventListener("click", () => {
        index = index - 1 < 0 ? imgTags.length - 1 : index - 1;
        manualChangeBg(index);
    })

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % imgTags.length;
        manualChangeBg(index);
    })

}


function menuOpen() {
    menuLogo.classList.add("menu-open");
    menuItems.forEach((item) => { item.classList.add("menu-open") });
    navOpen.classList.add("menu-open");
    nav.classList.remove("hide");
    document.body.style.overflow = 'hidden';

}

function menuClose() {
    menuLogo.classList.remove("menu-open");
    menuItems.forEach((item) => { item.classList.remove("menu-open") });
    navOpen.classList.remove("menu-open");
    if (navHidden) {
        nav.classList.add("hide");
    }
    else {
        nav.classList.remove("hide");
    }
    document.body.style.overflow = '';

}

function menuToggle() {
    menuOpenButton.addEventListener("click", menuOpen)
    menuCloseButton.addEventListener("click", menuClose)
}
menuToggle()

function handleSwipe() {
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThresholdX) { // check which direction of movement is more , if x is more then swipe enabled 
        if (deltaX > 0) { //check swipe left
            menuClose();
        } else { //check swipe right
            menuOpen();
        }
    }

}

function swipeToClose() {
    document.addEventListener("touchstart", (eventObj) => {
        touchStartX = eventObj.changedTouches[0].screenX;
        touchStartY = eventObj.changedTouches[0].screenY;
    })
    document.addEventListener("touchend", (eventObj) => {
        touchEndX = eventObj.changedTouches[0].screenX;
        touchEndY = eventObj.changedTouches[0].screenY;
        handleSwipe();
    })

}
swipeToClose()

function hideNav() {

    let navHeight = nav.offsetHeight;
    let lastScrollPosY = 0;

    window.addEventListener("resize", () => {
        navHeight = nav.offsetHeight;
    })
    window.addEventListener("scroll", () => {

        if (window.scrollY > navHeight && window.scrollY > lastScrollPosY) {
            navHidden = 1;
            nav.classList.add("hide");
        } else if (window.scrollY < lastScrollPosY) {
            navHidden = 0;
            nav.classList.remove("hide");
        }
        lastScrollPosY = window.scrollY;
    });
}
hideNav();

function cardHoverEffectOnMobile() {
    let cards = document.querySelectorAll(".cards");

    function updateActiveCard() {
        let viewportCenter = window.innerHeight / 2;
        let closestCard = null;
        let closestDistance = viewportCenter / 2;

        cards.forEach(card => {
            let rect = card.getBoundingClientRect();
            let cardCenter = rect.top + rect.height / 2;
            let distance = Math.abs(cardCenter - viewportCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestCard = card;
            }

        });
        cards.forEach(card => card.classList.remove("hovered"))
        if (closestCard) {
            closestCard.classList.add("hovered")
        }
    }
    window.addEventListener("scroll", updateActiveCard)
    window.addEventListener("resize", updateActiveCard)
    updateActiveCard()
}
cardHoverEffectOnMobile()

function navigateUsingNavLinks() {
    let links = document.querySelectorAll(".nav-bar-items");
    links.forEach(link => {
        link.addEventListener("click", menuClose)
    })
    let sections = document.querySelectorAll("section")
    let sectionOptions = {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
    };
    let sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let sectionId = entry.target.getAttribute("id");
                links.forEach(link => {
                    let linkId = link.getAttribute("data-id")
                    if (sectionId === linkId) {
                        link.classList.add("active")
                    }
                    else {

                        link.classList.remove("active")
                    }

                })
            }
        })
    }, sectionOptions)
    sections.forEach(section => { sectionObserver.observe(section) });

}
navigateUsingNavLinks()


function intertiaScroll() {
    const lenis = new Lenis({
        duration: 1.5,                 // scroll interpolation duration in seconds
        easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic: fast start, smooth slow end
        smooth: true,                  // enable smooth scroll
        direction: "vertical",         // vertical scrolling
        gestureOrientation: "vertical", // for trackpads and touch
        wheelMultiplier: 1,            // adjust scroll sensitivity (1 = normal)
        touchMultiplier: 1.5,
        smoothTouch: true              // smooth scroll on touch devices
    });

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}

function aboutAnimation() {
    let start;
    if (window.matchMedia("(max-width:767px)").matches) {
        start = "top 10%"
    }
    else if (window.matchMedia("(max-width:1023px)").matches) {
        start = "top 10%"
    }
    else {
        start = "top top";
    }
    const maskedAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-us',
            start: start,
            end: 'bottom center',
            scrub: 1.5,
            pin: true,
            toggleActions: "play none none reverse"
        }
    })


    maskedAnimation.to(".will-fade", {
        opacity: 0,
        stagger: 0.2,
        ease: "power1.inOut"
    })
    maskedAnimation.to(".underImg", {
        scale: 1.3,
        maskPosition: "center",
        maskSize: "400%",
        duration: 1,
        ease: 'power1.inOut'
    })
    maskedAnimation.to(".fading-title", {
        opacity: 0,
        duration: 0.5
    })
    maskedAnimation.to(".will-appear", {
        duration: 0.5,
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.6
    })
}
aboutAnimation()

function lockScroll(){
    document.body.style.overflow="hidden";
}
function unLockScroll(){
    document.body.style.overflow="";
}
function heroVideoHandler() {
    let videoContainer = document.querySelector("#opener");
    let heroVideo = document.querySelector(".heroVideo");
    let header=document.querySelector("header")

    let fadeDuration =0.8;
    let fadeStarted = false;
    lockScroll()
    heroVideo.addEventListener("timeupdate", () => {
        if (!fadeStarted && heroVideo.currentTime > heroVideo.duration - fadeDuration) {
            fadeStarted = true;
            let mainStarter = gsap.timeline();
            mainStarter.to(videoContainer, {
                opacity: 0,
                duration: 0.8,
                // delay:-0.5,
                ease: "power1.inOut"

            })
            mainStarter.from(header, {
                opacity: 0,
                duration: 0.5,
                delay:-0.3
            })
            mainStarter.from(main, {
                opacity: 0,
                duration: 0.4
            })

        }
    })
    heroVideo.addEventListener("ended",unLockScroll)

    }
heroVideoHandler()