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
heroImgHandler()

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
    if(navHidden){
        nav.classList.add("hide");
    }
    else{
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
