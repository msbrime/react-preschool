import React from 'react';

const option = ({value, clickHandler, disabled}) => {
   
    const [disabledClass, handler] = (disabled) ? 
    ['question__option--incorrect',() => {}] : 
    ['', clickHandler, null];
    
    return (
        <li className = {`${disabledClass} question__option`}
            onClick ={handler}>
            {value}
        </li>
    );
};

export default option;