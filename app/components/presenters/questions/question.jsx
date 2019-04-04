import React from 'react';

const question = ({question}) => {

    return(
        <div className="question__body__face question__body__face--front">
            <div className="question__image" style={{backgroundImage:`url(${question.resource.url})`}} />
            <p className="question__wording">{question.question}</p>
        </div>
    );
}

export default question;