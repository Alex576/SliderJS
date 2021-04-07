let iterator;
let timeOut, interval;
let imgs = [];
startTimeOut();
for (let i = 1; i <= 6; i++) {
    imgs.push(document.getElementById("img" + i));
}
for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener("click", function (e) {
        stopTimeout();
        let src = document.getElementById(e.currentTarget.id);
        let element = src.id;
        let index = +element[element.length - 1] - 1;
        chageImageWithOpasity(index);
        drawBorders(src);
        startTimeOut();
    });
}
let btns = document.querySelectorAll("button");
drawBorders(imgs[0]);
btns[0].addEventListener("click", function () {
    stopTimeout();
    let mainImg = document.getElementById("main_image");
    let index = getIndexBtn(mainImg,true);
    chageImageWithOpasity(index);
    drawBorders(imgs[index]);
    startTimeOut();
});
btns[1].addEventListener("click", function () {
    stopTimeout();
    let mainImg = document.getElementById("main_image");
    let index = getIndexBtn(mainImg,false);
    chageImageWithOpasity(index);
    drawBorders(imgs[index]);
    startTimeOut();
});


function stopTimeout() {
    clearInterval(interval);
    clearTimeout(timeOut);
}
function startTimeOut() {
    timeOut = setTimeout(() => {
        interval = setInterval(() => {
            let mainImg = document.getElementById("main_image");
            let index = getIndexBtn(mainImg,false);
            chageImageWithOpasity(index);
            drawBorders(imgs[index]);
        }, 10000);
    }, 10000);
}
function drawBorders(src) {
    for (const img of imgs) {
        img.classList.remove("white__border");
    }
    src.classList.add("white__border");
}
function getIndexBtn(mainImg,isLeft) {

    let index = mainImg.src[mainImg.src.length - 5] - 1;
    index = isLeft? --index:++index;
    if (index < 0) {
        index = imgs.length - 1;
    }
    if (index > imgs.length - 1) {
        index = 0;
    }
    return index
}
function chageImageWithOpasity(index) {
    clearInterval(iterator);
    let mainImg = document.getElementById("main_image");
    let backgroundSrc = getComputedStyle(imgs[index], false).backgroundImage;
    mainImg.src = backgroundSrc.substr(backgroundSrc.length-14,12);
    mainImg.style.opacity = 0;
    let opacity = 0;
    iterator = setInterval(() => {
        opacity += 0.01;
        if (opacity >= 1) {
            clearInterval(iterator);
        }
        mainImg.style.opacity = opacity;
    }, 5);
}

