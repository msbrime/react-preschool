import React from 'react';
import Option from './option.jsx'
import Feedback from '../feedback/feedback.jsx';
import { animations,getRandomIndex } from '../../util';

export default class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps,nextState){
        return true;
        // return nextProps.shouldAnimate || nextProps.answered;
    }

    renderOptions(){
        return this.props.question.options.map(option => {
            return (
                <Option option = {option} clickHandler = { this.props.checkAnswer } />
            );
        });
    }

    setEntranceAnimation(){
        let animation = animations[getRandomIndex(animations)];
        return {
            animation : `${animation} 1.5s`
        };
    }

    // speak(text){
    //     let textToSpeech = new SpeechSynthesisUtterance(text);
    //     speechSynthesis.speak(textToSpeech);
    // }

    render() {
        let imageEnterAnimation = (this.props.answered) ? {} : this.setEntranceAnimation();

        return (
            <div className = 'question'>
                <p className = 'question__heading'>{this.props.question.question}</p>

                <div className = 'question__image-holder'>
                    <Feedback triesLeft = {this.props.triesLeft} active = {this.props.answered}
                        explanation = {this.props.question.explanation} next = {this.props.nextQuestion} />
                    <img className = 'question__image' style = {imageEnterAnimation} src = {this.props.question.resource.url}/>
                </div>

                <ul className = 'question__otpion-list no-bullet clearfix'>
                    {this.renderOptions()}
                </ul>
            </div>
        )
    }


}