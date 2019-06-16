import React from 'react'
import { Link } from 'react-router-dom'

const welcome = () => {
  return (
    <div className="card welcome">
      <div className="card__body">
        <p>Welcome to React Pre-School</p>

        <Link className="button" to='/quiz'>Play!</Link>

        <h6><Link to='/admin'>admin panel</Link></h6>

      </div>
    </div>
  )
}

export default welcome
