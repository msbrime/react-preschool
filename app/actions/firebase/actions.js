import { seedQuestions,setMaxScore } from 'actions/creators';
import {load as loadQuestions} from 'services/questions';

export function fetchQuestions(){
    return dispatch => {
        loadQuestions( questionData => {
            let {questions,ids,maxScore} = questionData;
            dispatch(seedQuestions(questions,ids));
            dispatch(setMaxScore(maxScore));   
        });
    }
}

function listenForUpdates(){
    return (dispatch) => {
       
            questions.on('child_changed',snapshot => {
            });
           
    };  
}