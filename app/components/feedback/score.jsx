import React from 'react';

export class Score extends React.Component{
    
    /**
     * 
     * @returns {Score.render.badges|String}
     */
    render(){
        let badges = this.getBadges(this.props.score,this.props.maxScore);

        return(
            <ul className = 'score inline-list'>
                {badges}
            </ul>
        );
    }
    
    /**
     * 
     * @param {type} score
     * @param {type} maxScore
     * @returns {Score.getBadges.badges}
     */
    getBadges(score,maxScore){

        let badges =[];

        for(let i = 0 ; i < maxScore ; i++){
            let appendClasses = (score < 1) ? "badge badge--empty" : 'badge';
            badges.push(<li className = {appendClasses}></li>);
            score--;
        }

        return badges;
    }
    
}