import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Login from "./Login";
import Register from "./Register";

// Userprofile Components
import UserProfilePage from "./User/UserProfilePage"

// Household Components
import HouseholdPage from "./Households/HouseholdPage";
import HouseholdDetails from "./Households/HouseholdDetails";
import HouseholdFormAdd from "./Households/HouseholdFormAdd";

// ShoppingList Components
import ShoppingListDetails from "./ShoppingLists/ShoppingListDetails";
import ShoppingListFormAdd from "./ShoppingLists/ShoppingListFormAdd";
import ShoppingListFormEdit from "./ShoppingLists/ShoppingListFormEdit";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <main>
            <Switch>
                {/* -----------------LOGIN & REGISTRATION PAGES---------------- */}
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


                {/* -----------------------USER PROFILE----------------------- */}
                <Route path="/user" exact>
                    {isLoggedIn ? <UserProfilePage /> : <Redirect to="/Login" />}
                </Route>


                {/* ----------------------HOUSEHOLD PAGES---------------------- */}

                {/* Household Add Form */}
                <Route path="/household/new" exact>
                    {isLoggedIn ? <HouseholdFormAdd /> : <Redirect to="/Login" />}
                </Route>

                {/* Household Detail Page */}
                <Route path="/household/:id" exact>
                    {isLoggedIn ? <HouseholdDetails /> : <Redirect to="/Login" />}
                </Route>

                {/* Households Page (List) */}
                <Route path="/household" exact>
                    {isLoggedIn ? <HouseholdPage /> : <Redirect to="/Login" />}
                </Route>


                {/* --------------------SHOPPING LIST PAGES-------------------- */}
                {/* ShoppingList Edit Form */}
                <Route path="/shoppingList/edit/:id" exact>
                    {isLoggedIn ? <ShoppingListFormEdit /> : <Redirect to="/Login" />}
                </Route>

                {/* ShoppingList Add Form */}
                <Route path="/shoppingList/new" exact>
                    {isLoggedIn ? <ShoppingListFormAdd /> : <Redirect to="/Login" />}
                </Route>

                {/* ShoppingList Detail Page */}
                <Route path="/shoppingList/:id" exact>
                    {isLoggedIn ? <ShoppingListDetails /> : <Redirect to="/Login" />}
                </Route>

            </Switch>
        </main>
    );
};