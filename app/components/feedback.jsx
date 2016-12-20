import React from 'react';

export default class Feedback extends React.Component {

    constructor(props){
        super(props);

        this.narrations = {
            wrong : "Oh no! You got this one wrong",
            right : "That's Right!"
        };
    }

    render(){

        let badges = [],
        active = (this.props.active) ? "active" : "";

        for(let i = 0; i < this.props.triesLeft; i++){
            badges.push(<span className="badge"></span>);
        }

        return(
            <div className = {'question__explanation clearfix ' + active }>
                <p>{ (this.props.triesLeft > 0) ? this.narrations.right : this.narrations.wrong }</p>
                <p>{this.props.explanation}</p>
                <div className="question__score text-center">
                    {badges}
                </div>
                <button className = 'question__explanation-close circular right'
                    onClick = {() =>  this.props.next()}>
                    OK!
                </button>
            </div>
        )
    }



}