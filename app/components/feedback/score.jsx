import React from 'react';

export class Score extends React.Component{

    render(){
        let badges = this.getBadges(this.props.score,this.props.maxScore);

        return(
            <ul className = 'score inline-list'>
                {badges}
            </ul>
        );
    }

    getBadges(score,maxScore){

        let badges =[];

        for(let i = 0 ; i < maxScore ; i++){
            let appendClasses = 'badge';

            if(score < 1){
                appendClasses += " badge--empty";
            }

            badges.push(<li className = {appendClasses}></li>);
            score--;
        }

        return badges;
    }


}