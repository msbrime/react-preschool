import React from 'react';
import  Question from './question.jsx';
import questions from '../data/questions';

export default class QuestionSet extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            questions : {
                answered : [],
                unanswered : questions,
                current : null
            }
        };
    }

    setQuestion(){

    }

    checkAnswer(){

    }

    moveToAnswered(){

    }

    render() {

        let questions = this.state.questions.map( (quest,index) => {
            return (
                <Question
                    key = {index}
                    question = {quest.question}
                    options = {quest.options}
                    resourceUrl = {quest.resource.url}
                />
            );
        });

        return (
            <ul className = 'question-set'>
                {questions}
            </ul>
        );
    }
}