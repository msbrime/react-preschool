import React from 'react';
import Question from '../components/questions/question.jsx';
import { REDUCE_TRIES , SET_QUESTION , UPDATE_SCORE , RESET, SHOW_FEEDBACK,HIDE_FEEDBACK, SET_ANSWERED } from '../actions/actions';
import store from '../store';

export default class QuestionSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = store.getState().questions;
    }
    
    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState().questions); 
        });
    }
    
    componentWillUnmount(){
        this.unsubscribe();
    }

    checkAnswer(answer){

        if(this.isCorrectAnswer(answer)){
           this.updateScore();
           this.setAsAnswered();
        }
        else{
            this.reduceTries(answer);
        }
    }
    
    updateScore(){
        let _self = this;
        store.dispatch({
            type: UPDATE_SCORE,
            payload:{
                increment: _self.state.current.triesLeft
            }
        });         
    }
    
    
    setAsAnswered(){
        store.dispatch({
            type: SET_ANSWERED
        });        
    }
    
    nextQuestion(){
        if(store.getState().questions.remaining > 0){
            store.dispatch({
                    type: SET_QUESTION
                }
            );
        }
        else{
            this.reset();
        }
    }

    reduceTries(attempt){
        store.dispatch({type:REDUCE_TRIES,payload:{attempt:attempt}}); 
    }


    isCorrectAnswer(answer){
        return this.state.current.answer === answer;
    }

    reset(){
        store.dispatch({type: RESET});
    }

    render() {
        console.log(store.getState());
            return (
                <div className = 'question-set'>
                    <Question
                        question = { this.state.current }
                        checkAnswer = { this.checkAnswer.bind(this) }
                        nextQuestion = { this.nextQuestion.bind(this) }
                        showFeedback = { this.state.current.triesLeft == 0 || this.state.current.answered  }
                    />
                </div>
            );
    }
}