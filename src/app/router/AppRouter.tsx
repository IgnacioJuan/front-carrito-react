import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthRouter } from "../views/auth/Authrouter";
import Home from "../views/dashboard/home/Home";
import { PrivateRouter } from "./PrivateRouter";
import { AuthContext } from "../views/store/context/AuthContext";
import { DashboardRouter } from "../views/dashboard/DashboardRouter";

interface Context {
  dispatchUser?: any;
  user?: User;
}

interface User {
  loggedIn: boolean;
}

export function AppRouter() {
  const { user } = useContext<Context>(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/inicio"><Home /></Route>
        <Route path="/auth"><AuthRouter /> </Route>
        <PrivateRouter loggedIn={user?.loggedIn} component={DashboardRouter} />
        <Redirect to="/dashboard/home" />
        {/* use Navigate instead of Redirect */}
      </Switch>
    </Router>
  );
}
