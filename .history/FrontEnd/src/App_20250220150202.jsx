import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./components/Auth/login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ForgotPassword";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/"/>
      </Routes>
    </Router>
  )
}