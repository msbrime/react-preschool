import React from 'react';
import { Route , IndexRoute } from 'react-router';
import App from './components/app.jsx';
import Welcome from './components/welcome.jsx';
import Quiz from './components/quiz.jsx';


export default (
        <Route path = '/' component={App}>
            <IndexRoute component = {Welcome} />
            <Route path="/welcome" component = {Welcome} />
            <Route path="/quiz" component = {Quiz} />
        </Route>
);