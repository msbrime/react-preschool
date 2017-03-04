import React from 'react';
import { Router, Route , IndexRoute , hashHistory } from 'react-router';
import App from './components/app.jsx';
import Welcome from './components/welcome.jsx';
import QuestionSet from './components/questions/question_set.jsx';

export default (
    <Router  history={hashHistory} >
        <Route path = '/' component={App}>
            <IndexRoute component = {Welcome} />
            <Route path="/welcome" component = {Welcome} />
            <Route path="/quiz" component = {QuestionSet} />
        </Route>
    </Router>
);