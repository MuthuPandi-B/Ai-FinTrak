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
        <Route path="/forgot" element={<Register/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  )
};
export default App