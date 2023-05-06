/* TODO:
1) pos/neg works on expression b but it doesn't display any sign changes
2)Mobile
*/ 

// Query Selectors


const numberButtonsContainer = document.querySelector(".buttonContainer")

const clear = document.querySelector("#clear")

const equalbtn = document.querySelector("#equals")

const plusbtn = document.querySelector("#plus")

const minusbtn = document.querySelector("#minus")

const multiplybtn = document.querySelector("#multiply")

const divisionbtn = document.querySelector("#division")

const powerbtn = document.querySelector("#power")

const posNegbtn = document.querySelector("#posNeg")

var AposNeg = false
var BposNeg = false

posNegbtn.addEventListener('click', ()=>{
    if(operatorExists == false && output.textContent.length > 0){
        AposNeg = true
        output.textContent = 0- parseInt(output.textContent, 10)
        console.log(`negative is ${0-a}`)
    } else if (operator ="+" ){

       // output.textContent = output.textContent.replace("+", "-") 
        var variable= new Operate ("-")
        variable.checkVariables

        BposNeg= true 
        console.log("b posneg true")
        console.log(0 - parseInt(output.textContent.split("+")[1]))
    }
})

//error message needs to be a smaller font, ShowCalc wants to show on top
const errorMessage = document.querySelector(".errorMessage")

var showCalculation = document.querySelector("#show")


//Delete Button (Checks for if Variable is deleted to allow us to write a new one)

const delbtn = document.querySelector("#del")

delbtn.addEventListener('click', ()=>{
    if (output.textContent.indexOf(operator)===  output.textContent.length -1){
        console.log ("deleting varioable")
        operator = ''
        b = ''
        operatorExists = false
        output.textContent = output.textContent.slice(0,-1)
    } 
    output.textContent = output.textContent.slice(0,-1)
    
})

//Clear Button

clear.addEventListener('click', ()=>{
    output.textContent = ''
    errorMessage.textContent =''
    a=''
    b=''
    operator = ''
    operatorExists = false
})

// Decimal Button and making it so you can add exactly 1 decimal before the operator and 1 decimal after

const decimalbtn = document.querySelector("#decimal")

decimalbtn.addEventListener('click', ()=>{
    console.log (output.textContent.split(operator)[1])
    if ((output.textContent.includes(".") === false ) && (operatorExists === false)) {
    output.textContent += decimalbtn.textContent
    } else if ((output.textContent.split(operator)[1].includes(".")=== false) && (operatorExists == true)){
        output.textContent += decimalbtn.textContent
    } 
})

//Output so we can check whats on the calc screen and checking if there are variable/operator so we know what we can and cannot add

var output = document.querySelector(".output")


var thereAreVariables = false

var operatorExists = false 

// Variables for first and second numbers

var a = ''
var b = ''
var operator = ''
var answer = ''

// Adding the numbers to the output box 

const numberButtons = [...document.querySelectorAll(".number")].forEach(function(item){
    item.addEventListener('click', ()=>{
    output.textContent+= parseInt(item.textContent,10);
    screenOverflow();
    console.log(output.textContent)
})
})

//Adding operations to the output box 

const operationButtons = [...document.querySelectorAll(".operations")].forEach(function(item){
    item.addEventListener('click', ()=>{
        if(operatorExists === false && output.textContent.length > 0){
        output.textContent +=  (item.textContent);
        screenOverflow();
        operatorExists = true;
        answer = ''
        console.log(output.textContent);
        }
    })
})

//Adding Operators; check variables checks if we already have an equation and need to answer it or if we just need to add the operator. Evaulate answers. 

