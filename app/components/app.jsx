import React from 'react';
import QuestionSet from './question_set.jsx';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<QuestionSet />);
    }
}