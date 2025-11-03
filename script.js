const NB_DIGIT = 12;
let operation = {
	rhs: null,
	lhs: null,
	operator: null,
	isDone: false,
};

function reset(operation) {
	operation.rhs = null;
	operation.lhs = null;
	operation.operator = null;
	operation.isDone = false;
}
function isValid(operation) {
	return operation.rsh !== null && operation.lhs !== null && operation.operator !== null;
}

function add(lhs, rhs) {
	return lhs + rhs;
}

function substract(lhs, rhs) {
	return lhs - rhs;
}

function multiply(lhs, rhs) {
	return lhs * rhs;
}

function divide(lhs, rhs) {
	if (rhs === 0) {
		return "ERROR: Can't divide by 0";
	}
	return lhs / rhs;
}

function formatNumber(num) {
	if (Number.isInteger(num)) {
		return num.toString();
	} else {
		return num.toPrecision(NB_DIGIT);
	}
}

function operate(operation) {
	const rhs = Number(operation.rhs);
	const lhs = Number(operation.lhs);
	switch (operation.operator) {
		case "+":
			return add(rhs, lhs);
		case "-":
			return substract(rhs, lhs);
		case "x":
			return multiply(rhs, lhs);
		case "/":
			return divide(rhs, lhs);
		default:
			return "ERROR: Unknown operator";
	}
}

function updateDisplay(value) {
	const displayElement = document.querySelector(".display");
	if (typeof value === "number") {
		displayElement.textContent = formatNumber(value);
	} else {
		displayElement.textContent = value;
	}
}

let digitButtons = document.querySelectorAll("button.digit");
for (const button of Array.from(digitButtons)) {
	button.addEventListener("click", event => {

		if(operation.isDone) {
			reset(operation);
		}

		if (operation.operator === null) {
			if (operation.rhs === null) {
				operation.rhs = event.target.textContent;
			} else {
				operation.rhs += event.target.textContent;
			}
			updateDisplay(operation.rhs)
		} else {
			if (operation.lhs === null) {
				operation.lhs = event.target.textContent;
			} else {
				operation.lhs += event.target.textContent;
			}
			updateDisplay(operation.lhs)
		}
	})
}

let operatorButtons = document.querySelectorAll("button.operator");
for (const button of Array.from(operatorButtons)) {
	button.addEventListener("click", event => {
		if (operation.isDone) {
			operation.lhs = null;
			operation.isDone = false;
		} else {
			if (isValid(operation)) {
					operation.rhs = operate(operation);
					operation.lhs = null;
					updateDisplay(operation.rhs);
			}
		}
		operation.operator = event.target.textContent;
	})
}

let equalButton = document.querySelector("button.equal");
equalButton.addEventListener("click", () => {
	if (isValid(operation)) {
		operation.rhs = operate(operation);
		operation.isDone = true;
		updateDisplay(operation.rhs);
	}
})

const clearButton = document.querySelector("button.clear");
clearButton.addEventListener("click", () => {
	reset(operation);
	updateDisplay("0");
})
