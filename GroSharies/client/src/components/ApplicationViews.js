// React
import React, { useContext } from "react";

// React Router DOM
import { Switch, Route, Redirect } from "react-router-dom";

// Context
import { UserContext } from "../providers/UserProvider";

// Login & Registration Components
import Login from "./Login";
import Register from "./Register";

// Userprofile Components
import UserProfilePage from "./User/UserProfilePage"

// Household Components
import HouseholdPage from "./Households/HouseholdPage";
import HouseholdDetails from "./Households/HouseholdDetails";

// ShoppingList Components
import ShoppingListDetails from "./ShoppingLists/ShoppingListDetails";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <main>
            <Switch>
                {/* --------------------------DEFAULT-------------------------- */}
                <Route path="/" exact>
                    {isLoggedIn ? <Redirect to="/household"/> : <Redirect to="/login" />}
                </Route>


                {/* -----------------LOGIN & REGISTRATION PAGES---------------- */}
                {/* Login Page */}
                <Route path="/login">
                    <Login />
                </Route>

                {/* Registration Page */}
                <Route path="/register">
                    <Register />
                </Route>


                {/* -----------------------USER PROFILE----------------------- */}
                <Route path="/user" exact>
                    {isLoggedIn ? <UserProfilePage /> : <Redirect to="/Login" />}
                </Route>


                {/* ----------------------HOUSEHOLD PAGES---------------------- */}

                {/* Household Detail Page */}
                <Route path="/household/:id" exact>
                    {isLoggedIn ? <HouseholdDetails /> : <Redirect to="/Login" />}
                </Route>

                {/* Households Page (List) */}
                <Route path="/household" exact>
                    {isLoggedIn ? <HouseholdPage /> : <Redirect to="/Login" />}
                </Route>


                {/* --------------------SHOPPING LIST PAGES-------------------- */}

                {/* ShoppingList Detail Page */}
                <Route path="/shoppingList/:id" exact>
                    {isLoggedIn ? <ShoppingListDetails /> : <Redirect to="/Login" />}
                </Route>

            </Switch>
        </main>
    );
};