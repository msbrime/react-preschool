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
  <ul className="inline-list">
    { renderBadges(props.score, props.maxScore) }
  </ul>
)

export default score
