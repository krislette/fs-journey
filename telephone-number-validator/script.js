const btnCheck = document.getElementById("check-btn");
const btnClear = document.getElementById("clear-btn");
const inputField = document.getElementById("user-input");
const resultDiv = document.getElementById("results-div")

/*
 * Tried to refactor the code into an arrow line function.
 * What happens is that, strInput is the input parameter,
 * then there's the arrow function that specifies the regex
 * for validating diff US phone number formats.
 * After that, the .test() method was chained on the regex's tail
 * which essentially, returns true/false if the parameter is 
 * indeed a match of the regex specified on the beginning.
 * Implicit return was also implemented to make the code shorter.
 * This code was initially 2 lines (simplified into 1).
 */
const isValidTelephoneNumber = strInput => /^1?\s*(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/.test(strInput);

// I really prefer declaring my functions using the old way
// instead of arrow functions. I just use arrow functions
// whenever implicit return (and one-line function) is more appropriate.
function showResult() {
    const strInput = inputField.value;
    const paragraphTag = document.createElement("p");
    inputField.focus();
    
    if (strInput.trim() === "") {
        alert("Please provide a phone number.");
        return null;
    }

    // Create html for p tag and append to parent element (resultDiv)
    paragraphTag.innerHTML = `${isValidTelephoneNumber(strInput) ? "<span id='valid'>Valid</span>" 
                                                                 : "<span id='invalid'>Invalid</span>"} 
                                                                 US number: <strong>${strInput}</strong>`;
    resultDiv.appendChild(paragraphTag);

    resultDiv.style.display = "block";
    inputField.value = "";
}

// Clears result div and resets div display
function clearResult() {
    resultDiv.textContent = "";
    resultDiv.style.display = "none";
}

// Sets a listener for when the buttons are clicked
btnCheck.addEventListener("click", showResult);
btnClear.addEventListener("click", clearResult);

// Sets a listener for whenever an enter is pressed
document.body.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        showResult();
    }

    if (event.key === "Escape") {
        inputField.blur();
    }

    if (event.key === "C" || event.key === "c") {
        clearResult();
    }
});