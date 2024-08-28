import React, { useState, useContext, useEffect } from 'react';
import { SiConsul } from 'react-icons/si';
import { AiOutlineGlobal } from 'react-icons/ai';
import { BsPhoneVibrate } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import { AuthContext } from "../../AuthContext";
import logo from '../../assets/logo.png';
//import LanguageSelector from '../LanguageSelector/LanguageSelector'; // Assurez-vous que le chemin est correct

const Navbar = ({ onAuthClick }) => {
  const [active, setActive] = useState('navBarMenu');
  const [noBg, addBg] = useState('navBarTwo');
  const { user, logout } = useContext(AuthContext);

  const showNavBar = () => {
    setActive('navBarMenu showNavBar');
  };

  const removeNavBar = () => {
    setActive('navBarMenu');
  };

  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg('navBarTwo navbar_With_Bg');
    } else {
      addBg('navBarTwo');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', addBgColor);
    return () => window.removeEventListener('scroll', addBgColor);
  }, []);

  const handleLogout = () => {
    logout();
    // Optionnel : redirection vers une autre page ou notification
  };

  return (
    <div className='navBar flex'>
      

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
    </div>
  );
};

export default Navbar;
