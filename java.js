/* TODO:
1) Will read negative sign as a - operator... so we can't do negatives 
2) Make it so long decimal numbers don't overflow screen
3) make it so they can't do multiple decimals(ie; 4.2.3.4)
4) Make it look good
5) Add to GitHub
6) Add keyboard support

*/ 

// Query Selectors


const numberButtonsContainer = document.querySelector(".numberContainer")

const clear = document.querySelector(".clear")

const equalbtn = document.querySelector(".equals")

const plusbtn = document.querySelector("#plus")

const minusbtn = document.querySelector("#minus")

const multiplybtn = document.querySelector("#multiply")

const divisionbtn = document.querySelector("#division")



const delbtn = document.querySelector(".del")

delbtn.addEventListener('click', ()=>{
    output.textContent = output.textContent.slice(0,-1)
})

const decimalbtn = document.querySelector("#decimal")

decimalbtn.addEventListener('click', ()=>{
    if (output.textContent.includes(".") === false ){
    output.textContent += decimalbtn.textContent
    }
})


var output = document.querySelector(".output")


var thereAreVariables = false

var operatorExists = false 


// Making the number buttons

function makeButtons(){
    for(let i = 0; i<10; i++){

        const newButton = document.createElement('button')
        newButton.classList.add("number")
        newButton.textContent= i

        numberButtonsContainer.appendChild(newButton);

    }
}
makeButtons()

// Adding the numbers to the output box 

const numberButtons = [...document.querySelectorAll(".number")].forEach(function(item){
    item.addEventListener('click', ()=>{
    output.textContent+= parseInt(item.textContent,10);
    console.log(output.textContent)
})
})

//Adding operations to the output box (NAN = sad ))

const operationButtons = [...document.querySelectorAll(".operations")].forEach(function(item){
    item.addEventListener('click', ()=>{
        if(operatorExists === false){
        output.textContent +=  (item.textContent);
        operatorExists = true;
        console.log(output.textContent);
        }
    })
})

//Clear Button

clear.addEventListener('click', ()=>{
    output.textContent = ''
    a=''
    b=''
    operator = ''
})

// Variables for first and second numbers

var a = ''
var b = ''
var operator = ``


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
                a= a+b
                b = ''

                break;
            case "-":
                console.log(`The answer is: ${a-b}`);
                output.textContent = (a - b);
                a= a-b
                b=''
  
             
                break;
            case "*":
                console.log(`The answer is: ${a*b}`);
                output.textContent = (a * b);
                a= a*b
                b=''


                break;
            case "/":
                console.log(`The answer is: ${a/b}`);
                if((b === 0) && (operator = "/")){
                    output.textContent = `${a} / 0? You can't divide by 0!`
                } else{
                output.textContent = (a / b);
                a = a/b
                b=''
                }

                break;
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
    else{
    Findanswer.evaluate(a,b)
    thereAreVariables= false
    operatorExists = false
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
})
