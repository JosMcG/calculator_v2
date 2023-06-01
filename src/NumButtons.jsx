import "./NumButtons.css"
import Button from "./Button"
import { data } from "./calculatorButtonData"

function NumButtons(props) {

    const numPadButtons = data.map(n => {
      if (n.action === 'num' || n.action === 'decimal') {
        return <Button obj={n}
                  id={n.id}
                  key={n.displayValue}
                  setDisplay={props.setDisplay} 
                  display={props.display} 
                  equation={props.equation} 
                  setEquation={props.setEquation}/>
      }
    })
    return (
      <div className="num-pad-buttons">
         {numPadButtons}
      </div>
    )
  }
  
  export default NumButtons