import React from 'react'
import { Link } from 'react-router-dom'

const welcome = () => {
  return (
    <div className="card welcome">
      <div className="card__body">
        <p>Welcome to React Pre-School</p>

        <Link to='/quiz'>
          <button className="button">Play!</button>
        </Link>
      </div>
    </div>
  )
}

export default welcome
