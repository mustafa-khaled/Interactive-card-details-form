
const nameInput = document.querySelector(".name");
const cardNumberInput = document.querySelector(".number");
let thanksBox = document.getElementById("thanks");
const mmInput = document.querySelector(`[placeholder="MM"]`);
const yyInput = document.querySelector(`[placeholder="YY"]`);
const cvcInput = document.querySelector(`[placeholder="e.g. 123"]`);
let reload = document.getElementById("reload");

// Error messages
const nameError = document.querySelector(".name-error");
const cardNumberError = document.querySelector(".number-error");
const expirationError = document.querySelector(".expiration-error");

console.log(expirationError)
// Final value elements
const nameValue = document.querySelector(".name-value");
const cardNumberValue = document.querySelector(".number-value");
const cvcValue = document.querySelector(".cvc-value");
const mmValue = document.querySelector(".mm-value");
const yyValue = document.querySelector(".yy-value");

nameInput.addEventListener("input", function () {
    if (nameInput.value == "") {
        nameError.textContent = "Name cannot be empty";
        nameError.style.display = "block";
    } else if (!/^[a-zA-Z\s]+$/.test(nameInput.value)) {
        nameError.textContent = "Name can only contain letters and spaces";
        nameError.style.display = "block";
    } else {
        nameValue.textContent = nameInput.value;
        nameError.style.display = "none";
    }
});

cardNumberInput.addEventListener("input", function () {
    const formattedNumber = cardNumberInput.value.replaceAll(/\D/g, "");
    cardNumberValue.textContent = formattedNumber.replace(/(.{4})/g, "$1 ");
    if (formattedNumber.length >= 16) {
        cardNumberInput.blur();
        cardNumberError.textContent = "Completed";
        cardNumberError.style.display = "block";
        cardNumberError.style.color = "hsl(278, 68%, 11%)";

    } else if (cardNumberValue.innerHTML == "") {
        cardNumberError.textContent = "Card Number cannot be empty";
        cardNumberError.style.display = "block";
        cardNumberError.style.color = "hsl(0, 100%, 66%)";
        console.log(cardNumberError.innerHTML);
    }

});

mmInput.addEventListener("input", function () {
    const month = parseInt(mmInput.value);
    if (isNaN(month) || month < 1 || month > 12) {
        expirationError.textContent = "Invalid month";
        expirationError.style.display = "block";
    } else {
        mmValue.textContent = month.toString().padStart(2, "0");
        expirationError.style.display = "none";
    }
});

yyInput.addEventListener("input", function () {
    const year = parseInt(yyInput.value);
    if (isNaN(year)) {
        expirationError.textContent = "Invalid year";
        expirationError.style.display = "block";
    } else if (year == "") {
        expirationError.textContent = "Can't Be Blank";
        expirationError.style.display = "block";
    }
    else {
        yyValue.textContent = year.toString().slice(-2);
        expirationError.style.display = "none";
    }
});

cvcInput.addEventListener("input", function () {
    cvcValue.textContent = cvcInput.value.replaceAll(/\D/g, "");
});

let valid = document.forms[0].addEventListener("submit", function (e) {
    if (nameInput.value == "") {
        nameError.textContent = "Name cannot be empty";
        nameError.style.display = "block";
        e.preventDefault()
    }

    const formattedNumber = cardNumberInput.value.replaceAll(/\D/g, "");
    if (formattedNumber.length < 16) {
        cardNumberError.style.display = "block";
        cardNumberError.textContent = "Must Be 16 Digits";
        cardNumberError.style.color = "hsl(0, 100%, 66%)";
        e.preventDefault()
    }

    if (mmInput.value == "" || yyInput.value == "" || cvcInput.value == "") {
        expirationError.textContent = "Can't Be Blank";
        expirationError.style.display = "block";
        e.preventDefault()
    }

    if (nameInput.value !== "" && formattedNumber.length === 16 && mmInput.value !== "" && yyInput.value !== "" && cvcInput.value !== "") {
        valid = true;
    } else {
        valid = false;
    }
    if (valid == true) {
        thanksBox.style.display = "block";
        document.forms[0].style.display = "none";
    } else {
        thanksBox.style.display = "none";
        document.forms[0].style.display = "block";
    }

    e.preventDefault();
});

reload.addEventListener("click", function () {
    document.forms[0].submit();
})



