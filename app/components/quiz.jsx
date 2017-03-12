import React from 'react';
import QuestionSet from './questions/question_set.jsx';
import { questions } from '../data/questions.js';
import { UPDATE_SCORE, RESET } from '../actions/actions';
import store from '../store';

export default class Quiz extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            score: store.getState().score,
            maxScore: store.getState().maxScore,
        }
    }
    
    componentDidMount(){
       this.unsubscribe = store.subscribe(() => {
           this.setState({score:store.getState().score});
       });
    }
    
    componentWillUnmount(){
        //this.unsubscribe();
    }
        
    setScore(score){
        store.dispatch({type:UPDATE_SCORE,payload:{
                increment:score
           }
        });
    }

    reset(){
        store.dispatch({type:RESET});
    }

    render(){
   return (
            <div>
                <QuestionSet  setScore = {this.setScore.bind(this)}
                    questions = { questions }/>
            </div>
        );
    }
}