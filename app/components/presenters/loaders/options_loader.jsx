import React from 'react';

const option = () => <li className = "question__option loader" />

const renderOptions = () => {
    return [1,2,3,4].map(option)
}

const optionsLoader = () => {
    return (
        <ul className="question__options">
            {renderOptions()}
        </ul>
    );
}

export default optionsLoader;