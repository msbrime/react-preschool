import React from 'react';
import { QuestionSet } from './question_set.jsx';
import { Welcome } from './welcome.jsx';
import { ScoreCard } from './score_card.jsx';
import { questions } from '../data/questions';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        let maxScore = this.getMaxScore(questions);
        this.state = {
            score:0,
            maxScore:maxScore,
            playing:0
        }
    }

    play(){
        this.setState({playing:1});
    }

    showScore(){
        alert('now for your score');
        this.setState({playing:2});
    }

    setScore(score){
        let newScore = score + this.state.score
        this.setState({score: newScore });
    }

    getMaxScore(questions){

        return questions.reduce((acc,question) => {
            console.log(question);
            return acc + ( question.options.length - 1 );
        },0);

    }

    reset(){
        this.setState({
            score:0,
            playing:1
        });
    }

    render() {

        return (
            <div>
                <Welcome play = {this.play.bind(this)} visible = {this.state.playing == 0} />
                <QuestionSet showScore = {this.showScore.bind(this)} setScore = {this.setScore.bind(this)}
                    questions = { questions } visible = {this.state.playing == 1} />
                <ScoreCard reset = {this.reset.bind(this)} score = {this.state.score}
                    maxScore = {this.state.maxScore} visible = {this.state.playing == 2} />
            </div>
        );
    }
}