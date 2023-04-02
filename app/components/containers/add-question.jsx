import React from 'react'
import { connect } from 'react-redux'
// import { createQuestion } from 'actions/creators'
import DebounceInput from 'presenters/form/debounce.jsx'
import InputOptionList from 'presenters/form/input-option-list.jsx'
import InputOptionListItemAction from 'presenters/form/input-option-list-item-action.jsx'
import { randomId } from 'util.js'

class AddQuestion extends React.Component {
  constructor (props) {
    super(props)
    this.minOptionCount = 2
    this.maxOptionCount = 4
    this.toggleResourceVisibility = this.toggleResourceVisibility.bind(this)
    this.handleFieldChanged = this.handleFieldChanged.bind(this)
    this.state = {
      resourceUrl: '',
      resourceType: 'image',
      options: [{ id: randomId(), value: '' }, { id: randomId(), value: '' }],
      question: '',
      answerId: null,
      explanation: '',
      previewIsVisible: false
    }
  }

  handleFieldChanged (event) {
    const { name, value } = event.target
    this.updateField(name, value)
  }

  updateField (name, updatedValue) {
    this.setState({
      [name]: updatedValue
    })
  }

  handleAnswerChanged (index, event) {
    if (event.target.checked) {
      this.updateAnswer(index)
    }
  }

  updateAnswer (answerIndex) {
    this.setState({ answerId: answerIndex })
  }

  handleOptionChanged (id, event) {
    this.updateOption(id, event.target.value)
  }

  updateOption (id, value) {
    let options = this.state.options.map(option => {
      if (option.id !== id) { return option }

      option.value = value
      return option
    })
    this.setState({ options })
  }

  handleOptionAdded () {
    if (this.state.options.length === this.maxOptionCount) { return }

    let options = [...this.state.options]
    options.push({ id: randomId(), value: '' })
    this.setState({ options })
  }

  optionRemovedAction () {
    return (<InputOptionListItemAction
      text="x"
      handler={this.handleOptionRemoved.bind(this)}
    />)
  }

  handleOptionRemoved (index, event) {
    let options = this.state.options.filter(option => {
      return option.id !== index
    })
    this.setState({ options })
  }

  toggleResourceVisibility () {
    this.setState((prevState, props) => {
      return { previewIsVisible: !prevState.previewIsVisible }
    })
  }

  transformStateToQuestion () {
    const { answerId, resourceType, resourceUrl, options, ...question } = this.state
    question.answer = this.state.answerId
    question.resource = {
      url: resourceUrl,
      type: resourceType
    }
    question.options = options.map(option => option.value)
    return question
  }

  submitForm (event) {
    event.preventDefault()
    let newQuestion = this.transformStateToQuestion()
    this.props.createQuestion(newQuestion)
  }

  resourcePreviewVisibilityClass () {
    return this.state.previewIsVisible ? 'resource-segment--with-preview' : ''
  }

  render () {
    return (
      <section className="form">
        <form action="#" onSubmit={this.submitForm.bind(this)}>
          <div className="form-segment">
            <label>question wording</label>
            <DebounceInput onChange={this.handleFieldChanged}>
              <textarea placeholder="question wording" name="question" defaultValue={this.state.wording} />
            </DebounceInput>
          </div>
          <div className="form-segment">
            <label>explanation</label>
            <DebounceInput onChange={this.handleFieldChanged} >
              <textarea placeholder="explanation" name="explanation" defaultValue={this.state.explanation}/>
            </DebounceInput>
          </div>
          <div className="form-segment form-segment--full">
            <InputOptionList
              minimumOptionCount={this.minOptionCount}
              changeHandler={this.handleOptionChanged.bind(this)}
              selectHandler={this.handleAnswerChanged.bind(this)}
              action={this.optionRemovedAction()}
              options={this.state.options}
            />
            <button className="button add-option" type="button"
              onClick={this.handleOptionAdded.bind(this)}>
              add
            </button>
          </div>
          <div className={`form-segment form-segment--full resource-segment ${this.resourcePreviewVisibilityClass()}`}>
            <label>resource url</label>
            <div className="input-group input-group--multi">
              <DebounceInput onChange={this.handleFieldChanged}>
                <input name="resourceUrl"
                  placeholder="resource url"
                  className="input input-group__input"
                  type="text" />
              </DebounceInput>
              <span className="input-group__addon">www</span>
              <span className="input-group__addon input-group__addon--right"
                onClick={this.toggleResourceVisibility}>preview</span>
            </div>
            <div className="preview" style={{ backgroundImage: `url(${this.state.resourceUrl})` }}>
              <img src={this.state.resourceUrl}/>
            </div>
          </div>
          <div className="form-segment form-segment--full">
            <button className="button">Save</button>
          </div>
        </form>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // createQuestion: question => { dispatch(createQuestion(question)) }
  }
}

export default connect(null, mapDispatchToProps)(AddQuestion)
