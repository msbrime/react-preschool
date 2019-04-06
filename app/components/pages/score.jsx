import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reset } from 'actions/creators';
import ScoreView from 'presenters/feedback/score.jsx';

class Score extends React.Component{
    
    reset(){
        this.props.router.push("/quiz");
        this.props.resetScore();
    }
    
    render(){
        return(
            <div className="card score">
                <div className="card__body">
                    <p>
                        Your Score Was {this.props.score} out of {this.props.maxScore}
                    </p>
                    <ScoreView score = { this.props.score } 
                        maxScore = { this.props.maxScore } ></ScoreView> 
                    <button className="button" onClick = {this.reset.bind(this)}>Play Again!</button>
                </div>
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
