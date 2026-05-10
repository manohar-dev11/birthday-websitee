// =================================
// LOADER
// =================================

window.addEventListener("load", () => {

    const loader =
    document.getElementById("loader");

    if(loader){

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        },3000);

    }

});

// =================================
// CHAT CAROUSEL
// =================================

const slides =
document.querySelector(".chat-slides");

const totalSlides =
document.querySelectorAll(".chat-slide");

const nextBtn =
document.getElementById("next-btn");

const prevBtn =
document.getElementById("prev-btn");

let currentSlide = 0;

/* UPDATE */

function updateCarousel(){

    if(slides){

        slides.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    }

}

/* NEXT */

if(nextBtn){

    nextBtn.addEventListener("click", () => {

        currentSlide++;

        if(currentSlide >= totalSlides.length){

            currentSlide = 0;

        }

        updateCarousel();

    });

}

/* PREV */

if(prevBtn){

    prevBtn.addEventListener("click", () => {

        currentSlide--;

        if(currentSlide < 0){

            currentSlide =
            totalSlides.length - 1;

        }

        updateCarousel();

    });

}

// =================================
// BLOW CANDLES
// =================================

const blowBtn =
document.getElementById("blow-btn");

const flames =
document.querySelectorAll(".flame");

/* BLOW */

if(blowBtn){

    blowBtn.addEventListener("click", () => {

        flames.forEach(flame => {

            flame.style.opacity = "0";

        });

        createFirework();

    });

}

/* ================================= */
/* FIREWORK EFFECT */
/* ================================= */

function createFirework(){

    const colors = [

        "#ff4fa3",
        "#8b5cf6",
        "#38bdf8",
        "#facc15",
        "#ffffff"

    ];

    for(let i = 0; i < 80; i++){

        const particle =
        document.createElement("div");

        particle.classList.add("firework");

        document.body.appendChild(particle);

        /* CENTER */

        const x =
        window.innerWidth / 2;

        const y =
        window.innerHeight / 2;

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        /* RANDOM */

        const angle =
        Math.random() * 360;

        const distance =
        Math.random() * 300;

        const dx =
        Math.cos(angle) * distance;

        const dy =
        Math.sin(angle) * distance;

        /* COLOR */

        particle.style.background =
        colors[Math.floor(
            Math.random() * colors.length
        )];

        /* ANIMATION */

        particle.animate([

            {

                transform:
                "translate(0,0) scale(1)",

                opacity:1
            },

            {

                transform:
                `translate(${dx}px, ${dy}px) scale(0)`,

                opacity:0
            }

        ],{

            duration:2000,

            easing:
            "cubic-bezier(0,0.9,0.57,1)"

        });

        /* REMOVE */

        setTimeout(() => {

            particle.remove();

        },2000);

    }

}

// =================================
// PAGE TRANSITIONS
// =================================

const transition =
document.querySelector(".page-transition");

const links =
document.querySelectorAll("a");

/* LOOP */

links.forEach(link => {

    const href =
    link.getAttribute("href");

    /* INTERNAL ONLY */

    if(

        href &&
        !href.startsWith("#") &&
        !href.startsWith("http")

    ){

        link.addEventListener("click", (e) => {

            e.preventDefault();

            transition.classList.add("active");

            setTimeout(() => {

                window.location.href = href;

            },500);

        });

    }

});

// =================================
// MUSIC PLAYER
// =================================

const music =
document.getElementById("bg-music");

const musicBtn =
document.getElementById("music-toggle");

const disc =
document.querySelector(".music-disc");

/* CHECK */

if(music && musicBtn && disc){

    /* LOAD SAVED TIME */

    const savedTime =
    localStorage.getItem("music-time");

    if(savedTime){

        music.currentTime =
        savedTime;
    }

    /* LOAD PLAY STATE */

    const wasPlaying =
    localStorage.getItem("music-playing");

    if(wasPlaying === "true"){

        music.play();

        musicBtn.innerHTML = "❚❚";

        disc.classList.add("playing");

    }

    /* PLAY / PAUSE */

    musicBtn.addEventListener("click", () => {

        if(music.paused){

            music.play();

            musicBtn.innerHTML = "❚❚";

            disc.classList.add("playing");

            localStorage.setItem(
                "music-playing",
                "true"
            );

        }

        else{

            music.pause();

            musicBtn.innerHTML = "▶";

            disc.classList.remove("playing");

            localStorage.setItem(
                "music-playing",
                "false"
            );

        }

    });

    /* SAVE CURRENT TIME */

    setInterval(() => {

        localStorage.setItem(
            "music-time",
            music.currentTime
        );

    },1000);

}

// =================================
// CUSTOM CURSOR
// =================================

const cursor =
document.querySelector(".custom-cursor");

/* MOVE */

document.addEventListener("mousemove", (e) => {

    if(cursor){

        cursor.style.left =
        e.clientX + "px";

        cursor.style.top =
        e.clientY + "px";

    }

});

/* HOVER EFFECT */

const hoverElements =
document.querySelectorAll(

    "button, a, .photo-card"

);

hoverElements.forEach(el => {

    el.addEventListener("mouseenter", () => {

        cursor.classList.add("hover");

    });

    el.addEventListener("mouseleave", () => {

        cursor.classList.remove("hover");

    });

});

// =================================
// GALLERY POPUP
// =================================

const mediaItems =
document.querySelectorAll(".gallery-media");

const popup =
document.getElementById("image-popup");

const popupImg =
document.getElementById("popup-img");

const closeImage =
document.getElementById("close-image");

/* CREATE VIDEO ELEMENT */

let popupVideo =
document.createElement("video");

