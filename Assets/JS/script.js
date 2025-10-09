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


setTimeout(heroImgHandler, 3100)
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
    menuItemStagger()

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
    let start = "top top";
    // if (window.matchMedia("(max-width:767px)").matches) {
    //     start = "top top"
    // }
    // else if (window.matchMedia("(max-width:1023px)").matches) {
    //     start = "top top"
    // }
    // else {
    //     start = "top top";
    // }
    const maskedAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-us',
            start: start,
            end: 'bottom center',
            scrub: 1.5,
            pin: true,
            invalidateOnRefresh: true,
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

function lockScroll() {
    document.body.style.overflow = "hidden";
}

function unLockScroll() {
    document.body.style.overflow = "";
}

function heroVideoHandler() {
    let videoContainer = document.querySelector("#opener");
    let heroVideo = document.querySelector(".heroVideo");
    let header = document.querySelector("header")

    let fadeDuration = 0.8;
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
                delay: -0.3
            })


        }
    })
    heroVideo.addEventListener("ended", () => {
        unLockScroll()
        videoContainer.style.display = "none"
    })

}
heroVideoHandler()

function modalHandler() {
    let breakfastModalOpen = document.querySelector("#breakfastModalOPen")
    let lunchModalOpen = document.querySelector("#lunchModalOPen")
    let dinnerModalOpen = document.querySelector("#dinnerModalOPen")
    let menuHighlightsOpen = document.querySelector(".menu-highlights")
    let modalContainer = document.querySelector(".modalsContainer")
    let modalCloseButtons = document.querySelectorAll(".modal-tap-target-close")
    let reservationOpen = document.querySelector(".heroCta")


    let breakfastModal = document.querySelector(".breakfastModal")
    let lunchModal = document.querySelector(".lunchModal")
    let dinnerModal = document.querySelector(".dinnerModal")
    let menuHightightsModal = document.querySelector(".menuHightightsModal")
    let reservationModal = document.querySelector(".reservationModal")
    let modals = document.querySelectorAll(".modals")


    function hideAllModals() {
        modals.forEach(modal => modal.style.display = "none")
    }

    function openModal(targetModal) {
        modalContainer.style.display = "flex"
        modalContainer.style.pointerEvents = "auto"
        hideAllModals()
        targetModal.style.display = "flex"
        lockScroll();
        gsap.fromTo(modalContainer,
            { autoAlpha: 0, scale: 0.9 },
            { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" });
        gsap.fromTo(targetModal,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.1 }
        );

    }

    function closeModal() {
        gsap.to(modalContainer, {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                modals.forEach(modal => modal.style.display = "none")
                unLockScroll()
            }

        })
    }

    breakfastModalOpen.addEventListener("click", (eventObj) =>{
        openModal(breakfastModal)
        eventObj.stopPropagation()
    } )

    lunchModalOpen.addEventListener("click", (eventObj) =>{
        openModal(lunchModal)
        eventObj.stopPropagation()
    } )

    dinnerModalOpen.addEventListener("click", (eventObj) =>{
        openModal(dinnerModal)
        eventObj.stopPropagation()
    } )

    menuHighlightsOpen.addEventListener("click", (eventObj) =>{
        openModal(menuHightightsModal)
        eventObj.stopPropagation()
    } )

    reservationOpen.addEventListener("click", (eventObj) =>{
        openModal(reservationModal)
        eventObj.stopPropagation()
    } )

    modalCloseButtons.forEach(button => button.addEventListener("click", closeModal))

    // document.addEventListener("click",(eventObj)=>{
    //     if(!(eventObj.target===modalContainer))
    //         closeModal()
    // })

    document.addEventListener("keydown",(eventObj)=>{
        if(eventObj.key==="Escape")
            closeModal()
    })


}
modalHandler()

window.addEventListener("load", () => {
    ScrollTrigger.refresh()
    window.scrollTo(0, 0)

});
window.addEventListener("load", () => {
    setTimeout(() => {
        ScrollTrigger.refresh(); // recalculates all pins
    }, 100);
});

