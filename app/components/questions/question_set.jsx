import React from 'react';
import Question from './question.jsx';

export default class QuestionSet extends React.Component {

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
            shouldAnimate:true,
            answered:false
        };

    }

    getRandomIndex(elementArray){
        return Math.floor(Math.random()*elementArray.length);
    }

    checkAnswer(answer){

        if(this.isCorrectAnswer(answer)){
            this.props.setScore(this.state.tries);
            this.setState({
                shouldAnimate:false,
                answered:true
            });
        }
        else{
            this.reduceTries();
        }

    }

    nextQuestion(){
        if(this.state.questions.unanswered.length > 0){

            let newState = this.setQuestion(
                this.state.questions.unanswered,
                this.state.questions.current
            );

            this.setState(newState);
        }
        else{
            this.props.showScore();
        }
    }

    reduceTries(){
        if(this.state.answered) return;
        var tries = this.state.tries;
        tries--;
        if(tries <= 0){
            this.setState({
                tries:tries,
                shouldAnimate:false,
                answered:true
            });
        }
        else{
            this.setState({
                tries:tries,
                shouldAnimate:false,
                answered:false
            });
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

    componentDidUpdate(prevProps, prevState) {
      if(!this.props.visible){
          this.reset();
      }
   }

    render() {


            return (
                <div className = 'question-set'>
                    <Question
                        key = {this.state.questions.current.id}
                        question = {this.state.questions.current}
                        shouldAnimate = {this.state.shouldAnimate}
                        answered = {this.state.answered}
                        triesLeft = {this.state.tries}
                        checkAnswer = {this.checkAnswer.bind(this)}
                        nextQuestion = {this.nextQuestion.bind(this)}
                    />
                </div>
            );

    }
}