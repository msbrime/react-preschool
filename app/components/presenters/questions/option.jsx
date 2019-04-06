import React from 'react';

const option = ({value, clickHandler, disabled}) => {
   
    const [disabledClass, handler] = (disabled) ? 
    ['option-list__item--incorrect',() => {}] : 
    ['', clickHandler, null];
    
    return (
        <li className = {['option-list__item',disabledClass].join(" ")}
            onClick ={handler}>
            {value}
        </li>
    );
};

export default option;