function menuItemStagger() {
    let menuItems = document.querySelectorAll(".nav-bar-items a")
    let menuBottom = document.querySelector(".mobile-menu-bottom")
    let menuItemsStaggerTimeline = gsap.timeline()
    setTimeout(() => {
        menuItems.forEach((menuItem, i) => {
            menuItemsStaggerTimeline.from(menuItem, {
                opacity: 0,
                x: -20,
                duration: 0.5,
                ease: "back.out(1.7)"
            }, i * 0.2)

        }, 1000)
        menuItemsStaggerTimeline.from(menuBottom, {
            opacity: 0,
            y: 10,
            duration: 1,
            ease: "power2.out",
            delay: -0.2
        })

    })


}
menuItemStagger()
window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});
window.addEventListener("orientationchange", () => {
    ScrollTrigger.refresh();
});



const errorMessages = {
    name: "Please enter a valid name (letters only, min 2 characters).",
    phoneNo: "Please enter a valid 10-digit phone number.",
    email: "Please enter a valid email address."
}
const regexes = {
    name: /^[A-Za-z\s'-]{2,}$/,
    phoneNo: /^[0-9]{10}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

function validateInput(field, type) {
    const value = field.value.trim()
    return regexes[type].test(value);

}


function validateForm(formSelector) {
    const form = document.querySelector(formSelector)

    const inputFields = [{ selector: ".customerName", type: "name" },
    { selector: ".customerPhoneNo", type: "phoneNo" },
    { selector: ".customerEmail", type: "email" }]

    const blurredFields= new WeakMap();
    function checkFormStatus() {
        let ctaButton = form.querySelector(".cta")
        let anyError = false;
        let anyVisited=false;

        inputFields.forEach(({ selector, type }) => form.querySelectorAll(selector).forEach(field => {
            const isVisited=blurredFields.get(field)
            if(!isVisited) return;
            anyVisited=true;


           const isValid = validateInput(field, type)
            if (!isValid) {
                anyError = true;
            }
        }))
        if (!anyVisited ||(anyVisited && !anyError)){
            ctaButton.disabled=false
            ctaButton.classList.remove("error")
        }
        else{
            ctaButton.disabled=true
            ctaButton.classList.add("error")
        }

    }

    inputFields.forEach(({ selector, type }) => {
        form.querySelectorAll(selector).forEach(field => {
            const errorElement = field.nextElementSibling;
            // let wasBlurred = false; //to track if blur happened once


            // on blur now validate
            field.addEventListener("blur", () => {
                blurredFields.set(field,true) //marking field as visited 
                const isValid = validateInput(field, type)

                //on blur always remove green border class so next time it doesnt appear as they are required only for input and not after input ie after blur
                field.classList.remove("success")


                if (!isValid) {
                    // field.classList.remove("success")
                    field.classList.add("error")
                    errorElement.textContent = errorMessages[type];
                    errorElement.classList.add("active")
              

                }
                else {
                    field.classList.remove("error")
                    errorElement.textContent = "";
                    errorElement.classList.remove("active")
              

                } //closing of else
                checkFormStatus()
            }// closing of cb in event listener
            )//closing of "blur" event listener

            field.addEventListener("input", () => {
                if (!blurredFields.get(field)) {
                    // checkFormStatus()
                    return;
                }

                const isValid = validateInput(field, type)
                if (isValid) {
                    field.classList.remove("error")
                    field.classList.add("success")
                    errorElement.textContent = ""
                    errorElement.classList.remove("active")
              

                } else {
                    field.classList.remove("success")
                    field.classList.add("error")
                    errorElement.textContent = errorMessages[type]
                    errorElement.classList.add("active")
              

                }
                checkFormStatus()
            } //closing of "input" listener cb
            ) //closing of "input" listener



        }//closing of inner forEach cb
        ) //closing of inner forEach
    } //closing of outer forEach cb
    ) //closing of outer forEach
}
validateForm("#modalForm")
validateForm("#sectionForm")

function handleDateandTimeInputs() {
    let dateElements = document.querySelectorAll(".bookingDate")
    let timeElements = document.querySelectorAll(".bookingTime")
    let todayDate = new Date();
    let yyyy = todayDate.getFullYear();
    let mm = String(todayDate.getMonth() + 1).padStart(2, '0');
    let dd = String(todayDate.getDate()).padStart(2, '0')
    let todayStr = `${yyyy}-${mm}-${dd}`

    dateElements.forEach(dateElement => dateElement.min = `${yyyy}-${mm}-${dd}`)

    dateElements.forEach(dateElement => dateElement.addEventListener("blur", () => {
        let [year, month, day] = dateElement.value.split("-").map(Number)
        let selectedDate = new Date(year, month - 1, day)
        if (selectedDate < new Date(todayStr)) {
            dateElement.value = todayStr
        }
    }))






    timeElements.forEach((timeElement) => {
        timeElement.addEventListener("blur", () => {
            let [ogHours, ogMins] = timeElement.value.split(":").map(Number)
            let hours = ogHours, mins = ogMins;
            if (ogHours < 8) {
                hours = 8;
                mins = 0;
            }
            else if (ogHours > 21) {
                hours = 21;
                mins = 30;
            }
            else {

                if (ogMins < 15) {
                    mins = 0;
                }
                else if (ogMins < 45) {
                    mins = 30;
                }
                else {
                    mins = 0;
                    hours += 1;
                    if (ogHours > 21) hours = 21

                }
            }


            let hour = String(hours).padStart(2, '0')
            let min = String(mins).padStart(2, '0')

            timeElement.value = `${hour}:${min}`

        })
    })




    // timeElement.addEventListener("blur", timeHandle)



}
handleDateandTimeInputs()

function featureHoverEffect() {
    let features = document.querySelectorAll(".feature")

    function updateActiveFeature() {
        let viewportCenter = window.innerHeight / 2;
        let closestFeature = null;
        let closestDistance = viewportCenter / 2;

        features.forEach(feature => {
            let featureRect = feature.getBoundingClientRect();
            let featureCenter = featureRect.top + featureRect.height / 2
            let distance = Math.abs(featureCenter - viewportCenter)

            if (distance < closestDistance) {
                closestDistance = distance;
                closestFeature = feature;
            }
        })
        features.forEach(feature => feature.classList.remove("scaled"))
        if (closestFeature) closestFeature.classList.add("scaled")
    }
    window.addEventListener("resize", updateActiveFeature)
    window.addEventListener("scroll", updateActiveFeature)
    updateActiveFeature()
}
featureHoverEffect()

function handleFormSubmission() {
    let forms = document.querySelectorAll(".reservationForm")
    forms.forEach(form => form.addEventListener("submit", (eventObj) => handleFormManually(eventObj, form)))

    async function handleFormManually(eventObj, form) {
        eventObj.preventDefault();// prevents default action of loading formspree page and sending form

        let formData = new FormData(form);// extracting input from from and storing them  by creating formData obj

        preShowModal()

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { "Accept": "application/json" }
            });
            if (response.ok) {
                showModal("success");
                // form.reset();
            }
            else {
                showModal("failure")
            }
        }
        catch {
            showModal("error")
        }
    }

}
handleFormSubmission()

