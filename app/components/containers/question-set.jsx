import React, { useState, useRef, useEffect, useContext } from 'react'
import Feedback from 'presenters/feedback/feedback.jsx'
import Question from 'presenters/questions/question.jsx'
import Options from 'presenters/questions/options.jsx'
import { useRandomiseFrom } from '../../services/questions/index.mjs'
import { AppContext } from '../../context/app.jsx'

export default function QuestionSet({ questions, onComplete }) {

  const {randomizer} = useContext(AppContext);
  const [current, setCurrent] = useState(0);
  const questionIds = Object.keys(questions);
  const rando = React.useMemo(() => randomizer({name: 'questions', items: questionIds}), [current])
  const answered = useRef([]);
  const score = useRef(0);
  const [attempts, updateAttempts] = useState([]);
  const [skipLoading, updateSkipLoading] = useState(true);
  const [shouldExplain, setShouldExplain] = useState(false);
  const que = questions[rando];


  useEffect(() => {
    updateSkipLoading(false);
  }, []);

  const reset = () => {
    answered.current = [];
    score.current = 0;
    updateAttempts([]);
    setShouldExplain(false);
    setCurrent(0);
  }

  const onAcknowledged = () => {
    answered.current = [...answered.current, `${current.id}`];
    score.current = score.current + (que.options.length - attempts.length - 1);

    if (Object.keys(questions).length === answered.current.length) {
      return onComplete(score.current, reset);
    }

    setShouldExplain(false);
    updateAttempts([]);
    setCurrent(current+1);
  };

  const onOptionAttempted = (attempt) => {
    if (attempt === que.answer) {
      return setShouldExplain(true)
    }
    if (que.options.length - [...attempts, attempt].length < 2) {
      setShouldExplain(true);
    }
    updateAttempts([...attempts, attempt]);
  };

  const feedback = (<Feedback
    active={shouldExplain}
    score={(que.options.length - attempts.length - 1)}
    text={que.explanation}
    onAcknowledged={onAcknowledged} />)

  const options = (
    <Options attempted={attempts} options={que.options} onOptionAttempted={onOptionAttempted} />
  );

  return (
    <div className={`question ${shouldExplain ? 'answered' : ''}`}>
      <Question question={que} feedback={feedback} options={options} skipLoading={skipLoading} />
    </div>
  );
}
