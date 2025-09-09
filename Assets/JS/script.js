
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
let menuOpenButton = document.querySelector(".tap-target-open");
let menuCloseButton = document.querySelector(".tap-target-close")
let navOpen = document.querySelector(".nav-bar");
let menuLogo = document.querySelector("[data-menuLogo]");
let menuItems = document.querySelectorAll("[data-itemList]");
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

function menuOpen() {
    menuLogo.classList.add("menu-open");
    menuItems.forEach((item) => { item.classList.add("menu-open") });
    navOpen.classList.add("menu-open");
}

function menuClose() {
    menuLogo.classList.remove("menu-open");
    menuItems.forEach((item) => { item.classList.remove("menu-open") });
    navOpen.classList.remove("menu-open");

}
function menuToggle() {
    menuOpenButton.addEventListener("click", menuOpen)
    menuCloseButton.addEventListener("click", menuClose)
}
menuToggle()

function handleSwipe() {
    const deltaX = touchStartX - touchEndX;
    if (deltaX > swipeThreshold) { //check swipe left
        menuClose();
    } else if (-deltaX > swipeThreshold) { //check swipe right
        menuOpen();
    }
}
function swipeToClose() {
    document.addEventListener("touchstart", (eventObj) => {
        touchStartX = eventObj.changedTouches[0].screenX;
    })
    document.addEventListener("touchend", (eventObj) => {
        touchEndX = eventObj.changedTouches[0].screenX;
        handleSwipe();
    })
    
}
swipeToClose()