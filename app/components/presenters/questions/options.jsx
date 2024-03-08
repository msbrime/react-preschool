import React from 'react'
import Option from 'presenters/questions/option'

export default function Options({ options, attempted, onOptionAttempted }){
  return (
    <ul className="option-list">
    { options.map((option,index) => {
      return (<Option
        disabled={attempted.includes(option)}
        onAttempt={() => onOptionAttempted(option)}
        value={option}
        key={index}/>)
    }) 
    }
  </ul>
  )
}

