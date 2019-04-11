import { getRandomIndex } from 'util.js';
import { 
    REDUCE_TRIES, 
    NEXT_QUESTION, 
    RESET, 
    MARK_AS_ANSWERED,
    SEED_QUESTIONS
} from 'actions/actions';

function randomElement(ids){
    let index = Math.floor(Math.random() * Math.floor(ids.length));
    return ids[index];
}

function initializeQuestionState({questions, ids}){
    let 
        current = randomElement(ids),
        unselected = ids.filter(value => value !== current);
    return { questions, ids, current, unselected}
}

function setQuestion(ids){
    let 
        current = randomElement(ids),
        unselected = ids.filter(value => value !== current);
    
    return { current, unselected}
}

function normalizeOptions(options){
    let normalizedOptions = {};
    options.forEach( (option,index) => {
        normalizedOptions[`option${index}`] = {
            value: option,
            attempted: false
        }
    });
    return normalizedOptions;
}

/**
 * 
 * @param {Object} question
 * @returns {Number}
 */
function triesAllowed(question) {
    return (question.options.length - 1)
}



/**
 * 
 * @type setQuestion.state
 */
//let initialState = {questions:null,ids:null,unselected:[],current:null};


let initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        // case MARK_AS_ANSWERED:
        //     return Object.assign(
        //         {} ,
        //         state , 
        //         { 
        //             current : Object.assign(
        //                 {} ,
        //                 state.current ,
        //                 { answered:true, animate:false } 
        //             ) 
        //         }
        //     );
        case NEXT_QUESTION:
            let newQuestion = setQuestion(state.unselected);
            return {...state,...newQuestion};
        case REDUCE_TRIES:
            let 
                attemptedOptionState = {
                    value : state.current.options[action.payload.attempt].value,
                    attempted : true
                },
                newOptions = {
                    ...state.current.options,
                    [action.payload.attempt]: attemptedOptionState},
                newCurrentQuestionState = {
                    triesLeft : state.current.triesLeft - 1,
                    animate:false,
                    options: newOptions
                };
            return {
                ...state, 
                current : {...state.current,...newCurrentQuestionState} 
            }
        case RESET:
            return setQuestion(state.ids)
        case SEED_QUESTIONS:
            return initializeQuestionState(action.payload);
        default:
            return state;
    }
}