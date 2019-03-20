import * as ACTIONS from 'actions/actions';

export function incrementScore(increment) {
    return {
        type: ACTIONS.INCREMENT_SCORE,
        payload: {
            increment: increment
        }
    };
}

export function markAsAnswered() {
    return {
        type: ACTIONS.MARK_AS_ANSWERED
    }
}

export function nextQuestion() {
    return {
        type: ACTIONS.NEXT_QUESTION
    };
}

export function reduceTries(optionId) {
    return {
        type: ACTIONS.REDUCE_TRIES,
        payload: { attempt: optionId}
    };
}

export function reset() {
    return {
        type: ACTIONS.RESET
    };
}

export function seedQuestions(questions) {
    return {
        type: ACTIONS.SEED_QUESTIONS,
        payload: {
            questions: questions
        }
    }
}

export function setMaxScore(maxScore) {
    return {
        type: ACTIONS.SET_MAX_SCORE,
        payload: {
            score: maxScore
        }        
    };
} 