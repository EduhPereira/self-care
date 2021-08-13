import { LandingPage } from "../pages/landing-page";
import { Switch, Route } from "react-router";
import { Login } from '../pages/login'
export const Routes = () => (
  <Switch>

    <Route path="/login">
      <Login />
    </Route>

  </Switch>
);
