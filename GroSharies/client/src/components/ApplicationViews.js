import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Login from "./Login";
import Register from "./Register";
import HouseholdList from "./Households/HouseholdList";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <main>
      <Switch>

      <Route path="/" exact>
          {isLoggedIn ? <Redirect to="/household"/> : <Redirect to="/login" />}
        </Route>

        {/* Login Page */}
        <Route path="/login">
          <Login />
        </Route>

        {/* Registration Page */}
        <Route path="/register">
          <Register />
        </Route>

        {/* Households Page (List) */}
        <Route path="/household" exact>
          {isLoggedIn ? <HouseholdList /> : <Redirect to="/Login" />}
        </Route>

      </Switch>
    </main>
  );
}