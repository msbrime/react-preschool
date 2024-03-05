import React, {useState,useCallback, useRef} from 'react'
import QuestionSet from 'containers/question-set.jsx'
import Score from 'presenters/feedback/score.jsx'
import { computeMaxScore } from 'services/questions'
import { useQuestionStore } from '../../services/firebase'

const quiz = () => {
  const [displayResults, updateDisplayResults] = useState(false)
  const finalScore = useRef(0);
  const resetQuiz = useRef(() => {});
  const questions = useQuestionStore();
  const quizState = {
    questions,
    ids: Object.keys(questions),
    maxScore: computeMaxScore(questions)
  }
 
  const onComplete = (score,reset) => {
    finalScore.current = score;
    resetQuiz.current = () => {
      reset();
      updateDisplayResults(false);
    };
    updateDisplayResults(true);
  }

  return Object.values(quizState.questions).length > 0 ?
  displayResults ?
  <Score maxScore={quizState.maxScore} score={finalScore.current} action={resetQuiz.current} /> :
  <QuestionSet questions={quizState.questions} onComplete={onComplete} /> :
  null
}

export default quiz
