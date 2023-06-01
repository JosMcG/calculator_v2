import "./OperatorButtons.css"
import { data } from "./calculatorButtonData"
import Button from "./Button"

function OperatorButtons(props) {
    const operators = data.map(o => {
      if (o.action === 'operator' || o.action === 'equals') {
        return <Button obj={o}
                id={o.displayValue}
                key={o.id} 
                setDisplay={props.setDisplay} 
                display={props.display}
                equation={props.equation}
                setEquation={props.setEquation}/>
      }
    })

    return (
      <div className="ops">
        {operators}
      </div>
    )
  }
  
  export default OperatorButtons