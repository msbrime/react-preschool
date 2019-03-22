import React from 'react';

const option = ({value, clickHandler, disabled}) => {
   
    const [disabledClass, handler] = (disabled) ? 
    ['question__option-item--disabled',() => {}] : 
    ['', clickHandler];
    
    return (
        <li className = {`${disabledClass} question__option-item`}
            onClick ={handler}>
            {value}
        </li>
    );
};

export default option;