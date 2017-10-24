import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchQuestions } from 'actions/firebase/actions';
import { 
    incrementScore,
    markAsAnswered,
    reset,
    nextQuestion,
    reduceTries
} from 'actions/creators';
import Feedback from 'presenters/feedback/feedback.jsx';
import Question from 'presenters/questions/question.jsx';


class QuestionSet extends React.Component {

    componentDidMount(){
       if(!!!this.props.questions){
            this.props.fetchQuestions();
        }
    }
       
    /**
     * 
     */
    checkAnswer(answer){
        if(this.isCorrectAnswer(answer)){
           this.incrementScore(this.props.questions.current.triesLeft);
           this.setAsAnswered();
        }
        else{
            this.reduceTries(answer);
        }
    }
    
    /**
     * 
     */
    incrementScore(increment){
        this.props.dispatch(incrementScore(increment));         
    }
    
    /**
     * 
     */
    setAsAnswered(){
        this.props.dispatch(markAsAnswered());        
    }
    
    /**
     * 
     */
    nextQuestion(){
        if(this.props.questions.remaining > 0){
            this.props.dispatch(nextQuestion());
        }
        else{
            this.props.router.push("/score");
        }
    }
    
    /**
     * 
     */
    reduceTries(attempt){
        this.props.dispatch(reduceTries(attempt)); 
    }

    /**
     * 
     */
    isCorrectAnswer(answer){
        return this.props.questions.current.answer === answer;
    }
    
    
    /**
     * 
     */
    showFeedback(){
        return ( 
            this.props.questions.current.triesLeft == 0 || 
            this.props.questions.current.answered 
        );
    }
     
    render() {

        if(!!this.props.questions){
        return (
            <div className = 'question-set'>
                <Question
                    question = { this.props.questions.current }
                    optionClickHandler = { this.checkAnswer.bind(this) }
                />
                { this.showFeedback() ?
                <Feedback badges = { this.props.questions.current.triesLeft } 
                    active = { this.showFeedback() }
                    text = { this.props.questions.current.explanation } 
                    action = { this.nextQuestion.bind(this) } 
                />
                : ''}
            </div>
        );
        }
        
            return (<p>Loading...</p>);
    }
}

let mapStateToProps = 
    state => ({ questions : state.questions });
    
let mapDispatchToProps = 
    dispatch => ({ 
        fetchQuestions : () => { dispatch(fetchQuestions()) } ,
        dispatch : dispatch
    });


export default withRouter(
    connect(mapStateToProps,mapDispatchToProps)(QuestionSet)
);