popupVideo.controls = true;

popupVideo.autoplay = true;

popupVideo.style.maxWidth = "85%";

popupVideo.style.maxHeight = "85vh";

popupVideo.style.borderRadius = "25px";

/* OPEN */

mediaItems.forEach(item => {

    item.addEventListener("click", () => {

        popup.classList.add("active");

        /* IMAGE */

        if(item.tagName === "IMG"){

            popupImg.style.display = "block";

            popupVideo.style.display = "none";

            popupImg.src = item.src;

        }

        /* VIDEO */

        else if(item.tagName === "VIDEO"){

            popupImg.style.display = "none";

            popupVideo.style.display = "block";

            popupVideo.src =
            item.querySelector("source").src;

            popup.appendChild(popupVideo);

        }

    });

});

/* CLOSE */

if(closeImage){

    closeImage.addEventListener("click", () => {

        popup.classList.remove("active");

        popupVideo.pause();

    });

}

// =================================
// AUTO PLAY GALLERY VIDEOS
// =================================

const galleryVideos =
document.querySelectorAll(".photo-card video");

/* PLAY */

galleryVideos.forEach(video => {

    video.play();

});

// =================================
// MOBILE GALLERY SWIPE STACK
// =================================

function initMobileGalleryDeck(){

    const isGalleryPage =
    document.getElementById("gallery-page");

    if(
        !isGalleryPage ||
        !window.matchMedia("(max-width: 768px)").matches
    ){
        return;
    }

    const deck =
    document.querySelector(".photo-grid");

    if(!deck){
        return;
    }

    let cards =
    Array.from(deck.querySelectorAll(".photo-card"));

    if(cards.length < 2){
        return;
    }

    deck.classList.add("mobile-deck");

    const visibleStack = 10;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let activeCard = null;

    function layoutDeck(){

        cards.forEach((card, index) => {

            card.classList.remove("is-top", "deck-hidden");
            card.style.removeProperty("transform");
            card.style.removeProperty("transition");

            if(index >= visibleStack){
                card.classList.add("deck-hidden");
            }
            else{
                card.style.setProperty(
                    "--stack-index",
                    index.toString()
                );
            }

        });

        const topCard = cards[0];

        if(topCard){
            topCard.classList.add("is-top");
        }

    }

    function moveTopCardToEnd(){

        const movedCard = cards.shift();

        if(movedCard){
            cards.push(movedCard);
            deck.appendChild(movedCard);
            layoutDeck();
        }

    }

    function onStart(e){

        activeCard = cards[0];

        if(!activeCard){
            return;
        }

        isDragging = true;

        startX =
        e.touches ? e.touches[0].clientX : e.clientX;

        currentX = startX;
        activeCard.style.transition = "none";

    }

    function onMove(e){

        if(!isDragging || !activeCard){
            return;
        }

        currentX =
        e.touches ? e.touches[0].clientX : e.clientX;

        const deltaX = currentX - startX;
        const rotation = deltaX * 0.06;

        activeCard.style.transform =
        `translateX(${deltaX}px) rotate(${rotation}deg)`;

    }

    function onEnd(){

        if(!isDragging || !activeCard){
            return;
        }

        isDragging = false;

        const deltaX = currentX - startX;
        const swipeThreshold = 70;
        const didSwipe =
        Math.abs(deltaX) > swipeThreshold;

        activeCard.style.transition =
        "transform 240ms ease, opacity 240ms ease";

        if(didSwipe){

            const direction = deltaX > 0 ? 1 : -1;

            activeCard.style.transform =
            `translateX(${direction * 130}%) rotate(${direction * 16}deg)`;

            activeCard.style.opacity = "0";

            setTimeout(() => {

                activeCard.style.opacity = "";
                activeCard.style.transform = "";
                moveTopCardToEnd();
                activeCard = null;

            },230);

        }
        else{
            activeCard.style.transform = "";
            activeCard = null;
        }

    }

    deck.addEventListener("touchstart", onStart, {passive:true});
    deck.addEventListener("touchmove", onMove, {passive:true});
    deck.addEventListener("touchend", onEnd);
    deck.addEventListener("touchcancel", onEnd);

    layoutDeck();

}

initMobileGalleryDeck();

// =================================
// GSAP ANIMATIONS
// =================================

if(window.gsap){

    gsap.registerPlugin(ScrollTrigger);

    /* HERO */

    gsap.from(".hero-image-container",{

        opacity:0,

        scale:0.7,

        duration:1.5,

        ease:"power3.out"

    });

    gsap.from(".hero-title",{

        opacity:0,

        y:100,

        duration:1.4,

        delay:0.3,

        ease:"power3.out"

    });

    gsap.from(".hero-text",{

        opacity:0,

        y:50,

        duration:1.2,

        delay:0.6,

        ease:"power3.out"

    });

    gsap.from(".hero-btn",{

        opacity:0,

        scale:0.7,

        duration:1,

        delay:1,

        ease:"back.out(1.7)"

    });

    /* REVEALS */

    gsap.utils.toArray(".reveal")

    .forEach((element) => {

        gsap.to(element,{

            opacity:1,

            y:0,

            duration:1.3,

            ease:"power3.out",

            scrollTrigger:{

                trigger:element,

                start:"top 85%",

                toggleActions:
                "play none none reverse"

            }

        });

    });

    /* GALLERY STAGGER */

    gsap.from(".photo-card",{

        opacity:0,

        y:100,

        stagger:0.15,

        duration:1.2,

        ease:"power3.out",

        scrollTrigger:{

            trigger:".photo-grid",

            start:"top 80%"

        }

    });

} 