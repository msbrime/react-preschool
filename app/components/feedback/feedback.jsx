import React from 'react';
import { narrations } from '../../util';

export default class Feedback extends React.Component {

    constructor(props){
        super(props);
        this.badgeDelay = 0.5;
    }
    
    /**
     * 
     */
    renderBadges(){
        let badges = [];
        
        for(let i = 1; i <= this.props.badges; i++){
            let animationDelay = {
                animationDelay :  `${ i * this.badgeDelay }s`
            }

            badges.push(
                <span className="badge animated bounceIn" 
                      style = { animationDelay } >
                </span>
            );
        }
        
        return badges;
    }

    render(){

        let badges = this.renderBadges();
        return(
            <div className = 'feedback clearfix animated fadeIn'>
                <p>{ (this.props.badges > 0) ? 
                      narrations.right : 
                      narrations.wrong }
                </p>
                
                <p>{this.props.text}</p>
                
                <div className="question__score text-center">
                    { badges }
                </div>
                
                <button className = 'question__explanation-close circular right'
                    onClick = { this.props.action }>
                    OK!
                </button>
            </div>
        )
    }
}