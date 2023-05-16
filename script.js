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
// opButtons.forEach(button=>{
//     opButtons.addEventListener('click',registerp);
// })
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





function registerInput(e){
    validInput=true;
    let input = e.target.attributes["data-btn"].value;
    //check if textcontent = "0", return if input is another 0 
    //check if already decimal point and return if input is another decimal 
    displayText.textContent +=`${input}`;
}


function registerOp(){
    //registerI will turn validInput true and registerOp should assign the working display num to num2 and clear and display new operand
    if(validInput){
        num1 = screenContent;
        //clear screenContent
        //switch block to listen to logic of which operand to apply.
    }
}

function registerAC(){
    displayText.textContent = "0";
}

function registerC(){

    console.log(typeof(displayText.textContent));
    console.log(displayText.textContent.length);   

    //should check if the value is null or 0
    //apply removal of the last element 
    if(displayText.textContent.length === 1){
        return registerAC();
    }else{
        displayText.textContent= displayText.textContent.slice(0,-1);
    }
    

}

//register input for btns
    //numbers or signs display  
    //operators will trigger functions
        //function that turns input as num 1 and prepares for next number

//display function that deals with changing the display as functions are pressed
//operator function that applies operations updating num 1 and 2. 