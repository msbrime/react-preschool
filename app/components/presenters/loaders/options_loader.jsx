import React from 'react';

const option = () => <li className = "option-list__item loader" />

const renderOptions = () => {
    return [1,2,3,4].map(option)
}

const optionsLoader = () => {
    return (
        <ul className="option-list">
            {renderOptions()}
        </ul>
    );
}

export default optionsLoader;