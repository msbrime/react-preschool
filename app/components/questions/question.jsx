import React from 'react';
import Option from './option.jsx';
import Feedback from '../feedback/feedback.jsx';
import { animations, getRandomIndex, contains } from '../../util';

export default class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    renderOptions() {
        return this.props.question.options.map(option => {
            let 
                clickHandler = undefined,
                disabled = true;
            if (!contains(this.props.question.attempts, option) && 
                !this.props.question.answered && 
                !this.props.showFeedback ) {
                clickHandler = this.props.checkAnswer;
                disabled = false;
            }
            
            return (
                <Option option = {option} 
                        clickHandler = {clickHandler} 
                        disabled = {disabled} 
                />
            );
        
        });
    }

    setEntranceAnimation() {
        let animation = animations[getRandomIndex(animations)];
        return {
            animation: `${animation} 1.5s`
        };
    }

    render() {
        let 
            imageEnterAnimation = (this.props.question.animate) ? 
                this.setEntranceAnimation() : 
                {};

        return (
                <div className = 'question'>
                    
                    <p className = 'question__heading'>
                        {this.props.question.question}
                    </p>
                
                    <div className = 'question__image-holder'>
                        
                        <Feedback triesLeft = { this.props.question.triesLeft } 
                            active = { this.props.showFeedback }
                            explanation = { this.props.question.explanation } 
                            next = { this.props.nextQuestion } 
                        />
                        
                        <img className = 'question__image' 
                             style = { imageEnterAnimation } 
                             src = { this.props.question.resource.url }
                        />
                        
                    </div>
                
                    <ul className = 'question__otpion-list no-bullet clearfix'>
                        {this.renderOptions()}
                    </ul>
                
                </div>
        );
    }
}