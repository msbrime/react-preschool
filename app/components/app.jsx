import React from 'react';
import { QuestionSet } from './question_set.jsx';
import { questions } from '../data/questions';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<QuestionSet questions = { questions } />);
    }
}