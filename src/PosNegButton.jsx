import Button from "./Button"
import "./PosNegButton.css"
import { data } from "./calculatorButtonData"

function PosNegButton(props) {
    return(
        <Button obj={data[1]}
                setDisplay={props.setDisplay} 
                display={props.display}
                equation={props.equation}
                setEquation={props.setEquation}/>
    )
  }
  
  export default PosNegButton