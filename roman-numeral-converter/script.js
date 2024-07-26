const btnConvert = document.getElementById("convert-btn");
const inputField = document.getElementById("number");
const outputContainer = document.getElementById("output");

// Macro definitions for min and max inputs
const MAX_INPUT = 3999;
const MIN_INPUT = 1;

function convertToRomanNumeral(intInput) {
    // Create roman table from the given table on FCC
    const romanTable = [
        { roman: "M", arabic: 1000 },
        { roman: "CM", arabic: 900 },
        { roman: "D", arabic: 500 },
        { roman: "CD", arabic: 400 },
        { roman: "C", arabic: 100 },
        { roman: "XC", arabic: 90 },
        { roman: "L", arabic: 50 },
        { roman: "XL", arabic: 40 },
        { roman: "X", arabic: 10 },
        { roman: "IX", arabic: 9 },
        { roman: "V", arabic: 5 },
        { roman: "IV", arabic: 4 },
        { roman: "I", arabic: 1 }
    ];
    let strResult = "";

    // Loop through roman table and test each roman against the input
    for (const { roman, arabic } of romanTable) {
        const intCount = Math.floor(intInput / arabic);
        strResult += roman.repeat(intCount); 
        intInput -= arabic * intCount; 
    }

    return strResult;
}

function showResult() {
    const strInput = inputField.value;
    const intInput = parseInt(strInput);
    let resultHTML = ``;
    inputField.focus();

    // Invalid input checking
    if (strInput.trim() === "" || isNaN(intInput)) {
        resultHTML = `<p id="invalid-output">Please enter a <strong>valid number</strong>.</p>`;
    } else if (intInput < 1) {
        resultHTML = `<p id="invalid-output">Please enter a number <strong>greater than or equal to ${MIN_INPUT}</strong>.</p>`;
    } else if (intInput > 3999) {
        resultHTML = `<p id="invalid-output">Please enter a number <strong>less than or equal to ${MAX_INPUT}</strong>.</p>`;
    } else {
        // After passing error checks, convert input to roman numeral and set HTML
        const strResult = convertToRomanNumeral(intInput);
        resultHTML = `<strong>${strResult}</strong>`;
    }

    // Reveal the div which is initially hidden (better spacing)
    outputContainer.innerHTML = resultHTML;
    outputContainer.style.display = "block";
    inputField.value = "";
}

// Sets a listener for when the button is clicked
btnConvert.addEventListener("click", showResult);

// Sets a listener for whenever an enter is pressed
document.body.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        showResult();
    }

    if (event.key === "Escape") {
        inputField.blur();
    }
});