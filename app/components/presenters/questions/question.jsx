import React, { useEffect, useState } from 'react'
import QuestionLoader from 'presenters/loaders/question-loader.jsx'
import OptionsLoader from 'presenters/loaders/options-loader.jsx'

const Question = ({ question, feedback, options }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
  }, [question.resource.url]);

  const [body, answers] = loading ? [
    <QuestionLoader src={question.resource.url} onLoad ={ () => setLoading(false)} /> , <OptionsLoader />] :
    [
      (
        <>
          <div className="card__media">
            <img src={question.resource.url} alt="" />
          </div>
          <div className="card__body">
            <p className="question__wording">{question.question}</p>
          </div>
        </>),
      options
    ]

  return (
    <>
      <div className="card card--flippable">
        <div className="card__face card__face--front">
          {body}
        </div>
        {feedback}
      </div>
      {answers}
    </>
  )
}

export default Question
