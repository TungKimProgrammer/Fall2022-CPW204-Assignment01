var $ = function(id) {
    return document.getElementById(id);
}
/*
window.onload = function() {
    let myButton1 = $("calculate");
    myButton1.onclick = main;
    let myButton2 = $("clear");
    myButton2.onclick = clearTextBoxes;
} 
*/
window.onload = function() {
    $("calculate").onclick = main;
    $("clear").onclick = clearTextBoxes;
    $("miles").ondblclick = clearMiles; // double click to clear Miles textbox
    $("gallons").ondblclick = clearGallons; // double click to clear Gallons textbox
}
/**
 * Checks if form data is valid
 * @returns {boolean} Returns true is all data is valid on the form, or false is something is invalid
 */
function isValid(){
    //function should validate form entries
    //and return true or false corresponding to validity
    listenInput();
    var miles = $("miles").value;
    var gallons = $("gallons").value;

    if ( miles !== "" && !isNaN(miles) && miles > 0 
        && gallons !== "" && !isNaN(gallons) && gallons > 0 ) {
        return true;
    } else {
        if ( miles == "" ) {
            $("milesError").innerHTML = "Miles driven can't be blank!";
        } else if ( isNaN(miles) || miles <= 0 ) {
            $("milesError").innerHTML = "Miles driven must be a valid number!";
        }
        if (  gallons == "" ) {
            $("gallonsError").innerHTML = "Gallons of gas can't be blank!";
        } else if( isNaN(gallons) || gallons <= 0 ) {
            $("gallonsError").innerHTML = "Gallons of gas must be a valid number!";
        }
        return false;
    }
}

/** 
 * This function should be called when the calculate button is clicked
*/

function main(){
    //check if data is valid
    //if data is valid
    if (isValid()) {
        var miles = $("miles").value;
        var gallons = $("gallons").value;
        miles = parseFloat(miles);
        gallons = parseFloat(gallons);
        var milesPerGallon = calculateMPG(miles,gallons);
        displayResults(milesPerGallon);
        playAudio("car-start-up");
    }
        
}

/**
 * Displays given MPG on the form
 * @param {string|number} milesPerGallon String or number containing the miles per gallon
 */
function displayResults(milesPerGallon){
    //display the MPG result in a text box
    $("mpg").value = milesPerGallon;
}

/**
 * Calculates miles per gallon
 * @param {string|number} milesDrive The number of miles driven
 * @param {string|number} gallonsUsed The number of gallons used
 */
function calculateMPG(milesDrive, gallonsUsed){
    //calculate MPG
    milesPerGallon = milesDrive / gallonsUsed;
    //return the MPG as a number
    return milesPerGallon.toFixed(2); 
}

// Create a function that Clears error messages and last result
// when user start typing 
function listenInput() {
    $("miles").addEventListener("input", clearErrors);
    $("gallons").addEventListener("input", clearErrors);
}

// Create a function that Clears error messages and last result
function clearErrors() {
    $("milesError").innerHTML = "";
    $("gallonsError").innerHTML = "";
    $("mpg").value = "";
}

// Create a function that Clears all the form text boxes
function clearTextBoxes() {
    $("miles").value = ""; 
    $("gallons").value = ""; 
    clearErrors();
}

// Create a function that Clears Miles text box and error message
function clearMiles() {
    $("miles").value = ""; 
    $("milesError").innerHTML = "";
    $("mpg").value = "";
}

// Create a function that Clears Gallons text box and error message
function clearGallons() {
    $("gallons").value = ""; 
    $("gallonsError").innerHTML = "";
    $("mpg").value = "";
}

// Create function to play audio
function playAudio(id) {
    var x = $(id);
    x.play();
}

