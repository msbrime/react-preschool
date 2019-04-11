import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchQuestions } from 'actions/firebase/actions';
import { 
    incrementScore,
    markAsAnswered,
    nextQuestion,
    reduceTries
} from 'actions/creators';
import Feedback from 'presenters/feedback/feedback.jsx';
import Question from 'presenters/questions/question.jsx';
import Options from 'presenters/questions/options.jsx';
import QuestionLoader from 'presenters/loaders/question_loader.jsx';
import OptionsLoader from 'presenters/loaders/options_loader.jsx';


class QuestionSet extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            answered: false,
            attempts: []
        }
    }

    componentDidMount(){
       if(!this.props.question){
            this.props.load();
        }
    }
       

    checkAnswer(optionId){
        if(this.isCorrectAnswer(optionId)){
           this.props.incrementScore(
               this.props.question.options.length - this.state.attempts.length - 1
           );
           this.setState({answered:true})
        }
        else{
            this.setState(prevState => {
                prevState.attempts.push[this.props.question.options[optionId]];
                return {attempts : [... prevState.attempts]}
            })
        }
    }

    /*
    QuestionManager(question, options, answer){
        this.question = question
        this.options = options
        this.answer = answer
    }
    */
    

    nextQuestion(){
        if(this.props.remaining > 0){
            this.props.nextQuestion();
            this.setState({answered:false})
        }
        else{
            this.props.router.push("/score");
        }
    }

    isCorrectAnswer(optionId){
        return (
            this.props.question.answer === 
            this.props.question.options[optionId]
        );
    }

    transformOptions(options){
        let transformedOptions = {};
        options.forEach( (option,index) => {
            transformedOptions[index] = {
                value: option,
                attempted: this.optionAttempted(option)
            }
        });

        return transformedOptions;
    }

    optionAttempted(optionValue){
        return (
            this.state.attempts.indexOf(optionValue) > -1
        );
    }
    

    shouldDisplayFeedback(){
        return this.state.answered;
    }

    renderLoader(){
        return (
            <div className = {`question`}>
                <div className="card"> 
                <QuestionLoader />
                </div> 
                <OptionsLoader />
            </div>
        );   
    }
     
    render() {
        if(!this.props.question){ 
            return this.renderLoader();
        }
        console.log(this.props.question)

        let [showFeedback, feedbackClass] = this.shouldDisplayFeedback() ?
            [true, " answered"] : [false, ""];

        return (
            <div className = {`question${feedbackClass}`}>
                <div className="card card--flippable">
                    <Question question = { this.props.question } />
                    <Feedback
                        active = { showFeedback }
                        score = {3}
                        text = { this.props.question.explanation } 
                        action = { this.nextQuestion.bind(this) } />
                </div>
                <Options 
                    options={this.transformOptions(this.props.question.options)} 
                    clickHandler={this.checkAnswer.bind(this)} />
            </div>
        );
    }
}

let mapStateToProps = state => {
    if(state.questions){
        return { 
            question: state.questions.questions[state.questions.current],
            remaining: state.questions.unselected.length
        };
    }
    
    return {};
}
    
let mapDispatchToProps = 
    dispatch => ({ 
        load : () => { dispatch(fetchQuestions()) } ,
        incrementScore : increment => { dispatch(incrementScore(increment)) },
        // markAsAnswered : () => { dispatch(markAsAnswered()) },
        // reduceTries : optionId => { dispatch(reduceTries(optionId)) },
        nextQuestion : () => { dispatch(nextQuestion()) }
    });


export default withRouter(
    connect(mapStateToProps,mapDispatchToProps)(QuestionSet)
);