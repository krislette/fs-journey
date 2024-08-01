const priceSpan = document.getElementById("price");
const cashInput = document.getElementById("cash");
const changeDueDiv = document.getElementById("change-due");
const btnPurchase = document.getElementById("purchase-btn");
const cidCurrencies = document.querySelectorAll(".cid");

// Given values by FCC
const price = 3.26;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// Equivalent amount of each unit via FCC
const currencyUnits = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
};

// Update the values on the cash register for each transaction
function updateCashRegister() {
    priceSpan.textContent = price;
    cidCurrencies.forEach((span, index) => {
        const amount = cid[index][1];
        span.textContent = currencyUnits[cid[index][0]] >= 1 
            ? Math.floor(amount) 
            : amount.toFixed(2);
    });
}

// Displays the change and whether transaction is OPEN or CLOSED
function displayChange(status, array) {
    changeDueDiv.innerHTML = `<p>Status: <span id="${status.toLowerCase()}">${status}</span></p>`;

    // Sort the array from highest to lowest denomination if the status is "CLOSED"
    if (status === "CLOSED") {
        array.sort((a, b) => {
            return (currencyUnits[b[0]] || 0) - (currencyUnits[a[0]] || 0);
        });
    }

    array.forEach(item => {
        const currencyName = item[0];
        const currencyAmount = item[1];

        const formattedAmount = currencyAmount % 1 === 0 
            ? currencyAmount.toFixed(0) 
            : currencyAmount.toFixed(2);
        changeDueDiv.innerHTML += `${currencyName}: $${formattedAmount}<br>`;
    });
}

// The overall function that acts as the cash register
function cashRegister() {
    const fltCash = parseFloat(cashInput.value);
    let fltChange = fltCash - price;

    if (fltCash < price) {
        alert("Customer does not have enough money to purchase the item.");
        return;
    }
    
    if (fltCash === price) {
        changeDueDiv.innerHTML = "No change due - customer paid with exact cash";
        return;
    }

    cashInput.value = "";
    
    // Calculate total cash in drawer (cid)
    const totalCid = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));
    console.log(totalCid)

    // Check if cid has a sufficient change for the customer (total)
    if (totalCid < fltChange) {
        changeDueDiv.innerHTML = `Status: <span id="closed">INSUFFICIENT_FUNDS</span>`;
        return;
    }

    // Distribute the change across denominations
    const arrChange = [];
    for (let i = cid.length - 1; i >= 0; i--) {
        const strCurrencyName = cid[i][0];
        let fltCurrencyTotal = cid[i][1];
        const fltCurrencyValue = currencyUnits[strCurrencyName];
        let fltCurrencyAmount = 0;

        while (fltChange >= fltCurrencyValue && fltCurrencyTotal > 0) {
            fltChange -= fltCurrencyValue;
            fltChange = parseFloat(fltChange.toFixed(2));
            fltCurrencyTotal -= fltCurrencyValue;
            fltCurrencyAmount += fltCurrencyValue;
        }

        if (fltCurrencyAmount > 0) {
            arrChange.push([strCurrencyName, fltCurrencyAmount]);
            cid[i][1] = parseFloat(fltCurrencyTotal.toFixed(2));
        }
    }

    // Check if there is still change to cover after distributing denominations
    if (fltChange > 0) {
        changeDueDiv.innerHTML = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    updateCashRegister();

    // Display CLOSED if the distribution from cid is equal to the change
    if (totalCid === fltCash - price) {
        displayChange("CLOSED", arrChange);
        return;
    }

    // Default display if distribution from cid is greater than the change
    displayChange("OPEN", arrChange);
}

btnPurchase.addEventListener("click", cashRegister);

updateCashRegister();