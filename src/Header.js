import React from 'react'

export default function Header() {
  return (
  <div className="header">
    <span className="logo"><img className="logo-img" src="/assets/note-icon.svg"/> <h1>Notes</h1><small><a href="https://shubhamprakash.me" rel="noopener noreferrer" target="_blank">By Shubham Prakash</a></small></span>
    <div className="streatch"></div>
    <div className="social">
      <a href="https://linkedin.com/in/ishubhamprakash/" rel="noopener noreferrer" target="_blank">
      <i className="fab fa-linkedin-in linkedin"></i>
      </a>
      <a href="https://github.com/i-shubhamprakash" rel="noopener noreferrer" target="_blank">
      <i className="fab fa-github github"></i>
      </a>
      <a href="https://twitter.com/iSuvm" rel="noopener noreferrer" target="_blank">
      <i className="fab fa-twitter twitter"></i>
      </a>
      <a href="https:shubhamprakash.me" rel="noopener noreferrer" target="_blank">
        <i className="fas fa-globe globe"></i>
      </a>
    </div>
  </div>
  )
}
