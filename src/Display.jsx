import "./Display.css"
import {useState} from 'react'



function Display(props) {
  
  
  return (
    <div>
      <p type="text" id="display">{props.display}</p>
    </div>
  )
}

export default Display