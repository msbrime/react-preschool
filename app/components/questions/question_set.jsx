import React from 'react';
import Question from './question.jsx';
import { REDUCE_TRIES , SET_QUESTION , UPDATE_SCORE , RESET, SHOW_FEEDBACK,HIDE_FEEDBACK } from '../../actions/actions';
import store from '../../store';

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
           this.showFeedback();
        }
        else{
            this.reduceTries();
        }
    }
    
    updateScore(){
    store.dispatch({
            type: UPDATE_SCORE,
            payload:{
                increment: store.getState().questions.tries
        }}
     );         
    }
    
    showFeedback(){
        
        store.dispatch({
            type:SHOW_FEEDBACK
        });
        
    }
    
    hideFeedback(){
        store.dispatch({
            type:HIDE_FEEDBACK
        });
    }
    
    nextQuestion(){
        
        if(store.getState().questions.remaining > 0){
            this.hideFeedback();
            this.updateScore();
            store.dispatch({
                    type: SET_QUESTION
                }
            );
        }
        else{
            this.reset();
        }
    }

    reduceTries(){
        if( store.getState().questions.tries > 0){
            store.dispatch({type:REDUCE_TRIES})
        }
        else{
            this.showFeedback();
        }

    }

    showAnswer(){
        alert(store.getState().questions.current.explanation);
    }

    isCorrectAnswer(answer){
        return store.getState().questions.current.answer === answer;
    }

    reset(){
        store.dispatch({type: RESET});
    }

    render() {
        console.log(store.getState());
            return (
                <div className = 'question-set'>
                    <Question
                        question = {this.state.current}
                        shouldAnimate = {this.state.shouldAnimate}
                        answered = {store.getState().feedback}
                        triesLeft = {this.state.tries}
                        checkAnswer = {this.checkAnswer.bind(this)}
                        nextQuestion = {this.nextQuestion.bind(this)}
                    />
                </div>
            );
    }
}