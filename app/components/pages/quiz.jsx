import React, {useState,useEffect} from 'react'
import QuestionSet from 'containers/fn-question-set.jsx'
import { load } from 'services/questions'


const quiz = () => {
  const [quizState, updateQuizState] = useState({questions: {} , ids: [], maxScore: 0})

  useEffect(() => {
    load(({questions,id,maxScore}) => {
      updateQuizState({questions,id,maxScore});
    })
  },[])

  return Object.values(quizState.questions).length > 0 ?
  <QuestionSet questions={quizState.questions} /> :
  null
}

export default quiz
