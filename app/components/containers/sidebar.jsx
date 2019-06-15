import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from 'context/auth.js'

export default class Sidebar extends Component {

  static contextType = AuthContext;

  render () {
    return (
      <aside className="sidebar">
        <p className="sidebar__title">PMVC Admin</p>
        <ul className="sidebar__menu">
          <li className="sidebar__menu-item">
            <Link to='/admin/questions'>view questions</Link>  
          </li>
          <li className="sidebar__menu-item">
            <Link to='/admin/questions/new'>create questions</Link>
          </li>
        </ul>
        <div className="sidebar__footer">
          <button className="button" onClick={this.context.logout}>Sign Out</button>
        </div>
      </aside>
    );
  }
}




