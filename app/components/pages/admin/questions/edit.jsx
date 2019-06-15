import React, { Component } from 'react'
import Sidebar from 'containers/sidebar.jsx'

export default class EditQuestionPage extends Component {
  render () {
    return (
      <div className="admin page page--with-sidebar">
        <Sidebar />
        <div className="content">
          <p>editing questions</p>
        </div>
      </div>
    )
  }
}
