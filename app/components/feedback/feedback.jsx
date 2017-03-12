import React from 'react';

export default class Feedback extends React.Component {

    constructor(props){
        super(props);
      
        this.narrations = {
            wrong : "Oh no! You got this one wrong",
            right : "That's Right!"
        };

        this.badgeDelay = 0.5;
    }

    render(){

        let badges = [],
        active = (this.props.active) ? "active" : "";

        for(let i = 1; i <= this.props.triesLeft; i++){
            let animationDelay = {
                animationDelay :  i * this.badgeDelay + 's'
            }

            badges.push(
                <span className="badge animated bounceIn" style = {animationDelay}></span>
            );
        }

        return(
            <div className = {'question__explanation clearfix ' + active }>
                <p>{ (this.props.triesLeft > 0) ? this.narrations.right : this.narrations.wrong }</p>
                <p>{this.props.explanation}</p>
                <div className="question__score text-center">
                    {this.props.active ? badges : false}
                </div>
                <button className = 'question__explanation-close circular right'
                    onClick = {() =>  this.props.next()}>
                    OK!
                </button>
            </div>
        )
    }
}