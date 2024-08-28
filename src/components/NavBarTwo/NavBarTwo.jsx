import React, { useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import logo from '../../assets/logo.png';

const NavBarTwo = ({ active, showNavBar, removeNavBar, noBg }) => {
  return (
    <div className={noBg}>
      <div className="logoDiv">
        <img src={logo} className='logo' alt="logo" />
      </div>
      <div className={active}>
        <ul className="menu flex">
          <li onClick={removeNavBar} className="listItem" style={{ cursor: 'pointer' }}>Home</li>
          <li onClick={removeNavBar} className="listItem" style={{ cursor: 'pointer' }}>About</li>
          <li onClick={removeNavBar} className="listItem" style={{ cursor: 'pointer' }}>Offers</li>
          <li onClick={removeNavBar} className="listItem" style={{ cursor: 'pointer' }}>Seats</li>
          <li onClick={removeNavBar} className="listItem" style={{ cursor: 'pointer' }}>Destinations</li>
        </ul>
        <button className='btn flex btnOne'>Contact</button>
      </div>
      <button className='btn flex btnTwo'>Contact</button>
      <div onClick={showNavBar} className="toggleIcon">
        <CgMenuGridO className='icon' />
      </div>
    </div>
  );
};

export default NavBarTwo;
