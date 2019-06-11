import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import App from 'components/app.jsx';
import Welcome from 'pages/welcome.jsx'
import Quiz from 'pages/quiz.jsx'
import Score from 'pages/score.jsx'
import Contribute from 'pages/contribute.jsx'


function PrivateRoute(component) => {
    
}


export default (
  <Switch>
    <Route path="/welcome" component = {Welcome} />
    <Route path="/quiz" component = {Quiz} />
    <Route path="/score" component = {Score} />
    <Route path="/contribute" component = {Contribute} />
  </Switch>
)


