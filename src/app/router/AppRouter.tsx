import { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate, // import Navigate instead of Redirect
} from "react-router-dom"

import { AuthRouter } from '../views/auth/Authrouter';

import Home from '../views/Home';
import { PrivateRouter } from './PrivateRouter';
import { AuthContext } from '../views/store/context/AuthContext';
import { DashboardRouter } from '../views/dashboard/DashboardRouter';

interface Context {
  dispatchUser?: any,
  user?: User
}

interface User {
  loggedIn: boolean
}

export function AppRouter() {

  const { user } = useContext<Context>(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inicio" element={<Home />} />
        <Route path='/auth' element={<AuthRouter />} />
        <PrivateRouter
          loggedIn={user?.loggedIn}
          component={DashboardRouter}
        />
        <Route path='*' element={<Navigate to='/dashboard/home' />} /> {/* use Navigate instead of Redirect */}
      </Routes>
    </BrowserRouter>
  );
}
