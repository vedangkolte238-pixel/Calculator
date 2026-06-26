const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

let history = [];

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

        history.unshift(`${expression} = ${result}`);

        updateHistory();

        display.value = result;

    } catch {

        display.value = "Error";

    }

}

function updateHistory() {

    historyList.innerHTML = "";

    history.forEach((item) => {

        const li = document.createElement("li");

        li.textContent = item;
        li.addEventListener("click", () => {

            display.value = item.split("=")[0].trim();

        });

        historyList.appendChild(li);

    });

}

clearHistoryBtn.addEventListener("click", () => {

    history = [];

    updateHistory();

});

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