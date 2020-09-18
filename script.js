// Setting up default values
const litrePostfix = {
    ml: " ml. (millilitre)",
    l:  " l. (litre)",
    kl: " kl. (kilolitre)"
}
var clickCounter, clickGain, postfix, coefficient;

// Loading cached variables
var clickCached = localStorage['clicks'];
var gainCached = localStorage['gain'];
if (clickCached) { clickCounter = JSON.parse(clickCached); } else { clickCounter = 0; }
if (gainCached) { clickGain = JSON.parse(gainCached); } else { clickGain = 10; }
var timesClicked = clickGain - 10;
var averageGain = clickGain;
var previousAvarageGain = averageGain;

// Setting output values
var counterDisplay = document.getElementById("clickCounter");
var gainDisplay = document.getElementById("showClickGain");
var infoBoxDisplay = document.getElementById("infoBox");

counterDisplay.innerHTML = convertLitre(clickCounter);
gainDisplay.innerHTML = clickGain + "x";
updateInfoBox();

// Show progress information box
function showInfoBox() {
    infoBoxDisplay.style.display = "block";
}
// Update statistics values
function updateInfoBox() {
    infoBoxDisplay.innerHTML = "STATS:<br>";
    infoBoxDisplay.innerHTML += "Times clicked: " + timesClicked + "<br>";
    infoBoxDisplay.innerHTML += "Average gain: " + averageGain;
}
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
    randomClickGain = Math.floor(Math.random() * clickGain) + 1;
    averageGain = (previousAvarageGain + randomClickGain) / 2;
    previousAvarageGain = Math.round(averageGain);

    clickCounter += randomClickGain;
    clickGain += 1;
    timesClicked = clickGain - 10;
    // Outputing updated values
    counterDisplay.innerHTML = convertLitre(clickCounter);
    gainDisplay.innerHTML = clickGain + "x";
    updateInfoBox();
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
