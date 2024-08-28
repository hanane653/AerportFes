import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SiConsul } from 'react-icons/si';
import { AiOutlineGlobal } from 'react-icons/ai';
import { BsPhoneVibrate } from 'react-icons/bs';
import { AuthContext } from "../../AuthContext";

const NavBarOne = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // Optionnel : redirection vers une autre page ou notification
  };

  return (
    <div className="navBarOne flex">
      <div>
        <SiConsul className='icon' />
      </div>

      <div className="none flex">
        <li className='flex'><BsPhoneVibrate className='icon' />Support</li>
        <li className='flex'><AiOutlineGlobal className='icon' />Languages</li>
      </div>

      <div className="alwaysVisible flex">
        {/* Always visible authentication buttons */}
        {!user ? (
          <>
            <Link to="/login">
              <button className='authButton'>Sign In</button>
            </Link>
            <Link to="/signup">
              <button className='authButton'>Sign Up</button>
            </Link>
          </>
        ) : (
          <>
            <span>Welcome, {user.username}</span>
            <span onClick={handleLogout} className='signOut'>Sign Out</span>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBarOne;
