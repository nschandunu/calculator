// Get display element
const display = document.querySelector('.display');

// Initialize variables
let currentInput = '0';
let previousInput = null;
let operation = null;
let shouldResetScreen = false;

// Add click event listener to all buttons
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for all buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.querySelector('span').textContent;
            
            // Handle different button types
            if (button.classList.contains('number')) {
                handleNumber(value);
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('function')) {
                handleFunction(value);
            }
            
            updateDisplay();
        });
    });
});

// Handle number inputs
function handleNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else if (shouldResetScreen) {
        currentInput = num;
        shouldResetScreen = false;
    } else {
        currentInput += num;
    }
}

// Handle operators
function handleOperator(op) {
    if (operation !== null) {
        calculate();
    }
    previousInput = currentInput;
    operation = op;
    shouldResetScreen = true;
}

// Handle special functions
function handleFunction(func) {
    switch (func) {
        case 'AC':
            currentInput = '0';
            previousInput = null;
            operation = null;
            break;
        case '±':
            currentInput = (parseFloat(currentInput) * -1).toString();
            break;
        case '%':
            currentInput = (parseFloat(currentInput) / 100).toString();
            break;
    }
}

// Perform calculation
function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        case '=':
            result = current;
            break;
    }

    currentInput = result.toString();
    operation = null;
}

// Update display
function updateDisplay() {
    display.textContent = currentInput;
}

// Initial display update
updateDisplay();