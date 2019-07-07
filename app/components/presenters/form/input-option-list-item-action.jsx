import React from 'react'

// this.handleOptionRemoved.bind(this, option.id)
export default function inputOptionListItemAction ({ handler, text }) {
  return (<span className="option-list__item-action"
    onClick={handler}>{text}</span>)
}
