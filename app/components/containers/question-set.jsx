import React, { useState, useRef } from 'react'
import Feedback from 'presenters/feedback/feedback.jsx'
import Question from 'presenters/questions/question.jsx'
import Options from 'presenters/questions/options.jsx'

function randomSelect(items, exclude) {
  const keys = Object.keys(items).filter(key => {
    return !exclude.includes(`${key}`);
  })

  const randomIndex = Math.floor(Math.random() * keys.length);
  return items[keys[randomIndex]];
}

export default function QuestionSet({ questions, onComplete }) {

  const [attempts, updateAttempts] = useState([]);
  const [shouldExplain, setShouldExplain] = useState(false);
  const [current, setCurrent] = useState(() => randomSelect(questions, []));
  const answered = useRef([]);
  const score = useRef(0);

  const reset = () => {
    updateAttempts([]);
    setShouldExplain(false);
    answered.current = [];
    score.current = 0;
    setCurrent(randomSelect(questions, []));
  }

  const onAcknowledged = () => {
    answered.current = [...answered.current, `${current.id}`];
    score.current = score.current + (current.options.length - attempts.length - 1);

    if (Object.keys(questions).length === answered.current.length) {
      return onComplete(score.current, reset);
    }

    setShouldExplain(false);
    updateAttempts([]);
    setCurrent(randomSelect(questions, answered.current));
  };

  const onOptionAttempted = (attempt) => {
    if (attempt === current.answer) {
      return setShouldExplain(true)
    }
    if (current.options.length - [...attempts, attempt].length < 2) {
      setShouldExplain(true);
    }
    updateAttempts([...attempts, attempt]);
  };

  const feedback = (<Feedback
    active={shouldExplain}
    score={(current.options.length - attempts.length - 1)}
    text={current.explanation}
    onAcknowledged={onAcknowledged} />)

  const options = (
    <Options attempted={attempts} options={current.options} onOptionAttempted={onOptionAttempted} />
  );

  return (
    <div className={`question ${shouldExplain ? 'answered' : ''}`}>
      <Question question={current} feedback={feedback} options={options} />
    </div>
  );
}
