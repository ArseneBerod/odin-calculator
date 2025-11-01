let operation = {
	rhs: null,
	lhs: null,
	operator: null,
};

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

function operate(operation) {
	console.log(operation);
	const rhs = Number(operation.rhs);
	const lhs = Number(operation.lhs);
	switch (operation.operator) {
		case "+":
			operation.rhs = add(rhs, lhs);
			break;
		case "-":
			operation.rhs = substract(rhs, lhs);
			break;
		case "x":
			operation.rhs = multiply(rhs, lhs);
			break;
		case "/":
			operation.rhs = divide(rhs, lhs);
			break;
		default:
			return "ERROR: Unknown operator";
	}
	updateDisplay(operation.rhs);
	operation.lhs = null;
	operation.operator = null;
	console.log(operation);
}
function updateDisplay(value) {
	const displayElement = document.querySelector(".display");
	displayElement.textContent = value;
}

let digitButtons = document.querySelectorAll("button.digit");
for (const button of Array.from(digitButtons)) {
	button.addEventListener("click", event => {
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
		if (operation.rhs !== null) {
			if (operation.lhs !== null) {
				operate(operation);
			}
			operation.operator = event.target.textContent;
		}
	})
}

let equalButton = document.querySelector("button.equal");
equalButton.addEventListener("click", () => {
	if (isValid(operation)) {
		operate(operation)
	}
})

const clearButton = document.querySelector("button.clear");
clearButton.addEventListener("click", () => {
	operation = {
		lhs: null,
		rhs: null,
		operator: null,
	}
	updateDisplay("");
})
