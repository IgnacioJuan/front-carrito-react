import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './login/Login';


export function AuthRouter(){
    const navigate = useNavigate();

    // Redirigir a "/auth/login" por defecto
    if (window.location.pathname === "/auth") {
       navigate("/auth/login");
    }
 
    return (
       <Routes>
          <Route path="/auth/login">
             <Login />
          </Route>
       </Routes>
    );
}