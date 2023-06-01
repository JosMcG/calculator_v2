import { evaluate, abs, format } from 'mathjs';

const isOperator = /\+|-|\*|\//; //checks for operators

export const handleClick = (buttonObj, display, setDisplay, equation, setEquation) => {
  const displayValue = buttonObj.displayValue;
  const equationValue = buttonObj.equationValue;
  const action = buttonObj.action;

  //check for and handle operator, AC, or "=" click
  switch (action) {
    case 'operator':
      setEquation(pushOperator(equation, equationValue));
      break;
    case 'clear':
      setEquation('');
      setDisplay('0');
      break;
    case 'pos-neg':
      let switchSign = changeSign(display, displayValue);
      setDisplay(switchSign);
      setEquation(equation.slice(0, -1) + switchSign);   //replace last number in equation to number with opposite sign
      break;
    case 'equals':
      setDisplay(calculate(equation));
      setEquation('');
      break;
    case 'num':
      setEquation(handleNumberClick(displayValue, display, setDisplay, equation));
      break;
    case 'decimal':
      setEquation(handleDecimalClick(displayValue, display, setDisplay, equation));
    default:
      break;
  }
};
/*If multiple operators are entered sequentially, only use the last entered.
When an operator is entered, push the displayed numbers to the equation,
along with the clicked operator. */
export const pushOperator = (equation, equationValue) => {
  if (isOperator.test(equation[equation.length - 1])) {
    return equation.slice(0, -1) + equationValue;
  } else {
    return equation + equationValue;
  }
};

/*calculate the equation when "=" is clicked, 
displaying ERROR if clicked multiple times or divide by zero*/
export const calculate = (equation) => {
  let equationStr = equation;

  if (equationStr === ''){
    return '0';
  }

  if (isOperator.test(equation[equation.length - 1])) {
    equationStr = equation.slice(0, -1);
  }
  let answer = evaluate(equationStr);
  answer = format(answer, {precision: 16});  //hides round-off errors with floats
  
  if (answer === Infinity) {
    return "ERROR";
  } else {
    return answer;
  }
};

//change the sign of the displayed number
export const changeSign = (display) => {
  if (/\d/.test(display)) {
    let num = display;
    if (num > 0) {
      return (0 - num).toString();
    } else {
      return abs(num).toString();
    }
  }
};

const handleNumberClick = (displayValue, display, setDisplay, equation) => {

  let equationStr = equation;

  //display a new number on initial click, after an operator click, or after equals click 
  if (display === '0' || isOperator.test(equation[equation.length - 1]) || equationStr === ''){
    setDisplay(displayValue)
  } else {
    setDisplay(display + displayValue)
  }

  //Keep equation at 0 if 0 button is clicked sequentially
  if (displayValue === '0' && equation === '0') {
    return equationStr;
  } else {
    return equationStr = equationStr + displayValue;
  }
}

const handleDecimalClick = (displayValue, display, setDisplay, equation) => {

  let equationStr = equation;

  //if an operator is last clicked, reset the display
  if (isOperator.test(equation[equation.length - 1])){
    setDisplay('0' + displayValue)
    return equationStr = equationStr + displayValue;
  }
  //do not allow for multiple decimals in a number
  if (!display.includes(displayValue)) { 
    setDisplay(display + displayValue);
    return equationStr = equationStr + displayValue;
  }

}
