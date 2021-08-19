import { LandingPage } from "../pages/landing-page";
import { Switch, Route, Redirect } from "react-router";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { Habits } from "../pages/habits";
import { Groups } from "../pages/groups";
import { Group } from "../pages/group";
import { Dashboard } from "../pages/dashboard";
import { NotFoundPage } from "../components/notFoundPage";
import { useUser } from "../providers/UserProvider";
export const Routes = () => {
  const { isLoggedIn } = useUser();
  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? <Redirect to="/dashboard" /> : <LandingPage />}
      </Route>

      <Route exact path="/login">
        {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
      </Route>

      <Route exact path="/signup">
        {isLoggedIn ? <Redirect to="/dashboard" /> : <Signup />}
      </Route>

      <Route exact path="/dashboard">
        {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
      </Route>

      <Route exact path="/habits">
        {isLoggedIn ? <Habits /> : <Redirect to="/login" />}
      </Route>

      <Route exact path="/groups">
        {isLoggedIn ? <Groups /> : <Redirect to="/login" />}
      </Route>

      <Route exact path="/groups/:id">
        {isLoggedIn ? <Group /> : <Redirect to="/login" />}
      </Route>

      <Route exact path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
