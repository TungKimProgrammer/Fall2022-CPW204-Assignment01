

//reduce typing of document.getElementById()
var getEbyId = function(id:string) {
    return document.getElementById(id);
}

// reduce typing (<HTMLInputElement>getElementById(id))
var castInput = function(id:string) {
    return (<HTMLInputElement>getEbyId(id));
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
    getEbyId("calculate").onclick = main;
    getEbyId("clear").onclick = clearTextBoxes;
    getEbyId("miles").ondblclick = clearMiles; // double click to clear Miles text box
    getEbyId("gallons").ondblclick = clearGallons; // double click to clear Gallons text box
}
/**
 * Checks if form data is valid
 * @returns {boolean} Returns true is all data is valid on the form, or false is something is invalid
 */
function isValid():boolean{
    //function should validate form entries
    //and return true or false corresponding to validity
    addInputEventToClearErrors();
    var miles = castInput("miles").value;
    var gallons = (<HTMLInputElement>getEbyId("gallons")).value;

    // var isAllDataValid:boolean = true;
    
    if ( miles !== "" && !isNaN(parseFloat(miles)) && parseFloat(miles) > 0 
        && gallons !== "" && !isNaN(parseFloat(gallons)) && parseFloat(gallons) > 0 ) {
        return true;
    } 

    else {
        if ( miles == "" ) {
            getEbyId("milesError").innerHTML = "Miles driven can't be blank!";
        } 
        else if (isNaN(parseFloat(miles)) || parseFloat(miles) <= 0 ) {
            getEbyId("milesError").innerHTML = "Miles driven must be a valid number!";
        }

        if (  gallons == "" ) {
            getEbyId("gallonsError").innerHTML = "Gallons of gas can't be blank!";
        } 
        else if (isNaN(parseFloat(gallons)) || parseFloat(gallons) <= 0 ) {
            getEbyId("gallonsError").innerHTML = "Gallons of gas must be a valid number!";
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
        var miles = parseFloat((<HTMLInputElement>getEbyId("miles")).value);
        var gallons = parseFloat(castInput("gallons").value);
        var milesPerGallon = calculateMPG(miles,gallons);
        displayResults(milesPerGallon);
        setTimeout(() => '', 5000);
    }
        
}

/**
 * Displays given MPG on the form
 * @param {string|number} milesPerGallon Number containing the miles per gallon
 */
function displayResults(milesPerGallon:number):void{
    //display the MPG result in a text box
    // get <input> element containing id="mpg"
    // must cast as <HTMLInputElement> otherwise no .value
    let mpgBox:HTMLInputElement = <HTMLInputElement>getEbyId("mpg");
    mpgBox.value = milesPerGallon.toString();
    textToSpeech(milesPerGallon + "miles per gallon");
    
    /* another way to display value to text box
    (<HTMLInputElement>getEbyId("mpg")).value = milesPerGallon.toString();
    */
}

/**
 * Calculates miles per gallon
 * @param {string|number} milesDriven The number of miles driven
 * @param {string|number} gallonsUsed The number of gallons used
 */
function calculateMPG(milesDriven:number, gallonsUsed:number):number {
    //calculate MPG
    let milesPerGallon:number = milesDriven / gallonsUsed;
    //return the MPG as a number
    return parseFloat(milesPerGallon.toFixed(2)); 
}

// Create a function that Clears error messages and last result
// when user start typing 
function addInputEventToClearErrors() {
    getEbyId("miles").addEventListener("input", clearErrors);
    getEbyId("gallons").addEventListener("input", clearErrors);
}

// Create a function that Clears error messages and last result
function clearErrors() {
    getEbyId("milesError").innerHTML = "";
    getEbyId("gallonsError").innerHTML = "";
    castInput("mpg").value = "";
    /*
    let allSpans = document.querySelectorAll("span");
    for (let i = 0; i < allSpans.length; i++) {
        <HTMLInputElement>allSpans[i].value = "";
    }
    */
}

// Create a function that Clears all the form text boxes
function clearTextBoxes() {
    castInput("miles").value = ""; 
    castInput("gallons").value = ""; 
    clearErrors();
    playAudio("car-start-up");
    /* Other ways to reset/clear forms:
    1.
    let myForm = <HTMLInputElement>document.getElementById("");
    myForm.reset();

    <HTMLInputElement>document.getElementById("").reset();

    2.
    let allBoxes = document.querySelectorAll("input[type=text]");
    for (let i = 0; i < allBoxes.length; i++) {
        let currBox = <HTMLInputElement>allBoxes[i];
        currBox.value = "";
    }
    */

}

// Create a function that Clears Miles text box and error message
function clearMiles() {
    castInput("miles").value = ""; 
    getEbyId("milesError").innerHTML = "";
    castInput("mpg").value = "";
}

// Create a function that Clears Gallons text box and error message
function clearGallons() {
    castInput("gallons").value = ""; 
    getEbyId("gallonsError").innerHTML = "";
    castInput("mpg").value = "";
}

// Create function to play audio
function playAudio(id:string) {
    var x = <HTMLAudioElement>getEbyId(id);
    x.play();
}

/**
 * function that converts text to speech
 * @param {*} text is the content to be read out loud
 */
 function textToSpeech(text:string) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
}

// this is for later use
function showImage(srcOfImage:string, altText:string){
    var x = document.createElement("img");
    x.setAttribute("id", "displayImage");
    x.setAttribute("src", srcOfImage);
    x.setAttribute("alt", altText);
    document.body.appendChild(x);
    }