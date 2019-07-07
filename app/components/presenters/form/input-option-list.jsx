import React from 'react'
import InputOptionListItem from 'presenters/form/input-option-list-item.jsx'

export default function inputOptionList (props) {
  const { minimumOptionCount, action, options, ...handlers } = props
  return (<ul className="option-list option-list--input">
    {
      options.map((option, index) => {
        return (index + 1) > minimumOptionCount
          ? inputOptionItem(option, index, handlers, action)
          : inputOptionItem(option, index, handlers, null)
      })
    }
  </ul>)
}

function inputOptionItem (option, index, handlers, action) {
  const indexedAction = indexActionHandler(action, option.id)
  const optionIndex = index + 1
  return (
    <InputOptionListItem
      key={option.id}
      index={optionIndex}
      identifier={option.id}
      value={option.value}
      isSelected={option}
      changeHandler={ evt => handlers.changeHandler(option.id, evt)}
      selectHandler={ evt => handlers.selectHandler(index, evt)}
      action={indexedAction}
    />
  )
}

function indexActionHandler (action, index) {
  if (!action) return action

  return {
    ...action,
    props: {
      ...action.props,
      handler: evt => action.props.handler(index, evt) }
  }
}
