import React from 'react';
import  Question from './question.jsx';


export class QuestionSet extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.setQuestion(this.props.questions);
    }

    setQuestion(questionArray,answeredQuestion){

        let
            answered = (this.state) ? this.state.questions.answered : [],
            currentIndex = this.getRandomIndex(questionArray),
            current = questionArray[currentIndex],
            unanswered = questionArray.filter((question,index) =>{
                return index !== currentIndex;
                }
            );

       if(answeredQuestion){
           answered.push(answeredQuestion);
       }

        return {
            questions : {
                answered : answered,
                current : current,
                unanswered : unanswered
            }
        };

    }

    getRandomIndex(elementArray){
        return Math.floor(Math.random()*elementArray.length);
    }

    checkAnswer(answer){

        if(this.isCorrectAnswer(answer)){

            if(this.state.questions.unanswered.length > 0){

                let newState = this.setQuestion(
                    this.state.questions.unanswered,
                    this.state.questions.current
                );

                this.setState(newState);

            }
            else{
                this.onReset();
            }
        }

    }

    isCorrectAnswer(answer){
        return this.state.questions.current.answer === answer;
    }

    onReset(){
            let newState = this.setQuestion(this.props.questions);
            console.log(newState);
            newState.questions.answered = [];
            this.setState(newState);
    }

    render() {

        return (
            <div className = 'question-set'>
                <Question
                    checkAnswer = {this.checkAnswer.bind(this)}
                    key = {this.state.questions.current.id}
                    question = {this.state.questions.current.question}
                    options = {this.state.questions.current.options}
                    resourceUrl = {this.state.questions.current.resource.url}
                />
            </div>
        );
    }
}