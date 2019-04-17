import React from 'react'

const question = ({ question }) => {
  return (
    <div className="card__face card__face--front">
      <div className="card__media">
        <img src={question.resource.url} alt=""/>
      </div>
      <div className="card__body">
        <p className="question__wording">{question.question}</p>
      </div>

    </div>
  )
}

export default question
