import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from 'containers/private-route.jsx'
import Welcome from 'pages/welcome.jsx'
import Quiz from 'pages/quiz.jsx'
import Score from 'pages/score.jsx'
import SignIn from 'pages/auth.jsx'
import AdminIndex from 'pages/admin/index.jsx'
import AuthContext from 'context/auth.js'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: true
    }
  }

  componentDidMount () {
    // firebase().auth().signOut()
    // firebase().auth().onAuthStateChanged(
    //   this.handleAuthStateChange.bind(this)
    // )
  }

  // loginHandler (email, password) {
  //   firebase().auth().signInWithEmailAndPassword(email, password)
  // }

  // logoutHandler () {
  //   firebase().auth().signOut()
  // }

  // handleAuthStateChange (user) {
  //   if (user) {
  //     return this.setState({
  //       authenticated: true
  //     })
  //   }

  //   this.setState({
  //     authenticated: false
  //   })
  // }

  render () {
    return (
      <AuthContext.Provider value={{ login: this.loginHandler, logout: this.logoutHandler, isAuthenticated: this.state.authenticated }}>
        <Switch>
          <Route exact path={['/', '/welcome']} component={Welcome} />
          <Route path="/quiz" component = {Quiz} />
          <Route path="/score" component = {Score} />
          <Route path="/login" component = {SignIn} />
          <PrivateRoute path='/admin'
            component = {AdminIndex}
            isAuthenticated={this.state.authenticated}
            redirectPath='/login' />
        </Switch>
      </AuthContext.Provider>
    )
  }
}
