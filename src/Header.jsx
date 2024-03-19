import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='nav'>
        <div className='nav-item'>
            <span>
                <Link to="/">Home</Link>
            </span>
        </div>
        <div className='nav-item'>
            <span>
                <Link to="/mylist">My List</Link>
            </span>
        </div>
    </div>
  )
}
