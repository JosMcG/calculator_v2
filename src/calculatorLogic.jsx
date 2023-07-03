import { evaluate, abs, format } from 'mathjs';

const isOperator = /\+|-|\*|\//; //checks for operators

export const handleClick = (buttonObj, display, setDisplay, equation, setEquation) => {
  const displayValue = buttonObj.displayValue;
  const equationValue = buttonObj.equationValue;
  const action = buttonObj.action;

  //check for and handle operator, AC, or "=" click
  switch (action) {
    case 'operator':
      setEquation(pushOperator(equation, equationValue, display));
      break;
    case 'clear':
      setEquation('');
      setDisplay('0');
      break;
    case 'pos-neg':
      let switchSign = changeSign(display, equation);  //calls function that returns the number with the opposite sign

      //If pos/neg is clicked immediately after an operator, add '-0' to the equation
      if(switchSign === '-0'){
        setEquation(equation + switchSign);
      }else {
      //Replace last number in equation to number displayed after the sign changed
      setEquation(equation.slice(0, equation.length - display.length) + switchSign);
      }
      //Displays the number with the opposite sign
      setDisplay(switchSign);   
      break;
    
    case 'equals':
      let ans = calculate(equation);
      setDisplay(ans);
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
export const pushOperator = (equation, equationValue, display) => {
  if (equation == '' && display != '0'){
    return display + equationValue;
  }
  if (equationValue == '-'){
    if (isOperator.test(equation[equation.length - 1]) && isOperator.test(equation[equation.length - 2])){
      let n = equation[equation.length - 1];
      return equation.slice(0, -2) + n + equationValue;
     
    } else {
      return equation + equationValue;
    }
  }else if ((equation[equation.length - 1]) == '-'){
    if (isOperator.test(equation[equation.length - 2])){
      return equation.slice(0, -2) + equationValue;
    } else {
      return equation.slice(0, -1) + equationValue;
    }
  }else if (isOperator.test(equation[equation.length - 1])) {
    return equation.slice(0, -1) + equationValue;
  }
  return equation + equationValue;
};

/*calculate the equation when "=" is clicked, 
displaying ERROR if clicked multiple times or divide by zero*/
export const calculate = (equation) => {
  let equationStr = equation;

  //if an operator is clicked immediately prior to equals, remove the operator
  if (isOperator.test(equation[equation.length - 1])) {
    equationStr = equation.slice(0, -1);
  }

  //evaluate the equation
  let answer = evaluate(equationStr);
  answer = format(answer, {precision: 15});  //hides round-off errors with floats
  
  if (answer === Infinity) {
    return "ERROR";
  } else {
    return answer;
  }
};

//change the sign of the displayed number
export const changeSign = (display, equation) => {
  /* If pos/neg is clicked first, when the display is zero, 
  or immediately after an operator, return '-0' */
  if (display === '0' || (isOperator.test(equation[equation.length - 1]))){
    return "-0";
  }else {
    if (display > 0) {
      return (0 - display).toString();    //Return the negative of a positive number
    } else {
      return abs(display).toString();     //Return the positive of a negative number
    }
  }
};

const handleNumberClick = (displayValue, display, setDisplay, equation) => {

  //display a new number on initial click, after an operator click, or after equals click 
  if (display === '0' || isOperator.test(equation[equation.length - 1]) || equation === ''){
    setDisplay(displayValue)

  /*if the pos/neg was clicked immediately after an operator, so to display '-0', 
  remove the zero when subsequent numbers are clicked.
  For the current caluclator, the extra 0 is not removed from equation. If the program is
  changed to display the equation as it is entered, the '0' should be removed.*/
} else if(display === '-0'){
  setDisplay('-' + displayValue)
  } else {
    setDisplay(display + displayValue)
  }

  //Keep equation at 0 if 0 button is clicked sequentially
  if (displayValue === '0' && equation === '0') {
    return equation;
  } else {
    return equation + displayValue;
  }
}

const handleDecimalClick = (displayValue, display, setDisplay, equation) => {


  //if an operator is last clicked, reset the display
  if (isOperator.test(equation[equation.length - 1])){
    setDisplay('0' + displayValue)
    return equation + displayValue;
  }
  //do not allow for multiple decimals in a number
  if (!display.includes(displayValue)) { 
    setDisplay(display + displayValue);
    return equation + displayValue;  //add the decimal if the number does not already contain one
  } else {
    return equation;   //return the current number in equation if the number already has a decimal,
                          //enabling the user to continue adding digits
  }
}
