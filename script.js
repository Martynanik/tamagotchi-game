const spriteDiv = document.querySelector(".sprite")

const positions = [0, -100, -200, 100, 200, 300]; // Define the desired positions
let index = 0; // Initialize index to track the current position

setInterval(() => {
    spriteDiv.style.backgroundPosition = `${positions[index]}px 0`;
    index++;
    if (index >= positions.length) {
        index = 0;
    }
}, 200);


