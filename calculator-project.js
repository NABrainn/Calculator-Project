let firstNum = '';
let secondNum = '';
let operator = '';
let result = '';

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

function operate() {
    if(operationResult.innerText.length != 0) {
        if(operationResult.innerText[operationResult.innerText.length-1] === operator){
            operationResult.innerText = operationResult.innerText.slice(0, -1) + `\n=${Math.round(result*10)/10}`;
        }
        else {
            operationResult.innerText += `\n=${Math.round(result*10)/10}`;
        }
    } 
}

const firstNumListener = function() {
    firstNum += this.textContent;
    operationResult.innerText += this.textContent;
   
}

const secondNumListener = function() {
    secondNum += this.textContent;
    operationResult.innerText += this.textContent;
    if (operator === '+') result = add(firstNum, secondNum);
    else if (operator === '-') result = subtract(firstNum, secondNum);
    else if (operator === '*') result = multiply(firstNum, secondNum);
    else if (operator === '/') result = divide(firstNum, secondNum);
}

const operationResult = document.getElementById('operation-result');

function firstNumListen() {
    document.querySelectorAll('.digits').forEach(digit => {
        digit.addEventListener('click', firstNumListener);
    })
}

function listenOperatorFunc() {
    operator = this.innerText;   
    if(operationResult.innerText.length != 0 && condition) {
        if(operators.every(el => operationResult.innerText[operationResult.innerText.length-1].includes(el) == false)) operationResult.innerText += operator;  
        operationResult.innerText = operationResult.innerText.slice(0, -1) + operator;
    }
    document.querySelectorAll('.digits').forEach(digit => {
        digit.removeEventListener('click', firstNumListener);
        digit.addEventListener('click', secondNumListener);
    })
    if(result != '') firstNum = result;
    secondNum = '';
}

let condition = true;
const operators = ['+', '-', '*', '/'];

function listenOperators() {
    document.querySelectorAll('.operators').forEach(item => {
        item.addEventListener('click', listenOperatorFunc);
    })
}
const once = {
    once: true,
}
function listenEqual() {
    const operatorEqual = document.getElementById('operator-equal');
    operatorEqual.addEventListener('click', () => {        
        operate();
        document.querySelectorAll('.digits').forEach(digit => {
            digit.removeEventListener('click', secondNumListener);
        })
        document.querySelectorAll('.operators').forEach(item => {
            item.removeEventListener('click', listenOperatorFunc);
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
        result = '';
        operationResult.innerText = '';
        document.querySelectorAll('.digits').forEach(digit => {
            digit.removeEventListener('click', secondNumListener);
        })
        firstNumListen();
        listenOperators();
        listenEqual();
        condition = true;        
    })
}
firstNumListen();
listenOperators();
listenEqual();
clear();
