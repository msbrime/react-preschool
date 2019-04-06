import React from 'react';
import { narrations } from 'util.js';
import Badge from 'presenters/feedback/badge.jsx';

const renderBadges = badgeCount => {
    let 
        badges = [],
        delayMultiplier = 0.3;
    
    for(let i = 1; i <= badgeCount; i++){
        let animationDelay = `${ (i * delayMultiplier) }s`;
        badges.push(<Badge animationDelay={animationDelay} key={i}/>);
    }
    
    return badges;
}

const feedback = props => {
    if(!props.active){
        return(
            <div className="card__face card__face--back" />
        );
    }

    return (
        <div className="card__face card__face--back">
            <div className="card__body">
                <p className="question__narration">
                    { (props.score > 0) ? narrations.right : narrations.wrong }
                </p>
                <p>{props.text}</p>
                <ul className="question__score inline-list">
                    { renderBadges(props.score) }
                </ul>   
                <button className = 'button'
                    onClick = { props.action }>
                    next
                </button>        
            </div>
        </div>
    );
}

export default feedback;