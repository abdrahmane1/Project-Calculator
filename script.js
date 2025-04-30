let currentNumber = "";
let previousNumber = "";
let currentOperator = "";

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const digit = button.dataset.digit;
    currentNumber += digit;
    updateDisplay(currentNumber);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentNumber === "") return;
    if (previousNumber !== "" && currentOperator !== "") {
      const result = operate();
      if (result === "Error") {
        resetCalculator();
        return;
      }
      currentNumber = result.toString();
      updateDisplay(currentNumber);
    }
    currentOperator = button.dataset.operator;
    previousNumber = currentNumber;
    currentNumber = "";
  });
});

equalsButton.addEventListener("click", () => {
  if (currentNumber === "" || previousNumber === "" || currentOperator === "")
    return;

  const result = operate();
  if (result === "Error") {
    resetCalculator();
    return;
  }
  currentNumber = result.toString();
  updateDisplay(currentNumber);
  previousNumber = currentNumber;
});

clearButton.addEventListener("click", () => {
  resetCalculator();
});

function operate() {
  const num1 = parseFloat(previousNumber);
  const num2 = parseFloat(currentNumber);

  switch (currentOperator) {
    case "+":
      return roundResult(num1 + num2);
    case "-":
      return roundResult(num1 - num2);
    case "*":
      return roundResult(num1 * num2);
    case "/":
      if (num2 === 0) {
        return "Error";
      }
      return roundResult(num1 / num2);
    default:
      return "Error";
  }
}

function roundResult(result) {
  return Math.round(result * 1000) / 1000;
}

function resetCalculator() {
  currentNumber = "";
  previousNumber = "";
  currentOperator = "";
  updateDisplay("0");
}

function updateDisplay(value) {
  display.textContent = value;
}
