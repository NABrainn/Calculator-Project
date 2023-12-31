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
    if(secondNum === '0') {
        operationResult.innerText += '\n=Division by 0 detected.';
        removeListeners();
    }
    return Number(firstNum) / Number(secondNum);
}
function operate() {
    if (firstNum[0] === '0') firstNum = firstNum.toString().slice(1);
    if((firstNum === '')  && operator != '' && secondNum != '') operationResult.innerText += `\n=${result}`;
    else if((firstNum === '')  && operator === '' && secondNum === '') operationResult.innerText += `\n=0`;
    else if((firstNum != '')  && operator != '' && secondNum === '') operationResult.innerText = operationResult.innerText.slice(0, -1) + `\n=${firstNum}`;
    else if((firstNum === '') || (firstNum === '0') && operator === '' && secondNum === '') operationResult.innerText = operationResult.innerText.slice(0, -1) + `\n=0`;
    else if(operator === '' && secondNum === '') operationResult.innerText += `\n=${firstNum}`;
    else if(operationResult.innerText[operationResult.innerText.length-1] === operator){
        secondNumLength = secondNum.toString().length;
        if(secondNum != ''){            
            operationResult.innerText = operationResult.innerText.slice(0, -1) + `\n=${Math.round(result * Math.pow(10, secondNumLength+1)) / Math.pow(10, secondNumLength+1)}`;
        }
        operationResult.innerText = operationResult.innerText.slice(0, -1) + `\n=${result}`;       
    }
    else {   
        secondNumLength = secondNum.toString().length;  
        operationResult.innerText += `\n=${Math.round(result * Math.pow(10, secondNumLength+1)) / Math.pow(10, secondNumLength+1)}`;
    }

    //Prevent the user from inserting any more numbers after pressing '='
    document.querySelectorAll('.digits').forEach(digit => {
        digit.removeEventListener('click', firstNumListener);
    })
    document.querySelectorAll('.digits').forEach(digit => {
        digit.removeEventListener('click', secondNumListener);
    })
}

const firstNumListener = function() {
    if(operationResult.innerText == '0' && this.textContent == '0') {       
        firstNum = '0';
    }
    else {
        firstNum += this.textContent;
        operationResult.innerText == '0' ? operationResult.innerText = this.textContent : operationResult.innerText += this.textContent; 
    }        
}      

const secondNumListener = function() {
    if(secondNum === '0') {
        secondNum = this.textContent;
        operationResult.innerText = operationResult.innerText.slice(0, -1) + `${secondNum}`;      
    }
    else {
        secondNum += this.textContent;
        operationResult.innerText += this.textContent;
    }
    if (operator === '+') result = add(firstNum, secondNum);
    else if (operator === '-') result = subtract(firstNum, secondNum);
    else if (operator === '*') result = multiply(firstNum, secondNum);
    else if (operator === '/') result = divide(firstNum, secondNum);
}

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

function listenEqualFunc() {
    operate();
    document.querySelectorAll('.digits').forEach(digit => {
        digit.removeEventListener('click', secondNumListener);
    })
    document.querySelectorAll('.operators').forEach(item => {
        item.removeEventListener('click', listenOperatorFunc);
    })
    condition = false;
}

function listenOperators() {
    document.querySelectorAll('.operators').forEach(item => {
        item.addEventListener('click', listenOperatorFunc);
    })
}

const operatorEqual = document.getElementById('operator-equal');
function listenEqual() {
    operatorEqual.addEventListener('click',listenEqualFunc, once);        
}

function clear() {
    clearBtn.addEventListener('click', () => {
        firstNum = '0';
        secondNum = '';
        operator = '';
        result = '';
        operationResult.innerText = 0;
        document.querySelectorAll('.digits').forEach(digit => {
            digit.removeEventListener('click', secondNumListener);
        })
        operatorEqual.removeEventListener('click',listenEqualFunc, once);
        firstNumListen();
        listenOperators();
        listenEqual();
        condition = true;        
    })
}

function removeListeners() {
    operatorEqual.removeEventListener('click',listenEqualFunc, once);
    document.querySelectorAll('.digits').forEach(digit => {
        digit.removeEventListener('click', secondNumListener);
    })
    document.querySelectorAll('.operators').forEach(item => {
        item.removeEventListener('click', listenOperatorFunc);
    })
}
let firstNum = '0';
let secondNum = '';
let operator = '';
let result = '';
let secondNumLength;


const operationResult = document.getElementById('operation-result');
let displayValue = operationResult.textContent;
operationResult.innerText = 0;
const clearBtn = document.getElementById('clear');
let condition = true;
const operators = ['+', '-', '*', '/'];

const once = {
    once: true,
}

firstNumListen();
listenOperators();
listenEqual();
clear();