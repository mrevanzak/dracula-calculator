const input = document.querySelector(".input");
const result = document.querySelector(".result");
const clear = document.querySelector(".clear");
const keys = document.querySelectorAll(".buttons button ");

let operation = "";
let answer;
let decimalAdded = false;

const operators = ["+", "-", "x", "÷"];

function handleKeyPress(e) {
  const val = e.target.value;
  const lastChar = operation[operation.length - 1];

  if (val === "AC") {
    operation = "";
    answer = "";
    input.innerHTML = operation;
    result.innerHTML = answer;
    return;
  }

  if (val === "CE") {
    for (let i = 0; i < operators.length; i++) {
      if (lastChar === operators[i]) {
        break;
      }
      operation = operation.slice(0, -1);
    }
    input.innerHTML = operation;
    return;
  }

  if (val === "=") {
    return;
  }

  if (val === "." && decimalAdded) {
    return;
  }

  if (operators.indexOf(val) !== -1) {
    decimalAdded = false;
  }

  if (operation.length === 0 && val === "-") {
    operation += val;
    input.innerHTML = operation;
    return;
  }

  if (operation.length === 0 && operators.indexOf(val) !== -1) {
    input.innerHTML = operation;
    return;
  }

  if (operators.indexOf(lastChar) !== -1 && operators.indexOf(val) !== -1) {
    operation = operation.replace(/.$/, val);
    input.innerHTML = operation;
    return;
  }

  if (val) {
    if (val === ".") decimalAdded = true;
    operation += val;
    input.innerHTML = operation;
    return;
  }
}

function evaluate(e) {
  const val = e.target.value;
  const lastChar = operation[operation.length - 1];

  if (val === "=" && operators.indexOf(lastChar) !== -1) {
    operation = operation.slice(0, -1);
  }

  if (operation.length === 0) {
    answer = "";
    result.innerHTML = answer;
    return;
  }

  try {
    if (operation[0] === "0" && operation[1] !== "." && operation.length > 1) {
      operation = operation.slice(1);
    }

    const final = operation.replace(/x/g, "*").replace(/÷/g, "/");
    answer = +eval(final).toFixed(5);

    if (val === "=") {
      decimalAdded = false;
      operation = `${answer}`;
      answer = "";
      input.innerHTML = answer;
      result.innerHTML = operation;
      return;
    }

    result.innerHTML = answer;
  } catch (e) {
    if (val === "=") {
      decimalAdded = false;
      input.innerHTML = `<span class="error">${operation}</span>`;
      result.innerHTML = `<span class="error">Bad Expression</span>`;
    }
    console.log(e);
  }
}

keys.forEach((val) => {
  val.addEventListener("click", handleKeyPress);
  val.addEventListener("click", evaluate);
});
