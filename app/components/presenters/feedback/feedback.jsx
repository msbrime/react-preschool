import React from 'react';
import { narrations } from 'util.js';
import Badge from 'presenters/feedback/badge.jsx';

const renderBadges = badgeCount => {
    let 
        badges = [],
        delayMultiplier = 0.5;
    
    for(let i = 1; i <= badgeCount; i++){
        let animationDelay = {
            animationDelay :  `${ i * delayMultiplier }s`
        }
        badges.push(<Badge animationDelay={animationDelay} key={i}/>);
    }
    
    return badges;
}

const feedback = props => {
    if(!props.active){
        return null
    }

    return (
        <div className = 'feedback clearfix animated fadeIn'>
            <p>{ (props.score > 0) ? narrations.right : narrations.wrong }</p>
            <p>{props.text}</p> 
            <div className="question__score text-center">
                { renderBadges(props.score) }
            </div>   
            <button className = 'question__explanation-close circular right'
                onClick = { props.action }>
                OK!
            </button>
        </div>
    );
}

export default feedback;