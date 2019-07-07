import React from 'react'
import DebounceInput from 'presenters/form/debounce.jsx'

export default function inputOptionListItem (props) {
  return (<li>
    <label>option <span>{props.index}</span></label>
    <div className="input-group">
      <span className="input-group__addon">
        <input type="radio" name="answer"
          value={props.isSelected}
          onChange={props.selectHandler}/>
      </span>
      <DebounceInput onChange={props.changeHandler}>
        <input name="option[]"
          placeholder={`option ${props.index}`}
          className="input input-group__input"
          defaultValue={props.value}
          type="text"
          autoComplete="off" />
      </DebounceInput>
      {props.action}
    </div>
  </li>)
}
