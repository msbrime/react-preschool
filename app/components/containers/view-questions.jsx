import React from 'react'
// import { load } from 'services/questions'
import QuestionSummary from 'presenters/questions/summary.jsx'

export default class ViewQuestions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: null,
      questionLoadStatus: 'loading'
    }
  }

  componentDidMount () {
    // load(({ questions }) =>
    //   this.setState({
    //     questions,
    //     questionLoadStatus: 'loaded'
    //   })
    // )
  }

  renderStatusMessage () {
    return <p>Not Done Loading</p>
  }

  renderQuestions () {
    const questions = []
    for (let [id, question] of Object.entries(this.state.questions)) {
      questions.push(<QuestionSummary key={id} question={question}/>)
    }
    return questions
  }

  render () {
    if (this.state.questionLoadStatus !== 'loaded') {
      return this.renderStatusMessage()
    }

    return (<div className='question-summary-list'>
      {this.renderQuestions()}
    </div>)
  }
}
