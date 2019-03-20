import React from 'react';

const renderBadges = (score,maxScore) => {
    let badges =[];

    for(let i = 0 ; i < maxScore ; i++){
        let appendClasses = (score < 1) ? "badge badge--empty" : 'badge';
        badges.push(<li className = {appendClasses} key={i}/>);
        score--;
    }

    return badges;
}

const score = props => (
    <ul className = 'score inline-list'>
        { renderBadges(props.score, props.maxScore) }
    </ul>
);

export default score;