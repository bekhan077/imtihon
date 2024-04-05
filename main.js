let onSlide = false;
let activeIndex = 0

window.addEventListener("load", () => {
    const dots = document.querySelectorAll(".carousel_dot");
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", () => slide(i));
    }

    const buttonPrev = document.querySelector(".carousel_button__prev");
    const buttonNext = document.querySelector(".carousel_button__next");
    buttonPrev.addEventListener("click", () => slide(activeIndex - 1));
    buttonNext.addEventListener("click", () => slide(activeIndex + 1));

    autoSlide();
});

function autoSlide() {
    setInterval(() => {
        slide(activeIndex + 1);
    }, 3000);
}

function slide(toIndex) {
    if (onSlide) return;
    onSlide = true;

    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");
    const itemActiveIndex = itemsArray.indexOf(itemActive);
    let newItemActive = null;

    const dots = document.querySelectorAll(".carousel_dot");
    const dotActive = document.querySelector(".carousel_dot__active");


    dotActive.classList.remove("carousel_dot__active");
    dots[toIndex % dots.length].classList.add("carousel_dot__active");


    activeIndex = toIndex % itemsArray.length;

    if (toIndex > itemActiveIndex) {
        if (toIndex >= itemsArray.length) {
            toIndex = 0;
        }
        newItemActive = itemsArray[toIndex];
        newItemActive.classList.add("carousel_item__pos_next");
        setTimeout(() => {
            newItemActive.classList.add("carousel_item__next");
            itemActive.classList.add("carousel_item__next");
        }, 20);
    } else {
        if (toIndex < 0) {
            toIndex = itemsArray.length - 1;
        }
        newItemActive = itemsArray[toIndex];
        newItemActive.classList.add("carousel_item__pos_prev");
        setTimeout(() => {
            newItemActive.classList.add("carousel_item__prev");
            itemActive.classList.add("carousel_item__prev");
        }, 20);
    }

    newItemActive.addEventListener(
        "transitionend",
        () => {
            itemActive.className = "carousel_item";
            newItemActive.className = "carousel_item carousel_item__active";
            onSlide = false;
        }, {
            once: true,
        }
    );
}