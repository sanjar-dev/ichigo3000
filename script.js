// Setting up default values
const litrePostfix = {
    ml: " ml. (millilitre)",
    l:  " l. (litre)",
    kl: " kl. (kilolitre)"
}
var clickCounter, clickGain, postfix, coefficient;
var counterDisplay = document.getElementById("clickCounter");
var gainDisplay = document.getElementById("showClickGain");

// Loading cached variables
var clickCached = localStorage['clicks'];
var gainCached = localStorage['gain'];
if (clickCached) { clickCounter = JSON.parse(clickCached); } else { clickCounter = 0; }
if (gainCached) { clickGain = JSON.parse(gainCached); } else { clickGain = 10; }

// Setting output values
counterDisplay.innerHTML = convertLitre(clickCounter);
gainDisplay.innerHTML = clickGain + "x";

// Reseting score
function resetScore() {
    // Confirming reseting score
    var isConfirmed = confirm("Reset your score?");
    if (isConfirmed) {
        // Clearing cache and refreshing page
        localStorage.clear();
        document.location.reload();
    }
}
// Clicking button
function clickCount() {
    // Adding values
    clickCounter += Math.floor(Math.random() * clickGain) + 1;
    clickGain += 1;
    // Outputing updated values
    counterDisplay.innerHTML = convertLitre(clickCounter);
    gainDisplay.innerHTML = clickGain + "x";
    // Caching updated values
    localStorage['clicks'] = clickCounter;
    localStorage['gain'] = clickGain;
}
// Formatting millilitres (counter)
function convertLitre(mlitre) {
    // Setting default values
    postfix = litrePostfix.ml;
    coefficient = 1;
    // Checking conditions
    if (mlitre >= 1000 * 1000) {
        postfix = litrePostfix.kl;
        coefficient = 1000 * 1000;
    } else if (mlitre >= 1000) {
        postfix = litrePostfix.l;
        coefficient = 1000;
    }
    // Returning formatted string
    return (mlitre / coefficient).toString() + postfix;
}
