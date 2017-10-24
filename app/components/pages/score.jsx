import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reset } from 'actions/creators';
import { default as ScoreView } from 'presenters/feedback/score.jsx';

class Score extends React.Component{
    
    reset(){
        this.props.router.push("/quiz");
        this.props.resetScore();
    }
    
    render(){
        return(
            <div className="welcome">
                
                <p className="welcome-message">
                    Your Score Was {this.props.score} out of {this.props.maxScore}
                </p>
                <ScoreView score = { this.props.score } 
                       maxScore = { this.props.maxScore } ></ScoreView> 
                <button onClick = {this.reset.bind(this)}>Play Again!</button>
            </div>
        );
    }

}

let mapStateToProps = state => {
   return {
       score: state.score.score,
       maxScore : state.score.maxScore
   };
};

let mapDispatchToProps = dispatch => ({
   resetScore : () => { dispatch(reset()) }
});

export default withRouter(
    connect(mapStateToProps,mapDispatchToProps)(Score)
);
