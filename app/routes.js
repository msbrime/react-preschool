import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Welcome from 'pages/welcome.jsx'
import Quiz from 'pages/quiz.jsx'
import Contribute from 'pages/contribute.jsx'

export default (
  <Switch>
    <Route path="/welcome" component = {Welcome} />
    <Route path="/quiz" component = {Quiz} />
    <Route path="/contribute" component = {Contribute} />
  </Switch>
)
