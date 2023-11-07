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
    if(secondNum != 0) return Number(firstNum) / Number(secondNum);
    return 'Try again!';
}

function operate(firstNum) {
    if(operationResult.innerText.length != 0) {
        operationResult.innerText += `\n=${firstNum}`;
    } 
}

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

const operationResult = document.getElementById('operation-result');

function firstNumListen() {
    document.querySelectorAll('.digits').forEach(digit => {
        digit.addEventListener('click', firstNumListener);
    })
}

let condition = true;
const operators = ['+', '-', '*', '/'];

function listenOperators() {
    document.querySelectorAll('.operators').forEach(item => {
        item.addEventListener('click', () => {
            operator = item.innerText;   
            if(operationResult.innerText.length != 0 && condition) {
                if(operators.every(el => operationResult.innerText[operationResult.innerText.length-1].includes(el) == false)) operationResult.innerText += operator;  
                operationResult.innerText = operationResult.innerText.slice(0, -1) + operator;
            }
            document.querySelectorAll('.digits').forEach(digit => {
                digit.removeEventListener('click', firstNumListener);
                digit.addEventListener('click', secondNumListener);
            })
            secondNum = '';
        });
    })
}
const once = {
    once: true,
}
function listenEqual() {
    const operatorEqual = document.getElementById('operator-equal');
    operatorEqual.addEventListener('click', () => {        
        operate(firstNum, secondNum, operator);
        document.querySelectorAll('.digits').forEach(digit => {
            digit.removeEventListener('click', secondNumListener);
        }) 
        condition = false;
    },once);
}

const clearBtn = document.getElementById('clear');

function clear() {
    clearBtn.addEventListener('click', () => {
        firstNum = '';
        secondNum = '';
        operator = '';
        operationResult.innerText = '';
        document.querySelectorAll('.digits').forEach(digit => {
            digit.removeEventListener('click', secondNumListener);
        })
        firstNumListen();
        listenEqual();
        condition = true;
        
    })
}
firstNumListen();
listenOperators();
listenEqual();
clear();
