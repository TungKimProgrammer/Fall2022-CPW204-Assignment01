var getEbyId = function (id) {
    return document.getElementById(id);
};
var castInput = function (id) {
    return getEbyId(id);
};
window.onload = function () {
    getEbyId("calculate").onclick = main;
    getEbyId("clear").onclick = clearTextBoxes;
    getEbyId("miles").ondblclick = clearMiles;
    getEbyId("gallons").ondblclick = clearGallons;
};
function isValid() {
    addInputEventToClearErrors();
    var miles = castInput("miles").value;
    var gallons = getEbyId("gallons").value;
    if (miles !== "" && !isNaN(parseFloat(miles)) && parseFloat(miles) > 0
        && gallons !== "" && !isNaN(parseFloat(gallons)) && parseFloat(gallons) > 0) {
        return true;
    }
    else {
        if (miles == "") {
            getEbyId("milesError").innerHTML = "Miles driven can't be blank!";
        }
        else if (isNaN(parseFloat(miles)) || parseFloat(miles) <= 0) {
            getEbyId("milesError").innerHTML = "Miles driven must be a valid number!";
        }
        if (gallons == "") {
            getEbyId("gallonsError").innerHTML = "Gallons of gas can't be blank!";
        }
        else if (isNaN(parseFloat(gallons)) || parseFloat(gallons) <= 0) {
            getEbyId("gallonsError").innerHTML = "Gallons of gas must be a valid number!";
        }
        return false;
    }
}
function main() {
    if (isValid()) {
        var miles = parseFloat(getEbyId("miles").value);
        var gallons = parseFloat(castInput("gallons").value);
        var milesPerGallon = calculateMPG(miles, gallons);
        displayResults(milesPerGallon);
        setTimeout(function () { return ''; }, 5000);
    }
}
function displayResults(milesPerGallon) {
    var mpgBox = getEbyId("mpg");
    mpgBox.value = milesPerGallon.toString();
    textToSpeech(milesPerGallon + "miles per gallon");
}
function calculateMPG(milesDriven, gallonsUsed) {
    var milesPerGallon = milesDriven / gallonsUsed;
    return parseFloat(milesPerGallon.toFixed(2));
}
function addInputEventToClearErrors() {
    getEbyId("miles").addEventListener("input", clearErrors);
    getEbyId("gallons").addEventListener("input", clearErrors);
}
function clearErrors() {
    getEbyId("milesError").innerHTML = "";
    getEbyId("gallonsError").innerHTML = "";
    castInput("mpg").value = "";
}
function clearTextBoxes() {
    castInput("miles").value = "";
    castInput("gallons").value = "";
    clearErrors();
    playAudio("car-start-up");
}
function clearMiles() {
    castInput("miles").value = "";
    getEbyId("milesError").innerHTML = "";
    castInput("mpg").value = "";
}
function clearGallons() {
    castInput("gallons").value = "";
    getEbyId("gallonsError").innerHTML = "";
    castInput("mpg").value = "";
}
function playAudio(id) {
    var x = getEbyId(id);
    x.play();
}
function textToSpeech(text) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
}
function showImage(srcOfImage, altText) {
    var x = document.createElement("img");
    x.setAttribute("id", "displayImage");
    x.setAttribute("src", srcOfImage);
    x.setAttribute("alt", altText);
    document.body.appendChild(x);
}
