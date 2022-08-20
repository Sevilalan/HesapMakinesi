const display=document.querySelector('.calculator-input');
const keys= document.querySelector('.calculator-keys');

let displayValue='0';
let firsValue=null;
let operator=null;
let  waitingForSecondValue=false;
updateDisplay();

function updateDisplay(){
    display.value = displayValue;

}

keys.addEventListener('click', function(e) {
    const element = e.target;
    const value=element.value;

    if(!element.matches('button')) return;

    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
/*if(element.classList.contains('operator')){
        //console.log('operator', element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    } bunun yerine yukarıdaki  swich case'i yazdık*/

        case '.':
            inputDecimal();
            break;
            /* if(element.classList.contains('decimal')){
        //console.log('decimal', element.value);
        inputDecimal();
        updateDisplay();

        return;
    } yukarıdaki ;   case '.':
                   inputDecimal(); 'i bu if bloğu için yazdık */

        case 'clear':
            clear();
            break;
            

         /*  if(element.classList.contains('clear')){
       // console.log('clear', element.value);
       clear();
       updateDisplay();
        return;
    } yukardaki case 'clear':
            clear();
            break; komutu bu if bloğu yerine yazmış olduk */

            default: 
            inputNumber(element.value);

        
    }
 
    
    //console.log('number',element.value);
   
    updateDisplay();
});

function handleOperator(nextoperator){
    const value=parseFloat(displayValue);

    if(operator && waitingForSecondValue){
        operator=nextoperator;
        return;
    }
    
    if(firsValue==null){
        firsValue=value;
    }else if(operator){
        const result=calculate(firsValue, value,operator);
        displayValue=String(result); //'${parseFloat(result.toFixed(7))}'
        firsValue=result;
    }

    waitingForSecondValue=true;
    operator=nextoperator;

    console.log(displayValue,firsValue, operator, waitingForSecondValue);

}
function calculate(first, second, operator){
    if(operator==='+'){
        return first+second;

    }else if(operator==='-'){
        return first-second;
    }else if(operator==='*'){
        return first*second;
    }else if(operator==='/'){
        return first/second;
    }
    return second;
}

function inputNumber(num){  // butonlara basınca sayıları alsın diye fonksiyon yazdık
   if(waitingForSecondValue){
    displayValue=num;
    waitingForSecondValue=false;

   }
   else{

  
    displayValue=displayValue==='0'? num:displayValue + num;
}
console.log(displayValue,firsValue, operator, waitingForSecondValue);
}
function inputDecimal(){ //decimal değer içinn fonksiyon yazdık

    if(!displayValue.includes('.')){
        displayValue+='.';

    }
   

}

function clear(){    //silme butonu için fonksiyon yazdık
    displayValue='0';
}