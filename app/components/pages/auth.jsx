import React, { Component } from 'react'
import SignIn from 'containers/sign-in.jsx'

export default class Auth extends Component {
  render () {
    return (
      <SignIn location={this.props.location}/>
    )
  }
}
