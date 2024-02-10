import React from 'react'

const option = key => <li className = "option-list__item loader" key={key}/>

const renderOptions = () => {
  return [1, 2, 3, 4].map(option)
}

const OptionsLoader = () => {
  return (
    <ul className="option-list">
      {renderOptions()}
    </ul>
  )
}

export default OptionsLoader
