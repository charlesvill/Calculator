let operator;
let num1;
let num2;
let validInput = false;

let displayText = document.querySelector(".cont.screen");
const buttons = document.querySelectorAll(".num.btn");
const opButtons = document.querySelectorAll(".op.btn");
const acbutton = document.querySelector(".ac.btn");
const cbutton = document.querySelector(".c.btn");

buttons.forEach(button=>{
    button.addEventListener('click',registerInput);
})
opButtons.forEach(button=>{
    button.addEventListener('click',registerOp);
})
acbutton.addEventListener('click',registerAC);
cbutton.addEventListener('click', registerC);


const add = (num1, num2)=>{
    return num1 + num2;
}
 
const subtract = (num1, num2)=>{
    return num1 - num2;
}

const multiply = (num1, num2) =>{
    return num1 * num2;
}

const divide = (num1, num2) =>{
    return num1/num2
}

function operate(operator,num1,num2){
    switch(operator){
        case "+":
            return add(num1,num2);
        case "-":
            return subtract(num1,num2);
        case "*":
            return multiply(num1,num2);
        case "/":
            return divide(num1,num2);
        default: console.log("something went wrong!");
    }
}

function registerEqual(){
    if(num1 !== undefined){
        if(num2 !== undefined){
            displayText.textContent = operate(operator,num1,num2);
        }
    }
}


function clearDisplay(){
    displayText.textContent = "";
}


function registerInput(e){
    if (validInput === false){
        validInput=true;
        clearDisplay();       
    }
    let input = e.target.attributes["data-btn"].value;
        if(displayText.textContent.length < 15)
        {
            const arr = Array.from(displayText.textContent);
            const decimalChk = (char) => char === ".";


                if((displayText.textContent === "0" && input === "0") ||
                (arr.some(decimalChk) && input === ".")){
                    return
                }
                else
                {
                    //delele initialized "0" after valid input
                    if (displayText.textContent !== "0")
                    {
                        displayText.textContent += `${input}`;
                    }
                    else
                    {
                        if(input !== "."){
                            displayText.textContent = "";
                            displayText.textContent += `${input}`;
                        }else{
                            displayText.textContent += `${input}`;
                        }
                    }
                }
        }else return
        
}

function registerOp(e){
    //registerI will turn validInput true and registerOp should assign the working display num to num2 and clear and display new operand
    if(validInput){
        validInput = false;
        if(num1 === undefined)
        {
            num1 = Number(displayText.textContent);
            operator = e.target.attributes["data-btn"].value; 

        }
        else if (num1 !== undefined)
        {//equal sign has to be processed as an operator if I am to keep this op function to assign num2 is value
            num2 = Number(displayText.textContent);
            registerEqual();

            if (e.target.attributes["data-btn"].value !== "="){
                operator = e.target.attributes["data-btn"].value;
            }
            
            
        }
           
    }
}

function registerAC(){
    displayText.textContent = "0";
    num1 = undefined;
    num2 = undefined;
}

function registerC(){
    //should check if the value is null or 0
    if(displayText.textContent.length === 1){
        return registerAC();
    }else{
        displayText.textContent= displayText.textContent.slice(0,-1);
    }
    

}