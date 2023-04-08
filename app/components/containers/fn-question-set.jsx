import React, { useState,  useRef } from 'react'
import Feedback from 'presenters/feedback/fn-feedback.jsx'
import Question from 'presenters/questions/question.jsx'
import Options from 'presenters/questions/fn-options.jsx'
// import QuestionLoader from 'presenters/loaders/question-loader.jsx'
// import OptionsLoader from 'presenters/loaders/options-loader.jsx'

function randomSelect(items, exclude){
  const keys = Object.keys(items).filter(key => {
    return !exclude.includes(`${key}`);
  })

  const randomIndex = Math.floor(Math.random() * keys.length);
  return items[keys[randomIndex]];
}

export default function QuestionSet({ questions }){

  const [attempts, updateAttempts] = useState([]);
  const [shouldExplain, setShouldExplain] = useState(false);
  const [current, setCurrent] = useState( () => randomSelect(questions,[]));
  const answered = useRef([]);

  const onAcknowledged = () => {
    answered.current = [...answered.current, `${current.id}` ];
    setShouldExplain(false);
    updateAttempts([]);
    setCurrent(randomSelect(questions, answered.current));
  };

  const onOptionAttempted = (attempt) => {
    if(attempt === current.answer){
      return setShouldExplain(true)
    }
    if(current.options.length - [...attempts, attempt].length < 2){
      return setShouldExplain(true);
    }
    updateAttempts([...attempts, attempt]);
  };

  return (
    <div className = {`question ${shouldExplain ? 'answered' : ''}`}>
      <div className="card card--flippable">
        <Question question = { current } />
        <Feedback
          active = { shouldExplain }
          score = { current.options.length - attempts.length }
          text = { current.explanation }
          onAcknowledged = { onAcknowledged } />
      </div>
      <Options attempted={attempts} options={current.options} onOptionAttempted={ onOptionAttempted } />
    </div>)
}
