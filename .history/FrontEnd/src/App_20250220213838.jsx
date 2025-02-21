import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./components/Auth/login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ForgotPassword";
import Dashboard from './pages/Dashboard';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';


function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        {/* <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<Register/>}/>
        <Route path="/reset-password/:resetToken" element={<Register/>}/>
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/edit-transaction/:id" element={<EditTransaction />} /> */}
      </Routes>
    </Router>
  )
};
export default App