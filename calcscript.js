const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");

let lastCalculation = "";

function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {

    if (display.value.trim() === "") return;

    try {

        const expression = display.value;
        const result = eval(expression);
        historyDisplay.textContent = `${expression} = ${result}`;
        display.value = result;

    } catch {

        historyDisplay.textContent = "";
        display.value = "Error";

    }

}

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (key >= "0" && key <= "9") {
        append(key);
    }

    else if (["+", "-", "*", "/", "%", ".", "(", ")"].includes(key)) {
        append(key);
    }

    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Backspace") {
        event.preventDefault();
        backspace();
    }

    else if (key === "Delete" || key === "Escape") {
        clearDisplay();
    }

});