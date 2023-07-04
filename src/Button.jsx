import "./Button.css"
import { handleClick } from './calculatorLogic'

const Button = (props) => {

  const clicked = () => {
    handleClick(props.obj, props.display, props.setDisplay, props.equation, props.setEquation)
  }

  return (
    <button className="buttons"
      id={props.obj.id}
      number={props.obj.displayValue}
      action={props.obj.action}
      onClick={clicked}>{props.obj.displayValue}
    </button>
  );
}

export default Button