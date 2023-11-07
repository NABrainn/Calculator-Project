let firstNum = '';
let secondNum = '';
let operator = '';

function add(firstNum, secondNum) {
    return Number(firstNum) + Number(secondNum);
}

function subtract(firstNum, secondNum) {
    return Number(firstNum) - Number(secondNum);
}

function multiply(firstNum, secondNum) {
    return Number(firstNum) * Number(secondNum);
}

function divide(firstNum, secondNum) {
    return Number(firstNum) / Number(secondNum);
}

function operate(firstNum) {
    operationResult.innerText += '=';
    operationResult.innerText += firstNum;
    
}

const operationResult = document.getElementById('operation-result');

const firstNumListener = function() {
    firstNum += this.textContent;
    operationResult.innerText += this.textContent;
}

const secondNumListener = function() {
    secondNum += this.textContent;
    operationResult.innerText += this.textContent;
    if (operator === '+') firstNum = add(firstNum, secondNum);
    else if (operator === '-') firstNum = subtract(firstNum, secondNum);
    else if (operator === '*') firstNum = multiply(firstNum, secondNum);
    else if (operator === '/') firstNum = divide(firstNum, secondNum);  
}

document.querySelectorAll('.digits').forEach(digit => {
    digit.addEventListener('click', firstNumListener);
})

document.querySelectorAll('.operators').forEach(item => {
    item.addEventListener('click', () => {
        operator = item.innerText;
        operationResult.innerText += item.innerText;
        document.querySelectorAll('.digits').forEach(digit => {
            digit.removeEventListener('click', firstNumListener);
            digit.addEventListener('click', secondNumListener);
        }) 
        secondNum = '';
    })
})
      
const operatorEqual = document.getElementById('operator-equal');
operatorEqual.addEventListener('click', () => {
    operate(firstNum, secondNum, operator);
});



