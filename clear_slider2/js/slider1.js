
let timeOut, interval;
let sliderContainerImages, imageContainer;
let iterator;
imageContainer = [];
sliderContainerImages = [];
let currentImage = 0;
startTimeOut();

for (let i = 1; i <= document.querySelectorAll("img").length; i++) {
    sliderContainerImages.push(document.getElementById("main_image" + i));
}
let mainImageContainer = sliderContainerImages[0].parentNode;
mainImageContainer.style.left = "0px";

for (let i = 1; i <= document.querySelectorAll("img").length; i++) {

    imageContainer.push(document.getElementById("img" + i));
    imageContainer[i - 1].addEventListener("click", function (e) {
        let id = e.currentTarget.id;
        currentImage = parseInt(id[id.length - 1]) - 1;
        changeImage(currentImage);
    });
}
let btn1 = document.getElementById("left_button");
let btn2 = document.getElementById("right_button");
setWhiteBorder(imageContainer[0]);
btn1.addEventListener("click", function () {
    btnEvent(true);
});
btn2.addEventListener("click", function () {
    btnEvent(false);
});
function btnEvent(isLeftBtn) {
    if (isLeftBtn) {
        currentImage = (currentImage - 1) < 0 ? imageContainer.length - 1 : --currentImage;
    }
    else {
        currentImage = (currentImage + 1) > imageContainer.length - 1 ? 0 : ++currentImage;
    }
    changeImage(currentImage);
}
function setWhiteBorder(src) {
    for (const img of imageContainer) {
        img.classList.remove("white__border");
    }
    src.classList.add("white__border");
}
function changeImage(index) {
    stopTimeout();
    clearInterval(iterator);
    setWhiteBorder(imageContainer[index]);
    let oldOffset = Math.abs(parseInt(mainImageContainer.style.left));
    offset = (index) * parseInt(mainImageContainer.children[0].clientWidth);
    let step = ((oldOffset - offset) / parseInt(mainImageContainer.children[0].clientWidth));
    iterator = setInterval(() => {
        if (Math.abs(parseInt(mainImageContainer.style.left)) == offset) {
            clearInterval(iterator);
            mainImageContainer.style.left = -offset + "px"
            return;
        }
        if (Math.abs(parseInt(mainImageContainer.style.left)) > parseInt(mainImageContainer.children[0].clientWidth) * mainImageContainer.children.length - 1) {
            clearInterval(iterator);
            mainImageContainer.style.left = -offset + "px"
            return;
        }
        if (parseInt(mainImageContainer.style.left) > 0) {
            clearInterval(iterator);
            mainImageContainer.style.left = -offset + "px"
            return;
        }
        let currentLeft = parseFloat(mainImageContainer.style.left);
        currentLeft += step;
        mainImageContainer.style.left = currentLeft + "px";
    }, 1);
    startTimeOut();
}
function stopTimeout() {
    clearInterval(interval);
    clearTimeout(timeOut);
}
function startTimeOut() {
    timeOut = setTimeout(() => {
        interval = setInterval(() => {
            btnEvent(false);
        }, 10000);
    }, 10000);
}