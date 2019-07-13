import React from 'react'

export default function questionSummary ({ question }) {
  return (
    <div className="question-summary card">
      <div className="card__body">
        <div className="question-summary-thumbnail"
          style={{ backgroundImage: `url(${question.resource.url})` }}>
          <img src={question.resource.url} alt=""/>
        </div>
        <p>{question.question}</p>
        {renderOptions(question.options, question.answer)}
      </div>
    </div>
  )
}

function renderOptions (options, answer) {
  const optionList = options.map((option, index) => {
    return <li className='option-list__item' key={index}>{option}</li>
  })

  return <ul className='option-list '>{optionList}</ul>
}
