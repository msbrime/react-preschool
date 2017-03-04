import React from 'react';
import Feedback from '../feedback/feedback.jsx';

export default class Question extends React.Component {

    constructor(props) {
        super(props);

        this.animations = [
            'zoomIn','flipInY',
            'fadeIn','bounceIn',
            'flipInX','lightSpeedIn'
        ];
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.shouldAnimate || nextProps.answered;
    }

    renderOptions(){
        let options = this.props.question.options.map(option => {
            return (
                <li className = 'question__option-item'
                    onClick = { () =>  this.props.checkAnswer(option)} >
                    {option}
                </li>
            );
        });

        return options;
    }

    setEntranceAnimation(){
        let animation = this.animations[Math.floor(Math.random()*this.animations.length)];
        return {
            animation : `${animation} 1.5s`
        };
    }

    speak(text){
        let textToSpeech = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(textToSpeech);
    }

    render() {
        let
            options = this.renderOptions(),
            imageEnterAnimation = (this.props.answered) ? {} : this.setEntranceAnimation();

        return (
            <div className = 'question'>
                <p className = 'question__heading'>{this.props.question.question}</p>

                <div className = 'question__image-holder'>
                    <Feedback triesLeft = {this.props.triesLeft} active = {this.props.answered}
                        explanation = {this.props.question.explanation} next = {this.props.nextQuestion} />
                    <img className = 'question__image' style = {imageEnterAnimation} src = {this.props.question.resource.url}/>
                </div>

                <ul className = 'question__otpion-list no-bullet clearfix'>
                    {options}
                </ul>
            </div>
        )
    }

    componentDidMount(){
        this.speak(this.props.question.question);
    }

}