import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser, selectUser } from '../../redux/authSli';

const Navbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white">
        {user ? `Welcome, ${user.name}` : 'Welcome, Guest'}
      </div>
      <div className="space-x-4">
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
    </nav>
  );
};

export default Navbar;