function Operate (op) {
    
    this.operation = op;

    this.checkVariables = function variableCheck() {
        findVariables()
        areThereVariables()
        if (thereAreVariables){
            equals();
            operator = this.operation;
            output.textContent += this.operation;
            thereAreVariables = false
        } else {
            operator = this.operation
        }
    }

    this.evaluate = function evaluate(a,b){
        switch(this.operation){
            case "+":
                console.log(`The answer is: ${a+b}`);
                output.textContent = (a + b); 
                screenOverflow();
                answer = a + b
                a= a+b
                b = ''
                AposNeg = false
                BposNeg = false

                break;
            case "-":
                console.log(`The answer is: ${a-b}`);
                output.textContent = (a - b);
                screenOverflow();
                answer = a-b
                a= a-b
                b=''
                AposNeg = false
                BposNeg = false
             
                break;
            case "*":
                console.log(`The answer is: ${a*b}`);
                output.textContent = (a * b);
                screenOverflow();
                answer = a * b
                a= a*b
                b=''
                AposNeg = false
                BposNeg = false

                break;
            case "/":
                console.log(`The answer is: ${a/b}`);
                if((b === 0) && (operator = "/")){
                    output.textContent =  ""
                    errorMessage.textContent = `${a} / 0? You can't divide by 0!`
                    answer = 0
                } else{
                output.textContent = (a / b);
                screenOverflow();
                answer = a/b
                a = a/b
                b=''
                AposNeg = false
                BposNeg = false
                }

                break;
            
            case "^":
                console.log(`The answer is: ${a**b}`);
                output.textContent = (a ** b);
                screenOverflow();
                answer = a **b
                a = a**b
                b = ''
                AposNeg = false
                BposNeg = false
        }
        }
    }

// equals button 

equalbtn.addEventListener('click', findVariables)
equalbtn.addEventListener('click', areThereVariables)
equalbtn.addEventListener('click', equals)

//functions for Finding Variables, Checking if there are 3 Variables, Finding Answer

function findVariables(){
    var center = output.textContent.indexOf(operator)
    console.log(`index of the operator is: ${center}`)
    a = parseFloat(output.textContent.slice(0,center));
    b = parseFloat(output.textContent.slice(center +1));
    console.log(`The second number is: ${b}`);
    }


/* we need to check if b exists. there are also cases after pressing = where we need to make sure there is an operator. 
This is because if there isn't an indexOf(operator) it shows as -1. Which in turn makes Center +1 = 0...
The === 0 is because a decimal will confuse it. I"m not sure why.
*/
function areThereVariables(){
    if ((Number.isNaN(b)) || (output.textContent.indexOf(operator) === -1) || (output.textContent.indexOf(operator)=== 0)){
        thereAreVariables = false
        console.log("No Variables")
    } else {
        console.log("Yes Variables")
        thereAreVariables = true
    }
}

function equals(){
    var Findanswer = new Operate(operator)
    if (thereAreVariables === false){
        console.log("not enough variables")
    }
    else if (BposNeg){
    b = 0 - parseInt(output.textContent.split(operator)[1])
    Findanswer.evaluate(a,b)
    thereAreVariables= false
    operatorExists = false
    } else{
        Findanswer.evaluate(a,b)
        thereAreVariables= false
        operatorExists = false
    }
}

// function for making sure the screen does not overload

function screenOverflow(){
    var max_chars = 10
    if (output.textContent.length > max_chars){
        output.textContent = output.textContent.substring(0, max_chars);
        output.textContent += ".."

    }
}

// Addition Function 

plusbtn.addEventListener('click', ()=>{
    var variable = new Operate ("+")
    variable.checkVariables()
})
// Subtraction Function 

minusbtn.addEventListener('click', ()=>{
    var variable = new Operate("-")
    variable.checkVariables()
})

//Multiplication Function

multiplybtn.addEventListener('click', ()=>{
    var variable = new Operate ("*")
    variable.checkVariables()
})

//Division Function 

divisionbtn.addEventListener('click', ()=>{
    var variable = new Operate("/")
    variable.checkVariables()
    screenOverflow();
})

//Power Function

powerbtn.addEventListener('click', () =>{
    var variable = new Operate("^")
    variable.checkVariables()
})

//keyboard number support

window.addEventListener("keydown", (e) =>{
    if (isNaN(e.key) == false ){
    output.textContent += parseInt(e.key)
    }
})

//keyboard support for operations

window.addEventListener("keydown", (f) =>{
    switch (f.key){
        case "+": plusbtn.click(); break;
        case "-": minusbtn.click(); break;
        case "*": multiplybtn.click(); break;
        case "/": divisionbtn.click(); break;
        case "^": powerbtn.click(); break;
        case "=": equalbtn.click(); break;
        case "Enter": equalbtn.click(); break;
        case "Backspace": delbtn.click(); break;
        case "Delete": delbtn.click(); break;
        case ".": decimalbtn.click(); break;
        case " ": clear.click();break;
    }
})