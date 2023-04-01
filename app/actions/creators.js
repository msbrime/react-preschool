import * as ACTIONS from 'actions/actions'
import { load as loadQuestions, create } from 'services/questions'

export function incrementScore (increment) {
  return {
    type: ACTIONS.INCREMENT_SCORE,
    payload: {
      increment: increment
    }
  }
}

export function nextQuestion () {
  return {
    type: ACTIONS.NEXT_QUESTION
  }
}

export function reset () {
  return {
    type: ACTIONS.RESET
  }
}

export function seedQuestions (questions, ids) {
  console.log("la vie en rose");
  return {
    type: ACTIONS.SEED_QUESTIONS,
    payload: {
      questions: questions,
      ids: ids
    }
  }
}

export function setMaxScore (maxScore) {
  return {
    type: ACTIONS.SET_MAX_SCORE,
    payload: {
      score: maxScore
    }
  }
}

export function fetchQuestions () {
  return dispatch => {
    loadQuestions(questionData => {
      let { questions, ids, maxScore } = questionData
      dispatch(seedQuestions(questions, ids))
      dispatch(setMaxScore(maxScore))
    })
  }
}

export function createQuestion (question) {
  return dispatch => {
    create(question)
  }
}
