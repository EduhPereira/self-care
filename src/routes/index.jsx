import { Switch, Route } from "react-router";
import { Group } from "../pages/group";
import { Groups } from "../pages/groups";

export const Routes = () => (
  <Switch>
    <Route exact path="/groups">
      <Groups />
    </Route>
    <Route exact path="/groups/:id">
      <Group />
    </Route>
  </Switch>
);
