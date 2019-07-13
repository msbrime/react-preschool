import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Sidebar from 'containers/sidebar.jsx'
import CreateQuestion from 'pages/admin/questions/create.jsx'
import ViewQuestions from 'pages/admin/questions/view.jsx'
import EditQuestion from 'pages/admin/questions/edit.jsx'

export default class AdminIndex extends Component {
  render () {
    return (
      <div className="admin page page--with-sidebar">
        <Sidebar />
        <div className="content">
          <Route exact path='/admin/questions/new' component = {CreateQuestion} />
          <Route exact path='/admin/questions/edit' component = {EditQuestion} />
          <Route exact path={['/admin/questions/view', '/admin/questions', '/admin']} component = {ViewQuestions} />
        </div>]
      </div>
    )
  }
}
