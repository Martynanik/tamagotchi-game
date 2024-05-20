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
const degradationInterval = 300;
let chosenGif = [];
let levelNr = 1;
const imageElement = document.getElementById("level-up");
if (currentWidthFood === 0) {
    alert("game over");
}
function showImage() {
    imageElement.style.display = "block"; // Show the image
    setTimeout(hideImage, 400); // Set a timeout to hide the image after 400 milliseconds
}
function hideImage() {
    imageElement.style.display = "none"; // Hide the image
}
// Call the function to hide the image
hideImage();
function degradeFoodProgressBar() {
    if (currentWidthFood >= 0) {
        currentWidthFood -= 5;
        myBarFood.style.width = currentWidthFood + "%";
        setTimeout(degradeFoodProgressBar, degradationInterval);
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
        currentWidthPlay -= 5;
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
feedButton.onclick = () => {
    currentWidthFood = addPoints(myBarFood, currentWidthFood);
    console.log("food" + currentWidthFood);
    if (currentWidthFood === 100 && currentWidthFun === 100 && currentWidthPlay === 100) {
        levelUp();
    }
};
funButton.onclick = () => {
    currentWidthFun = addPoints(myBarFun, currentWidthFun);
    console.log("fun" + currentWidthFun);
    if (currentWidthFood === 100 && currentWidthFun === 100 && currentWidthPlay === 100) {
        levelUp();
    }
};
playButton.onclick = () => {
    currentWidthPlay = addPoints(myBarPlay, currentWidthPlay);
    console.log("play" + currentWidthPlay);
    if (currentWidthFood === 100 && currentWidthFun === 100 && currentWidthPlay === 100) {
        levelUp();
    }
};
let gifImageClicked = false;
startGameButton.onclick = () => {
    if (!gifImageClicked) {
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
            chosenGif.push(1);
            const clickedElement = event.target;
            emptyDiv.appendChild(clickedElement);
            gifImageClicked = true;
        }
    });
}
function levelUp() {
    showImage();
    levelNr += 1;
    level.innerHTML = "Level: " + levelNr;
}



