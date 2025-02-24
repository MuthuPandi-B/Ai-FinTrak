import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>© 2025 AI Financial Tracker</p>
        <div className="mt-2 space-x-4">
          <Link to="/terms" className="text-white hover:text-gray-300">About</Link>
   

        </div>
      </div>
    </footer>
  );
};

export default Footer;
