let data = []

const colors = ["#000000", "#ffffff"]
const rows = 30, cols = 30;
const maxFallRate = 100;
let fallRate = 5;
let wind = 1;

const canvas = document.getElementById("canvas")


// Fall Rate Controls 
const increaseFallRate = document.getElementById("increaseFallRate")
const decreaseFallRate = document.getElementById("decreaseFallRate")

// Add Event Listeners to change fall rate
increaseFallRate.addEventListener('click', () => {
    fallRate = fallRate + 5 <= maxFallRate ? fallRate + 5 : maxFallRate
    createSnowSource()
})
decreaseFallRate.addEventListener('click', () => {
    fallRate = fallRate - 5 >= 0 ? fallRate - 5 : 0
    createSnowSource()
})


// Wind Controls
const increaseWind = document.getElementById("increaseWind")
const decreaseWind = document.getElementById("decreaseWind")

// Add Event Listeners to change fall rate
increaseWind.addEventListener('click', () => {
    // if wind + 1 is less than 11
    wind = wind + 1 <= 5 ? wind + 1 : wind

    //debug
    console.log(`Wind is now ${wind}`)
})
decreaseWind.addEventListener('click', () => {
    // if wind - 1 is greater than -11
    wind = wind - 1 >= -5 ? wind - 1 : wind

    //debug
    console.log(`Wind is now ${wind}`)
})


function start() {
    createSnowStructure();

    setInterval(animate, 100)
}

function animate() {
    calculateSnowPropagation()
    createSnowSource()
    renderSnow()
}

start()

function createSnowStructure() {
    // calculate the data array size
    const dataSize = rows * cols
    // create all data
    for ( let i = 0; i < dataSize; i++){
        data[i] = 0
    }

}

function createSnowSource(){
    for (let col = 0; col < cols; col++){
        if( Math.round(Math.random() * maxFallRate) < fallRate){
            data[col] = 1
        } else {
            data[col] = 0
        }
    }
}

function calculateSnowPropagation() {
    const lastCel = ( cols * rows ) - 1

    for (let cel = lastCel; cel >= rows; cel--) {
        if (data[cel - rows] === 1) {

            let offset = 0;
            const offsetRandom = Math.random(0)

            // 40% chance of going to the side
            if ( offsetRandom <= 0.2) { offset += 1 }
            if ( offsetRandom >= 0.8) { offset -= 1 }

            // Add wind to offset
            offset += wind
            
            // Move snowflake
            data[cel + offset] = 1; // Move snowflake

        }

        // prevent cels from disappearing
        if ( cel > lastCel - rows ) {
            data[cel] = 0
        }

        data[cel - rows] = 0
    }
   
}

function renderSnow() {
    let html = "<table>"

    for ( let col = 0; col < rows; col++){
        html += "<tr>"
        for (let row = 0; row < cols; row++) {
            // Get cel value and set color
            const actualValue = data[row + col * cols]
            html += `<td style="background-color: ${colors[actualValue]}"></td>` 
        }
        html += "</tr>"
    }

    html += "</table>"   

    canvas.innerHTML = html
}

