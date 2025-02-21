import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./components/Auth/login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ForgotPassword";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<Register/>}/>
        <Route path="/reset-password/:resetToken" element={<Register/>}/>
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/edit-transaction/:id" element={<EditTransaction />} />
      </Routes>
    </Router>
  )
};
export default App