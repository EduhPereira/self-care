import { Switch, Route } from "react-router";
import { Signup } from "../pages/signup";

export const Routes = () => (
  <Switch>
    <Route path="/signup">
      <Signup />
    </Route>
  </Switch>
);
