import { UPDATE_SCORE,RESET } from '../actions/actions';
import { questions } from '../data/questions';

function getMaxScore(questions){

    return questions.reduce((acc,question) => {
        return acc + ( question.options.length - 1 );
    },0);
    
}

let initialState = {
    score : 0,
    maxScore : getMaxScore(questions)  
};
    
    
export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SCORE:
            return Object.assign(state,{score:state.score + action.payload.increment});
        case RESET:
            return initialState;
        default:
            return state;
    }
}