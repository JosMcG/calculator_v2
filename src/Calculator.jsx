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
  <div id="calc"> 
    <div id="light-border">
      <div id="inset-border">
        <Display display={display}/>
        <div id="all-buttons">
          <div id="clear-nums">
            <div id="clear-pos-neg">
              <ClearButton setDisplay={setDisplay} display={display} 
                      equation={equation} setEquation={setEquation}/>
              <PosNegButton setDisplay={setDisplay} display={display} 
                      equation={equation} setEquation={setEquation}/>
            </div>
            <div>
            <NumButtons id="nums-deci" setDisplay={setDisplay} display={display} 
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