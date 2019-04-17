import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import questions from 'reducers/questions'
import score from 'reducers/score'

let reducer = combineReducers({
  routing,
  questions,
  score
})

export default reducer
