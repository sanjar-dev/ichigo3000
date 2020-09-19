// Declaring variables
var score = 0; // in millilitres
var multiplier = 0;
var clicks = 0;
var displayString = {
    clicks: "Times clicked: "
}
var litreString = {
    ml: " ml. (millilitre)",
    l:  " l. (litre)",
    kl: " kl. (kilolitre)"
} 

// HTML Components
var button = document.getElementById("button");
var clicksDisplay = document.getElementById("clicksDisplay");
var scoreDisplay = document.getElementById("scoreDisplay");

// Update output variables
// of components in the start
updateOutput();

/// Functions
// Update output variables
function updateOutput() {
    // Updating inner text of html components
    // to updated variables
    clicksDisplay.innerHTML = displayString.clicks + clicks.toString();
    scoreDisplay.innerHTML = formatMillilitre(score);
}
// Pressing button action
function buttonPressed() {
    // Adding to score
    score += Math.floor(Math.random() * 100) + 1;
    // Adding click
    clicks++;
    // Update output variables
    updateOutput();
}
// Format millilitre with coefficient
// and putting right postfix
function formatMillilitre(millilitre) { // Returns string
    var postfix, coefficient;
    switch (true) {
        // Starting from highest to lowest
        // Kilolitre
        case (millilitre >= 1000 * 1000): {
            postfix = litreString.kl;
            coefficient = 1000 * 1000;
        } break;
        // Litre
        case (millilitre >= 1000): {
            postfix = litreString.l;
            coefficient = 1000;
        } break;
        // Millilitre
        default: {
            postfix = litreString.ml;
            coefficient = 1;
        } break;
    }
    return (((millilitre / coefficient).toFixed(3)).toString() + postfix);
}
