import {useState} from 'react'
import Display from "./Display"
import NumButtons from "./NumButtons"
import OperatorButtons from "./OperatorButtons"
import ClearButton from "./ClearButton"
import PosNegButton from './PosNegButton'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

 return (
  <div className="calc"> 
    <div className="light-border">
      <div className="inset-border">
        <Display display={display}/>
        <div className="all-buttons">
          <div className="clear-nums">
            <div className="clear-pos-neg">
              <ClearButton setDisplay={setDisplay} display={display} 
                      equation={equation} setEquation={setEquation}/>
              <PosNegButton setDisplay={setDisplay} display={display} 
                      equation={equation} setEquation={setEquation}/>
            </div>
            <div>
            <NumButtons className="nums-deci" setDisplay={setDisplay} display={display} 
                        equation={equation} setEquation={setEquation}/>
            </div>
          </div>
          <div>
            <OperatorButtons setDisplay={setDisplay} display={display}
                            equation={equation} setEquation={setEquation}/>
          </div>
        </div>
      </div>
    </div>
  </div>
 )
}

export default Calculator