import React from 'react';

const badge = ({animationDelay,isFilled = true,shouldAnimate = true}) => {
    let classes = ['star'],
        style = {};

    if(isFilled){
        classes.push('star--filled');
    }

    if(shouldAnimate){
        classes.push('spin-in');
        style.animationDelay = animationDelay;
    }

    return(
        <li className={classes.join(" ")} style = {style}>
            <i><svg viewBox="0 0 51 48" vectorEffect="non-scaling-stroke">
                <use xlinkHref="#star" x="0" y="1" />
            </svg></i>
        </li>
    );
}


export default badge;