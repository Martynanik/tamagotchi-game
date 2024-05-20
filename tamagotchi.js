"use strict";
const startPage = document.querySelector(".start-page");
const startGameButton = document.querySelector(".btn-start-game");
const mainPage = document.querySelector(".main-page");
const gifImage = document.querySelectorAll(".gifImage");
let emptyDiv = document.querySelector(".empty-div");
let level = document.querySelector(".level");
////action buttons
let feedButton = document.querySelector(".feed-btn");
let playButton = document.querySelector(".play-btn");
let funButton = document.querySelector(".fun-btn");
let myBarFood = document.getElementById("myBar-food");
let myBarFun = document.getElementById("myBar-fun");
let myBarPlay = document.getElementById("myBar-play");
let currentWidthFood = 100;
let currentWidthPlay = 100;
let currentWidthFun = 100;
let levelNr = 1;
let chosenGif = [];
const degradationInterval = 2000;
const imageElement = document.getElementById("level-up");
level.innerHTML = "Level: " + levelNr;
const spriteDiv = document.querySelector(".sprite");
const sprite2Div = document.querySelector(".sprite2");
const sprite3Div = document.querySelector(".sprite3");
const batPositions = [0, -300, -600, -300];
const fishPositions = [0, -195, -390, -585];
const birdPositions = [0, -200, -400, 200, 400, 600];
let birdIndex = 0;
let fishIndex = 0;
let batIndex = 0;
setInterval(() => {
    spriteDiv.style.backgroundPosition = `${birdPositions[birdIndex]}px 0`;
    birdIndex++;
    if (birdIndex >= birdPositions.length) {
        birdIndex = 0;
    }
    sprite2Div.style.backgroundPosition = `${fishPositions[fishIndex]}px 0`;
    fishIndex++;
    if (fishIndex >= fishPositions.length) {
        fishIndex = 0;
    }
    sprite3Div.style.backgroundPosition = `${batPositions[batIndex]}px 0`;
    batIndex++;
    if (batIndex >= batPositions.length) {
        batIndex = 0;
    }
}, 300);
function showImage() {
    imageElement.style.display = "block";
    setTimeout(hideImage, 400);
}
function hideImage() {
    imageElement.style.display = "none";
}
hideImage();
function degradeFoodProgressBar() {
    if (currentWidthFood > 0) {
        currentWidthFood -= 5;
        myBarFood.style.width = currentWidthFood + "%";
        setTimeout(degradeFoodProgressBar, degradationInterval);
    }
    else {
        emptyDiv.removeChild(chosenGif[0]);
        chosenGif = [];
        currentWidthFood = 100;
        currentWidthPlay = 100;
        currentWidthFun = 100;
        levelNr = 1;
        level.innerHTML = "Level: " + levelNr;
        startPage.style.display = "block";
        mainPage.style.display = "none";
        return;
    }
}
function degradeFunProgressBar() {
    if (currentWidthFun >= 0) {
        currentWidthFun -= 5;
        myBarFun.style.width = currentWidthFun + "%";
        setTimeout(degradeFunProgressBar, degradationInterval);
    }
}
function degradePlayProgressBar() {
    if (currentWidthPlay >= 0) {
        currentWidthPlay -= 1;
        myBarPlay.style.width = currentWidthPlay + "%";
        setTimeout(degradePlayProgressBar, degradationInterval);
    }
}
function addPoints(progressBar, currentValue) {
    if (currentValue <= 95) {
        currentValue += 5;
        progressBar.style.width = currentValue + "%";
    }
    return currentValue;
}
function addPointsPlay(progressBar, currentValue) {
    if (currentValue <= 95) {
        currentValue += 3;
        progressBar.style.width = currentValue + "%";
    }
    return currentValue;
}
feedButton.onclick = () => {
    currentWidthFood = addPoints(myBarFood, currentWidthFood);
    console.log("food" + currentWidthFood);
    if (currentWidthFood === 100 && currentWidthFun === 100) {
        levelUp();
    }
};
funButton.onclick = () => {
    currentWidthFun = addPoints(myBarFun, currentWidthFun);
    console.log("fun" + currentWidthFun);
    if (currentWidthFood === 100 && currentWidthFun === 100) {
        levelUp();
    }
};
playButton.onclick = () => {
    money.innerHTML = `Money: 0`;
    game.style.display = "block";
    startPage.style.display = "none";
    mainPage.style.display = "none";
    currentWidthPlay = addPointsPlay(myBarPlay, currentWidthPlay);
    console.log("play" + currentWidthPlay);
};
let gifImageClicked = false;
startGameButton.onclick = () => {
    if (chosenGif.length === 0) {
        return alert("Choose an animal");
    }
    emptyDiv.classList.add("move");
    startPage.style.display = "none";
    mainPage.style.display = "block";
    degradeFoodProgressBar();
    degradeFunProgressBar();
    degradePlayProgressBar();
};
for (let i = 0; i < gifImage.length; i++) {
    gifImage[i].addEventListener("click", (event) => {
        if (chosenGif.length <= 0) {
            const clickedElement = event.target;
            let clonedElement = clickedElement.cloneNode(true);
            chosenGif.push(clonedElement);
            console.log(chosenGif);
            emptyDiv.appendChild(chosenGif[chosenGif.length - 1]);
            gifImageClicked = true;
            setInterval(() => {
            }, 300);
        }
    });
}
function levelUp() {
    showImage();
    levelNr += 1;
    level.innerHTML = "Level: " + levelNr;
}
///// whack a mole
const cont = document.querySelector(".cont");
const money = document.querySelector(".money");
let game = document.querySelector(".game");
let moneyHave = 0;
money.innerHTML = `Money: ${moneyHave}`;
if (cont && money) {
    for (let i = 1; i < 26; i++) {
        cont.innerHTML += `<div class='border' id="${i}"></div>`;
    }
    function generateRandomNumber() {
        return Math.floor(Math.random() * 25) + 1;
    }
    function moveBox() {
        let randomNum = generateRandomNumber();
        let currentBox = document.querySelector('.green-box');
        if (currentBox) {
            let newDiv = document.getElementById(randomNum.toString());
            if (newDiv) {
                newDiv.appendChild(currentBox); // Move the green box to the new div
            }
        }
        else {
            // If there's no existing green box, create one and append it to the random div
            let divId = document.getElementById(randomNum.toString());
            if (divId) {
                let greenBox = document.createElement('div');
                greenBox.classList.add('green-box');
                divId.appendChild(greenBox);
            }
        }
        const greenBox = document.querySelector(".green-box");
        if (greenBox) {
            greenBox.onclick = () => {
                moneyCalculator();
            };
        }
    }
    setInterval(moveBox, 1500);
}
function moneyCalculator() {
    moneyHave++;
    if (money) {
        money.innerHTML = `Money: ${moneyHave}`;
    }
    if (moneyHave === 10) {
        game.style.display = "none";
        startPage.style.display = "none";
        mainPage.style.display = "block";
        moneyHave = 0;
    }
}
