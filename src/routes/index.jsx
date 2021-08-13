import { LandingPage } from "../pages/landing-page";
import { Switch, Route } from "react-router";
import { Signup } from "../pages/signup";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/signup" component={Signup} />
  </Switch>
);
