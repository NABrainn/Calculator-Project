const firstNum = 5;
const secondNum = 7;
const operator = "+";

function add(operator, firstNum, secondNum) {
    return firstNum + operator + secondNum;
}

function subtract() {
    
}

function multiply() {
    
}

function divide() {
    
}

function operate(operator, firstNum, secondNum) {
    return add(operator, firstNum, secondNum);
}

console.log(operate(firstNum, secondNum, operator));