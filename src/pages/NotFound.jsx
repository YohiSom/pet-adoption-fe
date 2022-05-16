import React from 'react'
import { Link } from 'react-router-dom'


function NotFound() {
  return (
    <div className='not-found'>
        <h3>This page does not exist.</h3>
        <p>We can't seem to find the page you're looking for</p>
        <img src={require("../assets/error.png")} alt="error" className="err-img" />
        <Link to="/">back home</Link>
    </div>
  )
}

export default NotFound