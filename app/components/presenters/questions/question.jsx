import React from 'react';
import { animations, getRandomIndex } from 'util.js';

const imageEnterAnimation = () => {
    let animation = animations[getRandomIndex(animations)];
    return { animation: `${animation} 1.5s` };
}

const question = ({animate, question, children}) => {
    let animation = animate ? 
        imageEnterAnimation() : {} 

    return(
        <div className = 'question'>   
            <p className = 'question__heading'>
                {question.question}
            </p>
            <div className = 'question__image-holder'> 
                <img className = 'question__image' 
                     style = { animation } 
                     src = { question.resource.url }
                /> 
            </div>
            {children}
        </div>
    );
}

export default question;