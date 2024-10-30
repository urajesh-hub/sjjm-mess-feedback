import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container d-flex align-items-center justify-content-center">
        <Link to="/Dashboard" className="d-flex align-items-center ">
          <img src="/images/sjjmlogo.jpg" alt="" style={{ height: '35px', width: '35px' }} />
          <h6 className="text-white fw-bold ms-2 me-1" style={{ fontSize: '0.7rem' }}>
             SRI JAYAJOTHI AND COMPANY PRIVATE LIMITED
          </h6>
          <img src="/images/5slogo.jpg" alt="" style={{ height: '35px', width: '35px' }} />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
