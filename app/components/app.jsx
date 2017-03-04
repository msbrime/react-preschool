import React from 'react';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);

        // let maxScore = this.getMaxScore(questions);
        // this.state = {
        //     score:0,
        //     maxScore:maxScore,
        // }
    }

    // setScore(score){
    //     let newScore = score + this.state.score
    //     this.setState({score: newScore });
    // }

    // getMaxScore(questions){

    //     return questions.reduce((acc,question) => {
    //         return acc + ( question.options.length - 1 );
    //     },0);

    // }

    // reset(){
    //     this.setState({
    //         score:0
    //     });
    // }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}