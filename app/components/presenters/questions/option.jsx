import React from 'react'

const option = ({ value, onAttempt, disabled }) => {
  const [disabledClass, handler] = (disabled)
    ? ['option-list__item--incorrect', () => {}]
    : ['', onAttempt]

  return (
    <li className = {['option-list__item', disabledClass].join(' ')}
      onClick ={() => handler(value)}>
      {value}
    </li>
  )
}

export default option
