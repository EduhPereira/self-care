import { LandingPage } from "../pages/landing-page";
import { Switch, Route } from "react-router";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { Habits } from "../pages/habits";
import { Groups } from "../pages/groups";
import { Group } from "../pages/group";
import { Dashboard } from "../pages/dashboard";
import { NotFoundPage } from "../components/notFoundPage";
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
      <Dashboard />
    </Route>

    <Route exact path="/habits">
      <Habits />
    </Route>

    <Route exact path="/groups">
      <Groups />
    </Route>

    <Route exact path="/groups/:id">
      <Group />
    </Route>

    <Route exact path="*">
      <NotFoundPage/>
    </Route>
  </Switch>
);
