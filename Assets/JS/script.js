
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

function menuToggle() {
    let menuOpenButton = document.querySelector(".tap-target-open");
    let menuCloseButton = document.querySelector(".tap-target-close")
    let navOpen = document.querySelector(".nav-bar");
    let menuLogo = document.querySelector("[data-menuLogo]");
    let menuItems = document.querySelectorAll("[data-itemList]");

    menuOpenButton.addEventListener("click", () => {
        menuLogo.classList.add("menu-open");
        menuItems.forEach((item) => { item.classList.add("menu-open") });
        navOpen.classList.add("menu-open");
    })
    menuCloseButton.addEventListener("click", () => {
        menuLogo.classList.remove("menu-open");
        menuItems.forEach((item) => { item.classList.remove("menu-open") });
        navOpen.classList.remove("menu-open");
    })
}
menuToggle()