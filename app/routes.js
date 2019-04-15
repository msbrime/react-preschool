import React from 'react';
import { Route , IndexRoute } from 'react-router';
import App from 'components/app.jsx';
import Welcome from 'pages/welcome.jsx';
import Quiz from 'pages/quiz.jsx';
import Score from 'pages/score.jsx';
import Contribute from 'pages/contribute.jsx';

export default (
    <Route path = '/' component={App}>
        <IndexRoute component = {Welcome} />
        <Route path="/welcome" component = {Welcome} />
        <Route path="/quiz" component = {Quiz} />
        <Route path="/score" component = {Score} />
        <Route path="/contribute" component = {Contribute} />
    </Route>
);