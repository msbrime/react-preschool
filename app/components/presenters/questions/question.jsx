import React from 'react';
import Option from './option.jsx';
import { animations, getRandomIndex, contains } from 'util.js';

export default class Question extends React.Component {
    
    /**
     * 
     */
    renderOptions() {
        return this.props.question.options.map( (option,index) => {
            let 
                clickHandler = () => {},
                disabled = true;
            
            if (this.optionShouldBeEnabled(option)) {
                clickHandler = this.props.optionClickHandler;
                disabled = false;
            }
            
            return (
                <Option key = {index} option = {option} 
                        clickHandler = {clickHandler} 
                        disabled = {disabled} 
                />
            );
        
        });
    }
    
    /**
     * 
     */
    optionShouldBeEnabled(option){
       return ( !contains(this.props.question.attempts, option) && 
                !this.props.question.answered );  
    }    
    
    /**
     * 
     */
    setImageEnterAnimation(shouldAnimate) {
        if(shouldAnimate){
            let animation = animations[getRandomIndex(animations)];
            return { animation: `${animation} 1.5s` };
        }
        return {};
    }

    render() {
        let 
            imageEnterAnimation = this.setImageEnterAnimation(
                this.props.question.animate
            ); 

        return(
                <div className = 'question'>
                    
                    <p className = 'question__heading'>
                        {this.props.question.question}
                    </p>
                
                    <div className = 'question__image-holder'>
                        
                        <img className = 'question__image' 
                             style = { imageEnterAnimation } 
                             src = { this.props.question.resource.url }
                        />
                        
                    </div>
                
                    <ul className = 'question__option-list no-bullet clearfix'>
                        {this.renderOptions()}
                    </ul>
                
                </div>
        );
    }
}