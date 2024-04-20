/* -------------------------------------------------------------------------- */
/*                                 CALCULATOR                                 */
/* -------------------------------------------------------------------------- */

class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        console.log('constructor called');
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() //clears the past calculator outputs
    }

    clear(){
        console.log('clear function called');
        this.previousOperand =  '';
        this.currentOperand = '';
        this.operation = undefined;
        this.operationSelf = undefined;
    }

    delete(){
        console.log('delete function called');
        console.log('currentOperand before deletion:', this.currentOperand);
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        console.log('currentOperand after deletion:', this.currentOperand);
    }

    appendNumberOrParenthesis(input) {
        console.log('appendNumberOrParenthesis function called');
        console.log('input:', input);
        if (input === '.' && this.currentOperand.includes('.')) return;
        /* if (input === '(' || input === ')') {
            this.currentOperand += input;
        }  */ else {
            this.currentOperand += input.toString();
        }
    }

    chooseOperation(operation){
        console.log('chooseOperation function called');
        console.log('operation', operation);
        
        /* if(operation == '(' || operation == ')'){
            this.previousOperand += operation
        }
        else */ 
        if (this.previousOperand.match(/[-+*/%]$/) !== null){
            console.log('matched -', this.previousOperand.match(/[-+*/%]$/));
            console.log('operation:', operation);
            if(operation !== this.previousOperand.match(/[-+*/%]$/)){
                console.log('you made it')
                this.previousOperand = this.previousOperand.replace(this.previousOperand.match(/[-+*/%]$/), operation)
                this.operation = operation;
                return
            }
        }
        
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        
        this.operation = operation
        this.previousOperand = this.currentOperand + ' ' + operation
        
        this.currentOperand = ''

    }

    compute(){
        console.log('compute function called');
        let computation
        console.log('prev:', this.previousOperand);
        console.log('current:', this.currentOperand);
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        console.log('prev:', prev);
        console.log('current:', current);
        console.log('operation:', this.operation);
        
        if(isNaN(current) && this.previousOperand.match(/[-+*/%]$/)) {
            console.log('matched -', this.previousOperand.match(/[-+*/%]$/));
            if(this.operation !== this.previousOperand.match(/[-+*/%]$/)){
                this.previousOperand.replace(this.previousOperand.match(/[-+*/%]$/), this.operation)
                return
            }
            else{
                this.currentOperand = prev
                this.previousOperand = ''
                return
            }
            
        }
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '%':
                computation = prev % current
                break
            case '/':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            default:
                return
        }
        
            
    

        console.log(this.operation);
        /* if (this.operation === "="){
            this.previousOperand += ' ' + this.currentOperand + ' ' + this.operation
            
        } 
        else this.previousOperand = computation + ' ' + this.operation */
        this.previousOperand += ' ' + this.currentOperand + ' = '
        this.currentOperand = computation
        
        this.operation = undefined
    }


    computeSelf(){
        console.log('computeSelf function called');
        let computation
        console.log('prev:', this.previousOperand);
        console.log('current:', this.currentOperand);
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        console.log('prev:', prev);
        console.log('current:', current);

        if(isNaN(current)) return
        switch(this.operationSelf){
            case '+/-':
                computation = current * -1
                break
            case 'x²':
                computation = current ** 2
                this.previousOperand += ` sqr(${current})`
                console.log(this.previousOperand)
                console.log(this.currentOperand)
                break
            case '√x':
                computation = Math.sqrt(current)
                this.previousOperand += ` sqrt(${current})`
                console.log(this.previousOperand)
                console.log(this.currentOperand)
                break
            default:
                return
        }
        this.currentOperand = computation
    }
    getDisplayNumber(number){
        console.log('getDisplayNumber function called');
        console.log('Original number:', number); // Debugging: Log the original number
        const stringNumber = number.toString();
        console.log('Converted to string:', stringNumber);

        console.log('Splitting number into integer and decimal parts');
        const integerDigits = parseFloat(stringNumber.split('.')[0]) //get the integer part of the number
        console.log('Integer part:', integerDigits);
        const decimalDigits = stringNumber.split('.')[1] //get the decimal part of the number
        console.log('Decimal part:', decimalDigits);

        let integerDisplay
        console.log('Checking if integer part is a number');
        if(Number.isNaN(integerDigits)){
            console.log('Integer part is not a number, checking if number contains decimal place');
            if(stringNumber.includes('.')){
                console.log('Number contains decimal place, returning 0');
                integerDisplay = '0' //if the integer part is not a number and there is no decimal place, return 0.
            }
            else{
                console.log('Number does not contain decimal place, returning empty string');
                integerDisplay = ''
            }
        }
        else{
            console.log('Integer part is a valid number, formatting with commas');
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0}) //otherwise, the integer part is a valid number and there is no decimal place. format the integer part of the number with commas separating the thousands
        }

        console.log('integerDisplay:', integerDisplay);
        console.log('decimalDigits:', decimalDigits);
        if(decimalDigits != null){
            console.log('Returning concatenation of integerDisplay and decimalDigits');
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            console.log('Returning integerDisplay');
            return integerDisplay
        }
    }

    updateOutput(){
        console.log('Updating output');
        console.log('previous', this.previousOperand)
        console.log('current', this.currentOperand)
        this.previousOperandTextElement.innerText = this.previousOperand
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const selfOperationButtons = document.querySelectorAll('[data-self-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const backlitButton = document.querySelector('[data-backlit]');
const previousOperandTextElement = document.querySelector('[data-prev-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');



const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('clicked number button', button.innerText);
        calculator.appendNumberOrParenthesis(button.innerText)
        calculator.updateOutput()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('clicked operation button', button.innerText);
        calculator.chooseOperation(button.innerText)
        calculator.updateOutput()
    })
})

selfOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operationSelf = button.innerText
        calculator.computeSelf()
        calculator.updateOutput()
    })
})
equalsButton.addEventListener('click', button => {
    console.log('clicked equals button');
    calculator.compute();
    calculator.updateOutput()
})

allClearButton.addEventListener('click', button => {
    console.log('clicked all clear button');
    calculator.clear()
    calculator.updateOutput()
})

backlitButton.addEventListener('click', button => {
    console.log('clicked backlit button');
    document.querySelector('.calculator-grid').classList.toggle('backlit-switch');
    const buttonColorElements = document.querySelectorAll('button i');
    const svgColorElement = document.querySelector('.calculator svg path:nth-of-type(2)');
    document.querySelectorAll('.backlit-color').forEach(element => {
        if(!document.querySelector('.calculator-grid').classList.contains('backlit-switch')){
            element.style.boxShadow = '0 0 9px 6px rgba(0, 0, 0, 0)';
            buttonColorElements.forEach(element => {
                if(document.querySelector('.calculator').classList.contains('light')){
                    element.style.color = 'black';
                    svgColorElement.style.fill = 'black';
                }
                else{
                    element.style.color = 'white';
                    svgColorElement.style.fill = 'white';
                }
            })
            /* if(document.querySelector('.calculator').classList.contains('light')){
                svgColorElement.style.fill = 'black';
            }
            else{
                svgColorElement.style.fill = 'white';
            } */
        }
        else{
            const boxShadowColor = document.querySelector('.calculator-grid').dataset.boxShadowColor;
            element.style.boxShadow = `0 0 9px 6px ${boxShadowColor}`;
            buttonColorElements.forEach(element => {
                element.style.color = boxShadowColor;
            })
            svgColorElement.style.fill = boxShadowColor;
        }    
    })  
})

deleteButton.addEventListener('click', button => {
    console.log('clicked delete button');
    calculator.delete()
    calculator.updateOutput()
})
