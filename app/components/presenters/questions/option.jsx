import React from 'react';

const option = ({value, clickHandler, disabled}) => {
   
   let disabledClass = (disabled) ? 'question__option-item--disabled' : '';
    
    return (
        <li className = {`${disabledClass} question__option-item`}
            onClick ={clickHandler}>
            {value}
        </li>
    );
};

export default option;