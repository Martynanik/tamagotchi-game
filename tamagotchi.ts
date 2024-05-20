const startPage: HTMLElement = document.querySelector(".start-page") as HTMLElement;
const startGameButton: HTMLElement = document.querySelector(".btn-start-game") as HTMLElement;
const mainPage: HTMLElement = document.querySelector(".main-page") as HTMLElement;
const gifImage: NodeList = document.querySelectorAll(".gifImage") as NodeList;
let emptyDiv: HTMLElement = document.querySelector(".empty-div") as HTMLElement;
let level: HTMLElement = document.querySelector(".level") as HTMLElement;

////action buttons
let feedButton: HTMLElement = document.querySelector(".feed-btn") as HTMLElement;
let playButton: HTMLElement = document.querySelector(".play-btn") as HTMLElement;
let funButton: HTMLElement = document.querySelector(".fun-btn") as HTMLElement;
let myBarFood: HTMLElement = document.getElementById("myBar-food") as HTMLElement;
let myBarFun: HTMLElement = document.getElementById("myBar-fun") as HTMLElement;
let myBarPlay: HTMLElement = document.getElementById("myBar-play") as HTMLElement;

let currentWidthFood: number = 100;
let currentWidthPlay: number = 100;
let currentWidthFun: number = 100;
const degradationInterval: number = 300;

let chosenGif: number[] = [];
let levelNr: number = 1;




const imageElement: HTMLElement = document.getElementById("level-up") as HTMLElement;
if ( currentWidthFood === 0){
    alert("game over")
}
function showImage(): void {
    imageElement.style.display = "block"; // Show the image
    setTimeout(hideImage, 400); // Set a timeout to hide the image after 400 milliseconds
}

function hideImage(): void {
    imageElement.style.display = "none"; // Hide the image
}

// Call the function to hide the image
hideImage();

function degradeFoodProgressBar(): void {
    if (currentWidthFood >= 0) {
        currentWidthFood -= 5;
        myBarFood.style.width = currentWidthFood + "%";
        setTimeout(degradeFoodProgressBar, degradationInterval);
    }

}

function degradeFunProgressBar(): void {
    if (currentWidthFun >= 0) {
        currentWidthFun -= 5;
        myBarFun.style.width = currentWidthFun + "%";
        setTimeout(degradeFunProgressBar, degradationInterval);
    }
}

function degradePlayProgressBar(): void {
    if (currentWidthPlay >= 0) {
        currentWidthPlay -= 5;
        myBarPlay.style.width = currentWidthPlay + "%";
        setTimeout(degradePlayProgressBar, degradationInterval);
    }
}

function addPoints(progressBar: HTMLElement, currentValue: number): number {
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

let gifImageClicked: boolean = false;

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
            const clickedElement: HTMLElement = event.target as HTMLElement;
            emptyDiv.appendChild(clickedElement);
            gifImageClicked = true;
        }
    });
}

function levelUp(): void {
    showImage();
    levelNr += 1;
    level.innerHTML = "Level: " + levelNr;
}