function preShowModal() {

    let statusModal = document.querySelector(".formStatusModal")
    let statusModalWrapper = document.querySelector(".modalWrapper")
    let svg = document.querySelector(".statusSvg")

    let svgFill = document.querySelector(".svgFill")
    let modalMessage = document.querySelector(".resultantMessageContainer .message")
    let message, fill, color, viewBox;


    viewBox = "0 0 24 24";
    message = "Submitting your request..."
    fill = "hsla(38, 61 %, 73 %, 1.00)"
    color = "hsla(38, 61%, 73%, 1.00)"


    statusModalWrapper.style.display = "flex"
    statusModalWrapper.style.pointerEvents = "auto";
    lockScroll();
    svg.setAttribute("viewBox", viewBox)

    svgFill.setAttribute("fill", fill)
    modalMessage.style.color = color
    modalMessage.textContent = message
    gsap.fromTo(statusModalWrapper,
        { autoAlpha: 0, scale: 0.9 },
        { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(statusModal,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out", delay: 0.1 }
    );

}

function showModal(status) {
    let statusModalCloseButton = document.querySelector(".formStatusModal .status-modal-tap-target-close")
    let statusModal = document.querySelector(".formStatusModal")
    let statusModalWrapper = document.querySelector(".modalWrapper")
    let svg = document.querySelector(".statusSvg")
    let svgFill = document.querySelector(".svgFill")
    let modalMessage = document.querySelector(".resultantMessageContainer .message")
    let gTag = document.querySelector(".statusLoadingSvg")
    gTag.style.display = "none"
    let pathD, message, fill, color, viewBox;


    if (status === "success") {
        pathD = "M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 34.988281 14.988281 A 1.0001 1.0001 0 0 0 34.171875 15.439453 L 23.970703 30.476562 L 16.679688 23.710938 A 1.0001 1.0001 0 1 0 15.320312 25.177734 L 24.316406 33.525391 L 35.828125 16.560547 A 1.0001 1.0001 0 0 0 34.988281 14.988281 z";
        message = "Your table request has been received! 🍽️ We’ll confirm with you shortly.";
        viewBox = "0 0 50 50"
        fill = "green";
        color = "var(--gold-crayola)"
    }
    else if (status === "failure") {
        pathD = "M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"
        message = "Oops! Something went wrong. Please try again or call us directly."
        viewBox = "0 0 50 50"
        fill = "red";
        color = "rgb(196, 196, 196)"
    }
    else {
        pathD = "M520.741 163.801a10.234 10.234 0 00-3.406-3.406c-4.827-2.946-11.129-1.421-14.075 3.406L80.258 856.874a10.236 10.236 0 00-1.499 5.335c0 5.655 4.585 10.24 10.24 10.24h846.004c1.882 0 3.728-.519 5.335-1.499 4.827-2.946 6.352-9.248 3.406-14.075L520.742 163.802zm43.703-26.674L987.446 830.2c17.678 28.964 8.528 66.774-20.436 84.452a61.445 61.445 0 01-32.008 8.996H88.998c-33.932 0-61.44-27.508-61.44-61.44a61.445 61.445 0 018.996-32.008l423.002-693.073c17.678-28.964 55.488-38.113 84.452-20.436a61.438 61.438 0 0120.436 20.436zM512 778.24c22.622 0 40.96-18.338 40.96-40.96s-18.338-40.96-40.96-40.96-40.96 18.338-40.96 40.96 18.338 40.96 40.96 40.96zm0-440.32c-22.622 0-40.96 18.338-40.96 40.96v225.28c0 22.622 18.338 40.96 40.96 40.96s40.96-18.338 40.96-40.96V378.88c0-22.622-18.338-40.96-40.96-40.96z";
        message = "Looks like there’s a connection issue. 🌐 Please check and resubmit."
        viewBox = "0 0 1024 1024"
        fill = "#a3a30fff";
        color = "rgb(196, 196, 196)";

    }


    // statusModalWrapper.style.display = "flex"
    // statusModalWrapper.style.pointerEvents = "auto";
    // lockScroll();
    svg.setAttribute("viewBox", viewBox)
    // svg.removeAttribute("fill")
    svgFill.setAttribute("fill", fill)
    svgFill.setAttribute("d", pathD)
    modalMessage.style.color = color
    modalMessage.textContent = message
    // gsap.fromTo(statusModalWrapper,
    //     { autoAlpha: 0, scale: 0.9 },
    //     { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" });
    // gsap.fromTo(statusModal,
    //     { autoAlpha: 0, y: 30 },
    //     { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out", delay: 0.1 }
    // );


    function closeStatusModal() {
        gsap.to(statusModalWrapper, {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => unLockScroll()
        })

    }


    if (!statusModalCloseButton.hasListener) {
        statusModalCloseButton.addEventListener("click", closeStatusModal);
        statusModalCloseButton.hasListener = "True"
    }


        statusModalWrapper.addEventListener("click",(eventObj)=>{
        if(eventObj.target===statusModalWrapper)
            closeStatusModal()
    })

    document.addEventListener("keydown",(eventObj)=>{
        if(eventObj.key==="Escape")
            closeStatusModal()
    })

}