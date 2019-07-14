import React from 'react'
import Badge from '../badge.jsx'
import renderer from 'react-test-renderer'

it('renders a badge with the appropriate classes', () => {
  const component = renderer.create(<Badge animationDelay='0.5s' isFilled={true} shouldAnimate={true} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}
)
