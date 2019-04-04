import React from 'react';

const badge = ({animationDelay}) => (
    <li className="rating rating--filled spin-in" style = { animationDelay }>
        <i><svg viewBox="0 0 51 48" vectorEffect="non-scaling-stroke">
            <use xlinkHref="#star" x y={1} />
        </svg></i>
    </li>
);

export default badge;