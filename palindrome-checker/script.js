const btnCheck = document.getElementById("check-btn");

function isPalindrome(strInput) {
    // Create a regex that gets all possible constraints
    const rgxPattern = /[\/\s!@#\$%\^\&*\)\(\+=,._-]+/g;
    const strTest = strInput.replace(rgxPattern, "").toLowerCase();

    // Check for palindrome using two-pointer approach
    let intLeft = 0;
    let intRight = strTest.length - 1;

    while (intLeft < intRight) {
        if (strTest[intLeft] !== strTest[intRight]) return false;
        intLeft++;
        intRight--;
    }

    return true;
}

btnCheck.addEventListener("click", () => {
    const strText = document.querySelector("#text-input").value;

    // Check if the input is empty before proceeding
    if (strText.trim() === "") {
        alert("Please input a value.");
        return null;
    }

    let strResult = (isPalindrome(strText)) ? "is a palindrome" : "is not a palindrome";

    // Create an HTML that will show the result
    const resultContainer = document.getElementById("result");
    const resultHTML = `
        <p>${strText} <strong>${strResult}</strong>.</p>
    `;

    // Reveal the div which is initially hidden (to manage spacing better)
    resultContainer.innerHTML = resultHTML;
    resultContainer.style.display = "block";
});