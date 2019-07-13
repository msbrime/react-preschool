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
    this.handleFieldChanged = 
      this.handleFieldChanged.bind(this);  }

  login () {
    this.context.login(
      this.state.email,
      this.state.password
    )
  }

  handleFieldChanged(event){
    const {name, value} = event.target;
    this.updateField(name,value);
  }

  updateField(name, updatedValue){
    this.setState({[name]: updatedValue})
  }

  handleFormSubmission(event){
    event.preventDefault();
    this.setState({isAuthenticating:true})
    this.login();
  }

  render () {
    if(this.context.isAuthenticated) {
      const redirectPath = this.props.location.referrer || '/admin'
      return <Redirect to={redirectPath} />
    }
    return (
      <div className="card form signin">
        <div className="card__body">
          <form action="#" 
            onSubmit={this.handleFormSubmission.bind(this)} 
            method='POST'>
            <div className="form-segment form-segment--full">
              <label htmlFor="">email</label>
              <DebounceInput onChange={this.handleFieldChanged}>
                <input name='email'
                  placeholder='email@address.com'
                  className="input"
                  type="text"
                  defaultValue={this.state.email}
                  autoComplete="off" />
              </DebounceInput>
            </div>
            <div className="form-segment form-segment--full">
              <label htmlFor="">password</label>
              <DebounceInput onChange={this.handleFieldChanged}>
                <input name="password"
                  placeholder='password'
                  className="input"
                  type="password"
                  defaultValue={this.state.password}
                  autoComplete="off" />
              </DebounceInput>
            </div>
            <div className="form-segment form-segment--full">
              <button className='button' 
                type='submit' 
                onClick={this.login.bind(this)}>
                  Login
              </button>
            </div>

          </form>
        </div>
      </div>
    )
  }
}
