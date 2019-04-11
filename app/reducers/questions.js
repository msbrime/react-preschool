import { 
    NEXT_QUESTION, 
    RESET, 
    SEED_QUESTIONS
} from 'actions/actions';

function randomItem(items){
    let index = Math.floor(Math.random() * Math.floor(items.length));
    return items[index];
}

function initializeQuestionState({questions, ids}){
    return { questions, ids, ...setQuestion(ids) }
}

function setQuestion(ids){
    let 
        current = randomItem(ids),
        unselected = ids.filter(value => value !== current);
    
    return { current, unselected }
}

let initialState = {
    questions: null,
    ids: null,
    unselected: [],
    current: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case NEXT_QUESTION:
            let newQuestion = setQuestion(state.unselected);
            return {...state,...newQuestion};
        case RESET:
            return initializeQuestionState(state);
        case SEED_QUESTIONS:
            return initializeQuestionState(action.payload);
        default:
            return state;
    }
}