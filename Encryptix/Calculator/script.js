const calculatorForm = document.querySelector('.calculator');
const calculatorInput = document.querySelector('.value');

let currentNumber = '';
let previousNumber = '';
let operation = null;

function updateDisplay() {
    let displayValue = '';
    if (previousNumber !== '') {
        displayValue += previousNumber;
    }
    if (operation !== null) {
        displayValue += ` ${operation} `;
    }
    if (currentNumber !== '') {
        displayValue += currentNumber;
    }
    calculatorInput.value = displayValue;
}

function clearAll() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    updateDisplay();
}

function deleteLast() {
    if (currentNumber !== '') {
        currentNumber = currentNumber.slice(0, -1);
    } else if (operation !== null) {
        operation = null;
        currentNumber = previousNumber;
        previousNumber = '';
    }
    updateDisplay();
}

function appendNumber(number) {
    currentNumber += number;
    updateDisplay();
}

function handleOperation(op) {
    if (currentNumber === '') {
        return;
    }
    if (operation !== null) {
        compute();
    }
    previousNumber = currentNumber;
    operation = op;
    currentNumber = '';
    updateDisplay();
}

function compute() {
    if (operation === null || currentNumber === '') {
        return;
    }
    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);

    let result;
    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                alert('Error: Division by zero');
                clearAll();
                return;
            }
            result = prev / curr;
            break;
        default:
            return;
    }
    currentNumber = result.toString();
    previousNumber = '';
    operation = null;
    updateDisplay();
}

calculatorForm.addEventListener('submit', function(event) {
    event.preventDefault();
});

const buttons = document.querySelectorAll('.num');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = button.textContent.trim();
        switch (value) {
            case 'C':
                clearAll();
                break;
            case 'del':
                deleteLast();
                break;
            case '=':
                compute();
                break;
            default:
                if (!isNaN(value) || value === '.') {
                    appendNumber(value);
                } else {
                    handleOperation(value);
                }
        }
    });
});
