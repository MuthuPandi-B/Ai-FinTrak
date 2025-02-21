import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white">
        {user ? `Welcome, ${user.name}` : 'Welcome, Guest'}
      </div>
      <div className="hidden md:flex space-x-4">
        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
        {user ? (
          <>
            <Link to="/add" className="text-white hover:text-gray-300">Add Transaction</Link>
            <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
            <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
          </>
        )}
      </div>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4 rounded-lg mt-4 space-y-4">
          <Link to="/" className="block" onClick={toggleMenu}>Home</Link>
          {user ? (
            <>
              <Link to="/add" className="block" onClick={toggleMenu}>Add Transaction</Link>
              <button onClick={handleLogout} className="block">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block" onClick={toggleMenu}>Login</Link>
              <Link to="/register" className="block" onClick={toggleMenu}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
