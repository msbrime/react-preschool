import React from 'react';
import {debounce} from 'util.js';
import { connect } from 'react-redux';
import { createQuestion } from 'actions/creators';
import DebounceInput from 'presenters/form/debounce.jsx';

class AddQuestion extends React.Component{

    constructor(props){
        super(props);
        this.minOptionCount = 2;
        this.maxOptionCount = 4;
        this.handleWordingChanged = this.handleWordingChanged.bind(this);
        this.handleResourceUrlChanged = this.handleResourceUrlChanged.bind(this);
        this.handleExplanationChanged = this.handleExplanationChanged.bind(this);
        this.state = {
            resource:{
                type:"image",
                url:""
            },
            options:['',''],
            question:"",
            answerId:null,
            explanation:""
        }
    }

    updateWording(wording){
        this.setState({question:wording});
    }

    updateOption(index, value){
        let options = [...this.state.options];
        options[index] = value;
        this.setState({options});
    }

    updateResourceUrl(resourceUrl){
        let resource = {...this.state.resource};
        resource.url = resourceUrl;
        this.setState({resource});
    }

    updateExplanation(explanation){
        this.setState({explanation});
    }

    updateAnswer(answerIndex){
        this.setState({answerId:answerIndex});
        setTimeout(() => console.log(this.state.answerId),2000)
    }

    handleResourceUrlChanged(event){
        this.updateResourceUrl(event.target.value)
    }

    handleWordingChanged(event){
        this.updateWording(event.target.value)
    }

    handleOptionChanged(index,event){
        this.updateOption(index, event.target.value)
    }

    handleExplanationChanged(event){
        this.updateExplanation(event.target.value);
    }

    handleAnswerChanged(index,event){
        if(event.target.checked){
            this.updateAnswer(index);
        }  
    }

    handleOptionAdded(){
        if(this.state.options.length === this.maxOptionCount)
        return;
    
        let options = [...this.state.options];
        options.push('');
        this.setState({
            options:options
        });
    }

    handleOptionRemoved(){

    }

    transformStateToQuestion(){
        let {answerId,...question} = this.state;
        question.answer = this.state.options[answerId];
        return question;
    }

    submitForm(event){
        event.preventDefault();
        let newQuestion = this.transformStateToQuestion();
        this.props.createQuestion(newQuestion);
    }

    render(){
        return (
            <section className="card form">
                <div className="card__body">
                    <form action="#" onSubmit={this.submitForm.bind(this)}>
                        <div className="form-segment form-segment--full">
                            <DebounceInput onChange={this.handleWordingChanged}>
                                <textarea placeholder="question wording" defaultValue={this.state.wording} />   
                            </DebounceInput>                     
                        </div>
                        <div className="form-segment">
                            <div className="input-group">
                            <DebounceInput onChange={this.handleResourceUrlChanged}>
                                <input name="resource_url" 
                                    placeholder="resource url" 
                                    className="input input-group__input" 
                                    type="text" />
                            </DebounceInput>
                            <span className="input-group__addon">www</span>
                            </div> 
                            <div className="preview" style={{backgroundImage:`url(${this.state.resource.url})`}}>
                                <img src={this.state.resource.url} alt />
                            </div>
                        </div>
                        <div className="form-segment">
                            <ul className="option-list option-list--input">
                            {
                                this.state.options.map((option, index) => {
                                    return (
                                        <div className="input-group">
                                            <span className="input-group__addon">
                                                <input type="radio" name="answer" 
                                                    value={option} 
                                                    onChange={this.handleAnswerChanged.bind(this,index)}/>
                                            </span>
                                            <DebounceInput onChange={this.handleOptionChanged.bind(this,index)}>
                                                <input name="option[]" 
                                                    placeholder={`option ${(index + 1)}`} 
                                                    className="input input-group__input"
                                                    type="text"  
                                                    autoComplete="off" />
                                            </DebounceInput>
                                        </div>
                                    )
                                })
                            }
                            </ul>
                            <button className="button add-option" type="button" onClick={this.handleOptionAdded.bind(this)}>add</button>
                            <DebounceInput onChange={this.handleExplanationChanged} > 
                                <textarea placeholder="explanation" defaultValue={this.state.explanation}/>
                            </DebounceInput>
                        </div>
                        <div className="form-segment form-segment--full">
                            <button className="button">Save</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        createQuestion : question => { dispatch(createQuestion(question)) }
    }
};

export default connect(null,mapDispatchToProps)(AddQuestion);