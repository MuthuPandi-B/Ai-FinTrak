import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ForgotPassword from './features/auth/ForgotPassword';
import ResetPassword from './features/auth/ResetPassword';
import TransactionForm from './components/TransactionForm';
import TransactionList from './features/transactions/TransactionList';
import HomePage from './pages/HomePage';
import Chart from './components/Chart';
import Dashboard from './components/Dashboard';

const App = () => {
  
  return (
    <Router >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/add" element={<TransactionForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/charts" element={<Chart />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
