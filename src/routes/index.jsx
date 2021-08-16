import { LandingPage } from "../pages/landing-page";
import { Switch, Route } from "react-router";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { Habits } from '../pages/habits'
export const Routes = () => (
  <Switch>
    <Route exact path="/">
      <LandingPage />
    </Route>

    <Route exact path="/login">
      <Login />
    </Route>

    <Route exact path="/signup">
      <Signup />
    </Route>

    <Route exact path="/dashboard">
      <p>Dashboard</p>
    </Route>

    <Route exact path="/habits">
      <Habits/>
    </Route>
  </Switch>
);
