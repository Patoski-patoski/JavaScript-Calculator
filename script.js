"use strict"

class Calculator {
    constructor(currentOutputValue, previousOutputValue) {
        this.currentOutputValue = currentOutputValue;
        this.previousOutputValue = previousOutputValue;
        this.clear();
        
    }

    clear(){
        this.currentOutput = '';
        this.operation = undefined;
        this.previousOutput = '';

    } 

    appendNumbers(number){
        if(number === '.' && this.currentOutput.includes('.'))return;

        this.currentOutput = this.currentOutput.toString() + number.toString();

      
    } 
 
    chooseOperation(operation){ 

     if(this.currentOutput == '' || isNaN(this.currentOutput)) return
     if(this.previousOutput != null){
        this.compute()
     }

     this.operation = operation;
     this.previousOutput = this.currentOutput;
     this.currentOutput = ''


    }
 
    compute(){  
        let computation;

        let current = parseFloat(this.currentOutput);
        let previous = parseFloat(this.previousOutput);
        if(this.previousOutput == null)alert('p')

        if(isNaN(current) || isNaN(previous))return


        switch (this.operation) { 
            case '÷':
                computation = previous / current;
                
                break;
            case '×':
                computation = previous * current; 
                
                break;
            case '-':
                computation = previous - current;
                
                break;
            case '+':
                computation = previous + current;
                
                break;
            case '%':
                computation = (previous / 100) * current;
                
                break;
               
            default:
                return
        }

        this.previousOutput = computation;
        this.currentOutput = '';
        this.operation = undefined;
        this.chooseOperation(this.previousOutput)

    
    }

    delete(){ 
        this.currentOutput = this.currentOutput.slice(0,-1)
 
    } 

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split('.')[0]);
        const decimalDigit = stringNumber.split('.')[1]
        let intDisplay;
        if(isNaN(integerDigit)){
            intDisplay = ''
        } else{
            intDisplay = integerDigit.toLocaleString('uk', {maximumFractionDigits:0})
        }
        if (decimalDigit != null) {
            return `${intDisplay}.${decimalDigit}`
            
        }else{
            return intDisplay
        }
    }


    display(){

        this.currentOutputValue.innerText = `${this.getDisplayNumber(this.currentOutput)}`


        if(this.operation != null){
            this.previousOutputValue.innerText =  `${this.previousOutput}${this.operation}`; 

        }else{
            this.previousOutputValue.innerText = '';
            
        }

    }
    
}

const currentOutputValue = document.querySelector('#current-output');
const previousOutputValue = document.querySelector('#previous-output');

const numberButton = document.querySelectorAll('[data-numbers]');
const operationButton = document.querySelectorAll('[data-operations]');

const clearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');

const equalButton = document.querySelector('[data-equal-sign]');


const calculator = new Calculator(currentOutputValue, previousOutputValue);

numberButton.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumbers(button.innerText);

        calculator.display();
    })
    
});

operationButton.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)

        calculator.display()
    })
})

equalButton.addEventListener('click', () =>{
    calculator.compute();
    calculator.display();
})
  

clearButton.addEventListener('click',()=>{
    calculator.clear()
    calculator.display()
})

deleteButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.display()
})
