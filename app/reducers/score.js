import { INCREMENT_SCORE,RESET,SET_MAX_SCORE } from 'actions/actions';


/**
 * The initial state for the score state tree
 *
 * @type {object}
 */
let initialState = {
    score: 0,
    maxScore: 0
};


export default (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_SCORE:
            return Object.assign(
                {} ,
                state, 
                { score: state.score + action.payload.increment }
            );
        case SET_MAX_SCORE:
            return Object.assign(
                {} ,
                state, 
                { maxScore: action.payload.score }
            );
        case RESET:
            return { score : 0 , maxScore:state.maxScore };
        default:
            return state;
    }
}