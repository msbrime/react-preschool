import React from 'react'
import { connect } from 'react-redux'
import { createQuestion } from 'actions/creators'
import DebounceInput from 'presenters/form/debounce.jsx'

function randomId () {
  return parseInt(Math.random() * 1000000)
}

class AddQuestion extends React.Component {
  constructor (props) {
    super(props)
    this.minOptionCount = 2
    this.maxOptionCount = 4
    this.handleWordingChanged = this.handleWordingChanged.bind(this)
    this.handleResourceUrlChanged = this.handleResourceUrlChanged.bind(this)
    this.handleExplanationChanged = this.handleExplanationChanged.bind(this)
    this.toggleResourceVisibility = this.toggleResourceVisibility.bind(this)
    this.state = {
      resource: {
        type: 'image',
        url: ''
      },
      options: [{ id: randomId(), value: '' }, { id: randomId(), value: '' }],
      question: '',
      answerId: null,
      explanation: '',
      previewIsVisible: false
    }
  }

  updateWording (wording) {
    this.setState({ question: wording })
  }

  updateOption (index, value) {
    let options = this.state.options.map(option => {
      if (option.id !== index) { return option }

      option.value = value
      return option
    })
    this.setState({ options })
  }

  updateResourceUrl (resourceUrl) {
    let resource = { ...this.state.resource }
    resource.url = resourceUrl
    this.setState({ resource })
  }

  updateExplanation (explanation) {
    this.setState({ explanation })
  }

  updateAnswer (answerIndex) {
    this.setState({ answerId: answerIndex })
  }

  handleResourceUrlChanged (event) {
    this.updateResourceUrl(event.target.value)
  }

  handleWordingChanged (event) {
    this.updateWording(event.target.value)
  }

  handleOptionChanged (index, event) {
    this.updateOption(index, event.target.value)
  }

  handleExplanationChanged (event) {
    this.updateExplanation(event.target.value)
  }

  handleAnswerChanged (index, event) {
    if (event.target.checked) {
      this.updateAnswer(index)
    }
  }

  handleOptionAdded () {
    if (this.state.options.length === this.maxOptionCount) { return }

    let options = [...this.state.options]
    options.push({ id: randomId(), value: '' })
    this.setState({ options })
  }

  handleOptionRemoved (index, event) {
    let options = this.state.options.filter(option => {
      return option.id !== index
    })
    this.setState({ options })
  }

  toggleResourceVisibility () {
    this.setState({ previewIsVisible: !this.state.previewIsVisible })
  }

  transformStateToQuestion () {
    let { answerId, ...question } = this.state
    question.answer = this.state.options[answerId]
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
            <DebounceInput onChange={this.handleWordingChanged}>
              <textarea placeholder="question wording" defaultValue={this.state.wording} />
            </DebounceInput>
          </div>
          <div className="form-segment">
            <label>explanation</label>
            <DebounceInput onChange={this.handleExplanationChanged} >
              <textarea placeholder="explanation" defaultValue={this.state.explanation}/>
            </DebounceInput>
          </div>
          <div className="form-segment form-segment--full">
            <ul className="option-list option-list--input">
              {
                this.state.options.map((option, index) => {
                  let action = index > 1
                    ? <span className="option-list__item-action"
                      onClick={this.handleOptionRemoved.bind(this, option.id)}>x</span>
                    : null
                  return (
                    <li key={option.id}>
                      <label>option <span>{(index + 1)}</span></label>
                      <div className="input-group">
                        <span className="input-group__addon">
                          <input type="radio" name="answer"
                            value={option}
                            onChange={this.handleAnswerChanged.bind(this, index)}/>
                        </span>
                        <DebounceInput onChange={this.handleOptionChanged.bind(this, option.id)}>
                          <input name="option[]"
                            placeholder={`option ${(index + 1)}`}
                            className="input input-group__input"
                            defaultValue={option.value}
                            type="text"
                            autoComplete="off" />
                        </DebounceInput>
                        {action}
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            <button className="button add-option" type="button" onClick={this.handleOptionAdded.bind(this)}>add</button>
          </div>
          <div className={`form-segment form-segment--full resource-segment ${this.resourcePreviewVisibilityClass()}`}>
            <label>resource url</label>
            <div className="input-group input-group--multi">
              <DebounceInput onChange={this.handleResourceUrlChanged}>
                <input name="resource_url"
                  placeholder="resource url"
                  className="input input-group__input"
                  type="text" />
              </DebounceInput>
              <span className="input-group__addon">www</span>
              <span className="input-group__addon input-group__addon--right"
                onClick={this.toggleResourceVisibility}>preview</span>
            </div>
            <div className="preview" style={{ backgroundImage: `url(${this.state.resource.url})` }}>
              <img src={this.state.resource.url}/>
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
    createQuestion: question => { dispatch(createQuestion(question)) }
  }
}

export default connect(null, mapDispatchToProps)(AddQuestion)
