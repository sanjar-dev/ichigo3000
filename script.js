// Declaring variables
var clicks = 0;
var score = 0; // in millilitres
var scoreGain = 0;
var averageScoreGain = 0;
var multiplier = 10;

var displayString = { // postfixs for components
    clicks: "Times clicked: ",
    multiplier: "Score multiplier: ",
    scoreGain: "Last score gain: ",
    averageScoreGain: "Average score gain: "
}
var litreString = { // litre metrics postfixs (may add some more)
    ml: " ml. (millilitre)",
    l:  " l. (litre)",
    kl: " kl. (kilolitre)"
} 

// Loading cached values (if cached)
var data; // define data variable
if (localStorage.cachedData) {
    // parse JSON data value from localstorage
    data = JSON.parse(localStorage.cachedData);
    // load values
    clicks = data.clicks;
    score = data.score;
    scoreGain = data.scoreGain;
    averageScoreGain = data.averageScoreGain;
    multiplier = data.multiplier;
}

// HTML Components
var button = document.getElementById("button");
var clicksDisplay = document.getElementById("clicksDisplay");
var scoreDisplay = document.getElementById("scoreDisplay");
var multiplierDisplay = document.getElementById("multiplierDisplay");
var scoreGainDisplay = document.getElementById("scoreGainDisplay");
var averageScoreGainDisplay = document.getElementById("averageScoreGainDisplay");
var multiplierMainDisplay = document.getElementById("multiplierMainDisplay");

// Update output variables
// of components in the start
updateOutput();

/// Functions
// Update output variables
function updateOutput() {
    // Updating inner text of html components
    // to updated variables
    scoreDisplay.innerHTML = formatMillilitre(score);
    clicksDisplay.innerHTML = displayString.clicks + clicks.toString();
    multiplierDisplay.innerHTML = displayString.multiplier + multiplier.toString() + "x";
    scoreGainDisplay.innerHTML = displayString.scoreGain + formatMillilitre(scoreGain);
    averageScoreGainDisplay.innerHTML = displayString.averageScoreGain + formatMillilitre(averageScoreGain);
    multiplierMainDisplay.innerHTML = multiplier + "x";
}
// Cache values
function cacheData() {
    // Set the data object
    // to required variables
    data = {
        clicks: clicks,
        score: score,
        scoreGain: scoreGain,
        averageScoreGain: averageScoreGain,
        multiplier: multiplier
    }
    // Pack it onto the localstorage as JSON
    localStorage.cachedData = JSON.stringify(data);
}
// Pressing button action
function buttonPressed() {
    // Adding to score
    scoreGain = Math.floor(Math.random() * multiplier) + 1;
    averageScoreGain = Math.round(((averageScoreGain + scoreGain) / 2));
    score += scoreGain;
    multiplier += 5;
    // Adding click
    clicks++;
    // Update output and cache updated variables
    updateOutput();
    cacheData();
}
// Format millilitre with coefficient
// and putting right postfix
function formatMillilitre(millilitre) { // Returns string
    // Declaring variables used below
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
    // Return formatted string value
    return ((millilitre / coefficient).toString() + postfix);
}
