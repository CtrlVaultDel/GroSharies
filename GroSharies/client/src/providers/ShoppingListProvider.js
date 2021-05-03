import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import "firebase/auth";

export const ShoppingListContext = createContext();

export function ShoppingListProvider(props) {
    const [ shoppingLists, setShoppingLists] = useState([]);
    const { getToken } = useContext(UserContext); 
    const apiUrl = "/api/shoppingList";

    // Gets all shoppingLists by the provided householdId
    const getShoppingLists = householdId => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${householdId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json())
        .then(setShoppingLists)
    };

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
        .then(resp => resp.json())
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
    };

    // Deletes a shoppingList object from the database
    const deleteShoppingList = shoppingListId => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${shoppingListId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(getShoppingLists)
    };

    return (
        <ShoppingListContext.Provider
            value={{
                shoppingLists,
                getShoppingLists,
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