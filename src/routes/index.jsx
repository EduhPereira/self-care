import { Switch, Route } from "react-router";
import { Habits } from "../pages/habits";
export const Routes = () => (
  <Switch>
    <Route path="/habits">
      <Habits/>
    </Route>
  </Switch>
);
