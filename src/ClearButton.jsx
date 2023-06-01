import { data } from "./calculatorButtonData"
import Button from "./Button"
import "./ClearButton.css"

function ClearButton(props) {
    return(
        <Button obj={data[0]}
                setDisplay={props.setDisplay} 
                display={props.display}
                equation={props.equation}
                setEquation={props.setEquation}/>
    )
  }
  
  export default ClearButton