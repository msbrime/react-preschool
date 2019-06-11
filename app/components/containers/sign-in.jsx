import React, { Component } from 'react'
import AuthContext from 'context/auth.js'
import DebounceInput from 'presenters/form/debounce.jsx'
import { Redirect } from 'react-router-dom'

export default class SignIn extends Component {
  static contextType = AuthContext;
  
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isAuthenticating: false,
      isDeauthenticating: false
    }
    this.handleEmailChanged = 
      this.handleEmailChanged.bind(this);
    this.handlePasswordChanged = 
      this.handlePasswordChanged.bind(this);
  }

  login () {
    this.context.login(
      this.state.email,
      this.state.password
    )
  }

  logout () {
    this.context.logout()
  }

  updateEmail(email){
    this.setState({email})
  }

  updatePassword(password){
    this.setState({password})
  }

  handleEmailChanged(event){
    this.updateEmail(event.target.value)
  }

  handlePasswordChanged(event){
    this.updatePassword(event.target.value)
  }

  render () {
    // if(this.context.isAuthenticated) {
    //   const redirectPath = this.props.location.referrer || '/'
    //   return <Redirect to={redirectPath} />
    // }
    return (
      <div className="card form">
        <div className="card__body">
          <p>Login Biaaatch</p>
          <form action="#">
            <div className="form-segment">
              <label htmlFor="">email</label>
              <DebounceInput onChange={this.handleEmailChanged}>
                <input name='email'
                  placeholder='email@address.com'
                  className="input"
                  type="text"
                  defaultValue={this.state.email}
                  autoComplete="off" />
              </DebounceInput>
            </div>
            <div className="form-segment">
              <label htmlFor="">password</label>
              <DebounceInput onChange={this.handlePasswordChanged}>
                <input name="password"
                  placeholder='password'
                  className="input"
                  type="password"
                  defaultValue={this.state.password}
                  autoComplete="off" />
              </DebounceInput>
            </div>
            <button className='button' type='button' onClick={this.login.bind(this)}>Login biaatch</button>
            <button className='button' type='button' onClick={this.logout.bind(this)}>Logout biaatch</button>
          </form>
        </div>
      </div>
    )
  }
}
