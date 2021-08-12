import { LandingPage } from "../pages/landing-page";
import { Switch, Route } from "react-router";
export const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
  </Switch>
);
