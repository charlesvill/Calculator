let operator;
let num1;
let num2;
let result;
let regIn = false;
let opPress = false;
let clearElig = false;
let newOp = false;
const screenCharLimit = 9;

let displayText = document.querySelector(".cont.screen");
const buttons = document.querySelectorAll(".num.btn");
const opButtons = document.querySelectorAll(".op.btn");
const equalButton = document.querySelector(".equal.btn");
const acbutton = document.querySelector(".ac.btn");
const cbutton = document.querySelector(".c.btn");


buttons.forEach(button=>{
    button.addEventListener('click',clickInput);
})
opButtons.forEach(button=>{
    button.addEventListener('click',clickOp);
})
equalButton.addEventListener('click',registerEqual);

acbutton.addEventListener('click',registerAC);
cbutton.addEventListener('click', registerC);

document.addEventListener('keydown', (event) => {
    
    var code = event.code;
    var key = event.key;
    // Alert the key name and key code on keydown
    registerKeyEvent(key,code);
  }, false);

  function registerKeyEvent(key, code){
    
    
        switch(key){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '.':
                registerInput(key);
                break;
            case '+': 
            case '-':
            case '*':
            case '/':
                registerOp(key);
                console.log('an oerator was pressed');
                break;
            case '=':
            case 'Enter':
                registerEqual();
                break;
            case 'Backspace':
                registerC();
                break;
            case 'Delete':
                registerAC();
                break;
            default:
                console.log("this key is not registered");
        }
    
    

  }

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
    if((operator === "*" || operator === "/") && (num1 === 0 || num2 === 0 )){
        return 0;
    }
    else{

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

}

function registerEqual(){
     newOp = true;
     clearElig = true;
     if (num1 !== undefined && operator !== undefined){
        if (opPress || regIn){
            opPress = false;
            regIn = false;
            num2 = Number(displayText.textContent);
            result = operate(operator,num1,num2);
            displayText.textContent = result;
           }
           else {
            num1 = Number(displayText.textContent);
            result = operate(operator,num1,num2);
            displayText.textContent = result;
            }
     }

}


function clearDisplay(){
    displayText.textContent = "";
}

function updateDisplay(result){
    const updateText = toString(result);

    if(updateText.length > 15){
        displayText.textContent = Number(updateText).toFixed(screenCharLimit);

    }
    else {
        displayText.textContent = updateText;
    }

}
//refactoring input will be needed. 
//separate function to translate click event to input

function clickInput(e){
    let num = e.target.attributes["data-btn"].value;
    registerInput(num);
}

function registerInput(input){
  regIn = true;
  opPress = false;
  newOp = false;
    
        if(displayText.textContent.length < 15)
        {
            const arr = Array.from(displayText.textContent);
            const decimalChk = (char) => char === ".";

                if (clearElig){
                    clearDisplay();
                    clearElig = false;
                }
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
function clickOp(e){
   clickOp = e.target.attributes["data-btn"].value;
   registerOp(clickOp);

}

function registerOp(inputOp){
    opPress = true;
    clearElig = true;


    if (regIn){
        console.log("op pressed");
        regIn = false;
        if (num1 === undefined){
            num1 = Number(displayText.textContent);
            operator = inputOp;
        }
        else if (num1 !== undefined && num2 === undefined){
            num2 = Number(displayText.textContent);
            result = operate(operator,num1,num2);
            displayText.textContent = result;
            operator = inputOp;
        }
        else if (num1 !== undefined && num2 !== undefined){
            console.log("this should be triggered");
            num1 = result;
            num2 = Number(displayText.textContent);
            console.log("both nums have been filled");
            result = operate(operator,num1,num2);
            displayText.textContent = result;
            operator = inputOp;
            // opElig = false;
        }

    }
    else if (newOp){
        num1 = result;
        num2 = undefined;
        result = undefined;
        operator = inputOp;
    }

}

function registerAC(){
    displayText.textContent = "0";
    num1 = undefined;
    num2 = undefined;
    result = undefined;
}

function registerC(){
    //should check if the value is null or 0
    if(displayText.textContent.length === 1 || result != undefined){
        return registerAC();
    }else{
        displayText.textContent = displayText.textContent.slice(0,-1);
    }


}