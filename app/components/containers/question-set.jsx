import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { incrementScore, nextQuestion, fetchQuestions } from 'actions/creators'
import Feedback from 'presenters/feedback/feedback.jsx'
import Question from 'presenters/questions/question.jsx'
import Options from 'presenters/questions/options.jsx'
import QuestionLoader from 'presenters/loaders/question-loader.jsx'
import OptionsLoader from 'presenters/loaders/options-loader.jsx'

class QuestionSet extends React.Component {
  get initialState () {
    return {
      answered: false,
      attempts: []
    }
  }

  constructor (props) {
    super(props)
    this.state = this.initialState
  }

  componentDidMount () {
    if (!this.props.question) {
      this.props.load()
    }
  }

  computeScore () {
    return (this.props.question.options.length - this.state.attempts.length) - 1
  }

  checkAnswer (optionId) {
    if (this.isCorrectAnswer(optionId)) {
      this.props.incrementScore(this.computeScore())
      this.setState({ answered: true })
    } else {
      let
        attempts = [...this.state.attempts]
      let answered = this.state.answered
      attempts.push(this.props.question.options[optionId])
      if (attempts.length === (this.props.question.options.length - 1)) { answered = true }

      this.setState({ attempts, answered })
    }
  }

  nextQuestion () {
    if (this.props.remaining > 0) {
      this.props.nextQuestion()
      this.setState({ ...this.initialState })
    } else {
      this.props.history.push('/score')
    }
  }

  isCorrectAnswer (optionId) {
    return (
      this.props.question.answer ===
            this.props.question.options[optionId]
    )
  }

  transformOptions (options) {
    let transformedOptions = {}
    options.forEach((option, index) => {
      transformedOptions[index] = {
        value: option,
        attempted: this.optionAttempted(option)
      }
    })

    return transformedOptions
  }

  optionAttempted (optionValue) {
    return (
      this.state.attempts.indexOf(optionValue) > -1
    )
  }

  renderLoader () {
    return (
      <div className = {`question`}>
        <div className="card">
          <QuestionLoader />
        </div>
        <OptionsLoader />
      </div>
    )
  }

  render () {
    if (!this.props.question) {
      return this.renderLoader()
    }

    let [showFeedback, feedbackClass] = this.state.answered
      ? [true, ' answered'] : [false, '']

    return (
      <div className = {`question${feedbackClass}`}>
        <div className="card card--flippable">
          <Question question = { this.props.question } />
          <Feedback
            active = { showFeedback }
            score = {this.computeScore()}
            text = { this.props.question.explanation }
            action = { this.nextQuestion.bind(this) } />
        </div>
        <Options
          options={this.transformOptions(this.props.question.options)}
          clickHandler={this.checkAnswer.bind(this)} />
      </div>
    )
  }
}

let mapStateToProps = state => {
  if (!state.questions.questions) return {}

  return {
    question: state.questions.questions[state.questions.current],
    remaining: state.questions.unselected.length
  }
}

let mapDispatchToProps =
    dispatch => ({
      load: () => { dispatch(fetchQuestions()) },
      incrementScore: increment => { dispatch(incrementScore(increment)) },
      nextQuestion: () => { dispatch(nextQuestion()) }
    })

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuestionSet)
)
