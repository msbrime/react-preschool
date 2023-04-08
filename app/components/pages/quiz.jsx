import React, {useState,useEffect, useRef} from 'react'
import QuestionSet from 'containers/question-set.jsx'
import Score from 'presenters/feedback/score.jsx'
import { load } from 'services/questions'



const quiz = () => {
  const [quizState, updateQuizState] = useState({questions: {} , ids: [], maxScore: 0})
  const [displayResults, updateDisplayResults] = useState(false)
  const finalScore = useRef(0);
  const resetQuiz = useRef(() => {});

  const onComplete = (score,reset) => {
    finalScore.current = score;
    resetQuiz.current = () => {
      reset();
      updateDisplayResults(false);
    };
    updateDisplayResults(true);
  }

  useEffect(() => {
    load(({questions,id,maxScore}) => {
      updateQuizState({questions,id,maxScore});
    })
  },[])

  return Object.values(quizState.questions).length > 0 ?
  displayResults ?
  <Score maxScore={quizState.maxScore} score={finalScore.current} action={resetQuiz.current} /> :
  <QuestionSet questions={quizState.questions} onComplete={onComplete} /> :
  null
}

export default quiz
