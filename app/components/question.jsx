import React from 'react';

export default class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let options = this.props.options.map(option => {
            return (
                <li className = 'question__option-item'
                    onClick = {() =>  this.props.checkAnswer(option)} >
                    {option}
                </li>
            );
        })
        return (
            <div className = 'question bounceInUp'>

                <p className = 'question__heading'>{this.props.question}</p>

                <img className = 'question__image flipInX' src = {this.props.resourceUrl}/>

                <ul className = 'question__otpion-list no-bullet clearfix'>
                    {options}
                </ul>

            </div>
        )
    }
}