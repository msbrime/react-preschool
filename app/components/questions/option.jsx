import React from 'react';

let Option = ({option,clickHandler}) => {
    return (
        <li className = 'question__option-item'
            onClick = {() => { clickHandler(option) } } >
            {option}
        </li>
    );
};

export default Option;