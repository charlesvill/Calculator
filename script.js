let operator;
let num1;
let num2;
let result;
let opPress = false;

let displayText = document.querySelector(".cont.screen");
const buttons = document.querySelectorAll(".num.btn");
const opButtons = document.querySelectorAll(".op.btn");
const equalButton = document.querySelector(".equal.btn");
const acbutton = document.querySelector(".ac.btn");
const cbutton = document.querySelector(".c.btn");


buttons.forEach(button=>{
    button.addEventListener('click',registerInput);
})
opButtons.forEach(button=>{
    button.addEventListener('click',registerOp);
})
equalButton.addEventListener('click',registerEqual);

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
   if(num1 === undefined && num2 === undefined)
   {
        return
   }
   else if ( num1 !== undefined && num2 === undefined)
   {
        num2 = Number(displayText.textContent);
        result = operate(operator,num1, num2);
        displayText.textContent = result;
        console.log(` only num2 undefined \nnum1:${num1}\n num2:${num2}\n operator:${operator} \n answer: ${result}`);
   }
   else if(num1 !== undefined && num2 !== undefined)
   {    
        result = operate(operator, num1, num2); 
        displayText.textContent = result;
    num1 = Number(num2);
    num2 = Number(displayText.textContent);
        
        
       
        console.log(`both num filled\nnum1:${num1}\n num2:${num2}\n operator:${operator} \n answer: ${result}`);
   }
   else{console.log(`something went wrong in the regEqual num1:${num1}\n num2:${num2}\n operator:${operator} \n answer: ${result}`);}
}


function clearDisplay(){
    displayText.textContent = "";
}


function registerInput(e){
   
    let input = e.target.attributes["data-btn"].value;
        if(displayText.textContent.length < 15)
        {
            const arr = Array.from(displayText.textContent);
            const decimalChk = (char) => char === ".";

                if (opPress){
                    clearDisplay();
                    opPress = false;
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

function registerOp(e){
    opPress = true;
    
        if(num1 === undefined && num2 === undefined)
        {
            num1 = Number(displayText.textContent);
            console.log("num1 has just been assigned");
            operator = e.target.attributes["data-btn"].value; 

        }
        else if (num1 !== undefined && num2 === undefined)
        {//equal sign has to be processed as an operator if I am to keep this op function to assign num2 is value
            num2 = Number(displayText.textContent);
            registerEqual();
            operator = e.target.attributes["data-btn"].value; 
            console.log("num 2 and 1 have assigned");           
        }
        else if (num1 !== undefined && num2 !== undefined){
            registerEqual(); 
            num1 = Number(num2);
            num2 = Number(displayText.textContent);
            operator = e.target.attributes["data-btn"].value;
            console.log("both assigned but operator pressed")
        }
        else console.log(`something did not work right num1:${num1} num2: ${num2} `);
}

function registerAC(){
    displayText.textContent = "0";
    num1 = undefined;
    num2 = undefined;
    result = undefined;
}

function registerC(){
    //should check if the value is null or 0
    if(displayText.textContent.length === 1){
        return registerAC();
    }else{
        displayText.textContent= displayText.textContent.slice(0,-1);
    }
    

}