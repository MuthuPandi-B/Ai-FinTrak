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
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<Register/>}/>
        <Route path="/reset-password/:token" element={<Register/>}/>
      </Routes>
    </Router>
  )
};
export default App