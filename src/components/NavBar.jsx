import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 



const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container">
      <Link to="/Dashboard"><img src="/images/sjjmlogo.jpg" alt="" style={{ height: '35px', width:'35px'}} /></Link>
      <h6 className="text-center text-white fw-bold small-text " style={{ fontSize: '0.8rem' }}>SRI JAYAJOTHI AND COMPANY PRIVATE LIMITED</h6>
        <button 
    className="navbar-toggler btn-sm custom-toggler" 
    type="button" 
    data-bs-toggle="collapse" 
    data-bs-target="#navbarNav" 
    aria-controls="navbarNav" 
    aria-expanded="false" 
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/feedback-form">FEEDBACK FORM</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/feedback-list">FEEDBACK LIST</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/dashboard">DASHBOARD</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

