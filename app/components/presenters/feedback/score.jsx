import React from 'react'
import Badge from 'presenters/feedback/badge.jsx'

const renderBadges = (score, maxScore) => {
  let badges = []

  for (let i = 0; i < maxScore; i++) {
    let isFilled = (score > 0)
    badges.push(
      <Badge
        animationDelay={0}
        isFilled={isFilled}
        shouldAnimate={false}
        key={i}/>
    )
    score--
  }

  return badges
}

const score = props => (
  <div className="card score">
<div className="card__body">
  <p>
    Your Score Was {props.score} out of {props.maxScore}
  </p>
  <ul className="inline-list">
    { renderBadges(props.score, props.maxScore) }
  </ul>
  <button className="button" onClick={props.action}>Play Again!</button>
</div>
</div>
)

export default score
