import React from 'react';

export default class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let options = this.props.options.map(option => {
            return (
                <li
                    onClick = {() =>  this.props.checkAnswer(option)}
                    className = 'question-option'>
                    {option}
                </li>
            );
        })
        return (
            <div>

                <p>{this.props.question}</p>

                <img src = {this.props.resourceUrl}/>

                <ul className = 'otpions-list'>
                    {options}
                </ul>

            </div>
        )
    }
}