import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Login from "./Login";
import Register from "./Register";

// Household Components
import HouseholdList from "./Households/HouseholdList";
import HouseholdDetails from "./Households/HouseholdDetails";
import HouseholdFormAdd from "./Households/HouseholdFormAdd";
import HouseholdFormEdit from "./Households/HouseholdFormEdit";

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

                {/* Edit Household Form */}
                <Route path="/household/edit/:id" exact>
                    {isLoggedIn ? <HouseholdFormEdit /> : <Redirect to="/Login" />}
                </Route>

                {/* New Household Form */}
                <Route path="/household/new" exact>
                    {isLoggedIn ? <HouseholdFormAdd /> : <Redirect to="/Login" />}
                </Route>

                {/* Household Detail Page */}
                <Route path="/household/:id" exact>
                    {isLoggedIn ? <HouseholdDetails /> : <Redirect to="/Login" />}
                </Route>

                {/* Households Page (List) */}
                <Route path="/household" exact>
                    {isLoggedIn ? <HouseholdList /> : <Redirect to="/Login" />}
                </Route>               
            </Switch>
        </main>
    );
}