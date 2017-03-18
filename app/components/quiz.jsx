import React from 'react';
import QuestionSet from '../containers/question_set.jsx';
import { questions } from '../data/questions.js';
import store from '../store';

export default class Quiz extends React.Component {

  render(){
        return (
                 <div>
                     <QuestionSet />
                 </div>
             );
    }
}