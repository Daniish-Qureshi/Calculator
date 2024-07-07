const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
let history = [];

const calculate = (btnValue) => {
    if (btnValue === "=" && output !== "") {
        try {
            let result = eval(output.replace("%", "/100").replace("&#247;", "/").replace("&#215;", "*"));
            history.push(`${output} = ${result}`);
            output = result;
        } catch {
            output = "Error";
        }
    } else if (btnValue === "C") {
        output = "";
    } else if (btnValue === "close") {
        output = output.toString().slice(0, -1);
    } else if (btnValue === "+/-") {
        output = output.startsWith("-") ? output.slice(1) : `-${output}`;
    } else if (btnValue === "%") {
        output = output ? `${output}/100` : output;
    } else {
        if (output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }
    display.value = output;
    if (btnValue === "C" || btnValue === "close") {
        historyContainer.style.display = "none";
    }
};

const historyButton = document.getElementById("history-button");
const historyContainer = document.getElementById("history-container");
const historyList = document.getElementById("history-list");

historyButton.addEventListener("click", () => {
    historyContainer.style.display = historyContainer.style.display === "none" ? "block" : "none";
    historyList.innerHTML = history.length ? history.map(entry => `<li>${entry}</li>`).join("") : '<li>No history available</li>';
});

buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
