// Get display element
const display = document.querySelector('.display');

// Initialize variables
let currentInput = '0';
let previousInput = null;
let operation = null;
let shouldResetScreen = false;

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

const phone = document.querySelector('.phone');
const dynamicIsland = document.querySelector('.dynamic-island');

// Only add drag functionality to dynamic island
dynamicIsland.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    
    if (e.target === dynamicIsland) {
        isDragging = true;
        dynamicIsland.style.cursor = 'grabbing';
        
        // Remove transition during drag for instant response
        phone.style.transition = 'none';
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        // Use transform with translate3d for better performance
        setTranslate(currentX, currentY, phone);
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    dynamicIsland.style.cursor = 'grab';
    
    // Add smooth transition when dropping
    phone.style.transition = 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)';
}

function setTranslate(xPos, yPos, el) {
    // Use translate3d for hardware acceleration
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

// Add some basic styles
phone.style.position = 'absolute';
phone.style.userSelect = 'none';
phone.style.willChange = 'transform'; // Optimize for animations
dynamicIsland.style.cursor = 'grab';

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
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);

    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size (0.5px to 2px)
        const size = 0.5 + Math.random() * 1.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration (1s to 5s)
        star.style.setProperty('--duration', `${1 + Math.random() * 4}s`);
        
        starsContainer.appendChild(star);
    }
}

createStars();

// Update display
function updateDisplay() {
    display.textContent = currentInput;
}

// Initial display update
updateDisplay();