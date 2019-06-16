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
            <Link to='/admin/questions'>
              <span>view questions</span>
              <span className='sidebar__menu-icon sidebar__menu-icon--view'>
                <svg viewBox="0 0 512 512" vectorEffect="non-scaling-stroke">
                  <use xlinkHref="#circled" x="0" y="1" />
                </svg>
              </span>
            </Link>  
          </li>
          <li className="sidebar__menu-item">
            <Link to='/admin/questions/new'>
              <span>create questions</span>
              <span className='sidebar__menu-icon sidebar__menu-icon--add'>
                <svg viewBox="0 -19 512 512" vectorEffect="non-scaling-stroke">
                  <use xlinkHref="#add" x="0" y="1" />
                </svg>
              </span>
            </Link>
          </li>
        </ul>
        <div className="sidebar__footer">
          <button className="button" onClick={this.context.logout}>
            <span>Sign Out</span>
            <span className='sidebar__menu-icon sidebar__menu-icon--signout'>
              <svg viewBox="0 -19 512 512" vectorEffect="non-scaling-stroke">
                <use xlinkHref="#signout" x="0" y="1" />
              </svg>
            </span>   
          </button>
        </div>
      </aside>
    );
  }
}




