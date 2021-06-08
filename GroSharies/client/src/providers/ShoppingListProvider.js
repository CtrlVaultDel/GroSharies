// React
import React, { createContext, useContext } from "react";

// Firebase
import "firebase/auth";

// Context
import { UserContext } from "./UserProvider";
import { HouseholdContext } from "./HouseholdProvider";

// =========================== IMPORTS END ===========================

export const ShoppingListContext = createContext();

export function ShoppingListProvider(props) {
    const { getHouseholdDetail } = useContext(HouseholdContext);
    const { getToken } = useContext(UserContext); 
    const apiUrl = "/api/shoppingList";

    // Gets single shoppingList by the provided shoppingListId
    const getShoppingList = shoppingListId => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${shoppingListId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json())
    };

    // Saves a new shoppingList object to the database
    const saveShoppingList = shoppingList => {
        return getToken()
        .then(token => fetch(apiUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(shoppingList),
          }))
        .then(() => getHouseholdDetail(shoppingList.householdId))
    };

    // Updates a pre-existing shoppingList object in the database
    const updateShoppingList = shoppingList => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${shoppingList.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(shoppingList),
        }))
        .then(() => getHouseholdDetail(shoppingList.householdId))
    };

    // Deletes a shoppingList object from the database
    const deleteShoppingList = shoppingList => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${shoppingList.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(() => getHouseholdDetail(shoppingList.householdId))
    };

    return (
        <ShoppingListContext.Provider
            value={{
                getShoppingList,
                saveShoppingList,
                updateShoppingList,
                deleteShoppingList
            }}
        >
            {props.children}
        </ShoppingListContext.Provider>
    );
};