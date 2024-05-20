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
let levelNr: number = 1
let chosenGif: any = [];
const degradationInterval: number = 2000;

const imageElement: HTMLElement = document.getElementById("level-up") as HTMLElement;

level.innerHTML = "Level: " + levelNr;

const spriteDiv = document.querySelector(".sprite") as HTMLElement;
const sprite2Div = document.querySelector(".sprite2") as HTMLElement;
const sprite3Div = document.querySelector(".sprite3") as HTMLElement;

const batPositions = [0, -300, -600, -300];
const fishPositions = [0, -195, -390, -585];
const birdPositions = [0, -200, -400, 200, 400, 600];
let birdIndex = 0;
let fishIndex = 0
let batIndex = 0

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
}, 300)


function showImage(): void {
    imageElement.style.display = "block";
    setTimeout(hideImage, 400);
}

function hideImage(): void {
    imageElement.style.display = "none";
}

hideImage();

function degradeFoodProgressBar(): void {
    if (currentWidthFood > 0) {
        currentWidthFood -= 5;
        myBarFood.style.width = currentWidthFood + "%";
        setTimeout(degradeFoodProgressBar, degradationInterval);
    } else {
        emptyDiv.removeChild(chosenGif[0]);
        chosenGif= [];
         currentWidthFood= 100;
         currentWidthPlay = 100;
         currentWidthFun = 100;
         levelNr = 1
        level.innerHTML = "Level: " + levelNr;
        startPage.style.display = "block";
        mainPage.style.display = "none";
        return;
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
        currentWidthPlay -= 1;
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

function addPointsPlay(progressBar: HTMLElement, currentValue: number): number {
    if (currentValue <= 95) {
        currentValue += 3;
        progressBar.style.width = currentValue + "%";
    }
    return currentValue;
}
feedButton.onclick = () => {
    currentWidthFood = addPoints(myBarFood, currentWidthFood);
    console.log("food" + currentWidthFood);
    if (currentWidthFood === 100 && currentWidthFun === 100 ) {
        levelUp();
    }
};

funButton.onclick = () => {
    currentWidthFun = addPoints(myBarFun, currentWidthFun);
    console.log("fun" + currentWidthFun);
    if (currentWidthFood === 100 && currentWidthFun === 100 ) {
        levelUp();
    }
};

playButton.onclick = () => {
    money.innerHTML = `Money: 0`;
    game.style.display = "block"
    startPage.style.display = "none";
    mainPage.style.display = "none";
    currentWidthPlay = addPointsPlay(myBarPlay, currentWidthPlay);
    console.log("play" + currentWidthPlay);

};

let gifImageClicked: boolean = false;

startGameButton.onclick = () => {
    if (chosenGif.length=== 0) {
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
            const clickedElement: HTMLElement = event.target as HTMLElement;
            let clonedElement = clickedElement.cloneNode(true) as HTMLElement;
            chosenGif.push(clonedElement);
            console.log(chosenGif)
            emptyDiv.appendChild(chosenGif[chosenGif.length - 1]);
            gifImageClicked = true;
            setInterval(() => {
            }, 300);
        }

    });
}


function levelUp(): void {
    showImage();
    levelNr += 1;
    level.innerHTML = "Level: " + levelNr;
}


///// whack a mole
const cont: HTMLElement  = document.querySelector(".cont") as HTMLElement;
const money: HTMLElement  = document.querySelector(".money") as HTMLElement
let game: HTMLElement = document.querySelector(".game") as HTMLElement;

let moneyHave: number = 0;
money.innerHTML = `Money: ${moneyHave}`;



if (cont && money) {
    for (let i = 1; i < 26; i++) {
        cont.innerHTML += `<div class='border' id="${i}"></div>`;
    }

    function generateRandomNumber(): number {
        return Math.floor(Math.random() * 25) + 1;
    }

    function moveBox(): void {
        let randomNum: number = generateRandomNumber();
        let currentBox: HTMLElement | null = document.querySelector('.green-box');
        if (currentBox) {
            let newDiv: HTMLElement | null = document.getElementById(randomNum.toString());
            if (newDiv) {
                newDiv.appendChild(currentBox); // Move the green box to the new div
            }
        } else {
            // If there's no existing green box, create one and append it to the random div
            let divId: HTMLElement | null = document.getElementById(randomNum.toString());
            if (divId) {
                let greenBox: HTMLDivElement = document.createElement('div');
                greenBox.classList.add('green-box');
                divId.appendChild(greenBox);
            }
        }
        const greenBox: HTMLElement | null = document.querySelector(".green-box");
        if (greenBox) {
            greenBox.onclick = () => {
                moneyCalculator()
            };
        }
    }
    setInterval(moveBox, 1500);
}





function moneyCalculator(){
    moneyHave++;
    if (money) {
        money.innerHTML = `Money: ${moneyHave}`;
    }
    if(moneyHave === 10){
        game.style.display = "none"
        startPage.style.display = "none";
        mainPage.style.display = "block";
        moneyHave = 0
    }


}


