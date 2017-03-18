import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import questions from './questions';
import score from './score';

let reducer = combineReducers({
    routing,
    questions,
    score
});

export default reducer;