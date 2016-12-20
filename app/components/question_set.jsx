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
            unanswered = questionArray.filter((question,index) => {
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
            },
            tries : current.options.length - 1,
            shouldAnimate:true
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
                this.reset();
            }
        }
        else{
            this.reduceTries();
        }

    }

    reduceTries(){
        var tries = this.state.tries;
        tries--;
        if(tries == 0){
            this.showAnswer();
        }
        else{
            this.setState({tries:tries,shouldAnimate:false});
        }
    }

    showAnswer(){
        alert(this.state.questions.current.explanation);
    }

    isCorrectAnswer(answer){
        return this.state.questions.current.answer === answer;
    }

    reset(){
            let newState = this.setQuestion(this.props.questions);
            newState.questions.answered = [];
            this.setState(newState);
    }

    render() {
        console.log(this.state);
        return (
            <div className = 'question-set'>
                <Question
                    checkAnswer = {this.checkAnswer.bind(this)}
                    key = {this.state.questions.current.id}
                    question = {this.state.questions.current}
                    shouldAnimate = {this.state.shouldAnimate}
                />
            </div>
        );
    }
}