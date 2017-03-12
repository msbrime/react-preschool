import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import questions from './questions';
import score from './score';
import feedback from './feedback';

let reducer = combineReducers({
    routing,
    questions,
    score,
    feedback
});

export default reducer;