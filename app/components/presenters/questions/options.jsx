import React from 'react'
import Option from 'presenters/questions/option.jsx'

const renderOptions = (options, clickHandler) => {
  let renderedOptions = []
  for (let option in options) {
    renderedOptions.push(
      <Option
        disabled={options[option].attempted}
        clickHandler={() => clickHandler(option)}
        value={options[option].value}
        key={option}/>
    )
  }
  return renderedOptions
}

const options = props => (
  <ul className="option-list">
    { renderOptions(props.options, props.clickHandler) }
  </ul>
)

export default options
