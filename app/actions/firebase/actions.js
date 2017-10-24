import * as firebase from 'firebase';
import config from './config';
import { seedQuestions,setMaxScore } from 'actions/creators';
import { getMaxScore } from 'util.js';

const 
    fb = firebase.initializeApp(config),
    questionsRef = fb.database().ref('questions');

export function fetchQuestions(){
    return function(dispatch){
            questionsRef.once('value',snapshot => {
                let maxScore = getMaxScore(snapshot.val());
                dispatch(seedQuestions(snapshot.val()));
                dispatch(setMaxScore(maxScore));
                //dispatch(listenForUpdates());  
            });
         
    };
}

function listenForUpdates(){
    return (dispatch) => {
       
            questions.on('child_changed',snapshot => {
            });
           
    };  
}