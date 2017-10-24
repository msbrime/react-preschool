import React from 'react';

let Option = ({option,clickHandler,disabled}) => {
   
   let disabledClass = (disabled) ? 'question__option-item--disabled' : '';
    
    return (
        <li className = { `${disabledClass} question__option-item` }
            onClick = { () => { clickHandler(option) } } >
            {option}
        </li>
    );
};

export default Option;