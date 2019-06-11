import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function privateRoute ({ component: Component, isAuthenticated, redirectPath, ...rest }) {
  console.log(isAuthenticated)
  return (
    <Route {...rest} render = { props => (
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{
          pathname: redirectPath,
          referrer: props.location
        }} />
    )} />
  )
}
