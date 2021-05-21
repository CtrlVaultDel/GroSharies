import React, { createContext, useContext } from "react";
import "firebase/auth";

// Context
import { UserContext } from "./UserProvider";
// =========================== IMPORTS END ===========================


export const ListItemContext = createContext();

export function ListItemProvider(props) {
    const { getToken } = useContext(UserContext); 
    const apiUrl = "/api/listItem";

    // Retrieves all listItem objects for a particular shoppingList
    const getListItems = shoppingListId => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${shoppingListId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json())
    };

    // Saves a new listItem object to the database
    const saveListItem = listItem => {
        return getToken()
        .then(token => fetch(apiUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(listItem)
          }))
        .then(() => getListItems(listItem.shoppingListId))
    };

    // Toggles a pre-existing listItem object between complete & incomplete
    const toggleListItem = listItem => {
        return getToken()
        .then(token => fetch(`${apiUrl}/toggle/${listItem.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listItem)
        }))
        .then(() => getListItems(listItem.shoppingListId))
    }

    const checkAll = shoppingListId => {
        return getToken()
        .then(token => fetch(`${apiUrl}/check-all/${shoppingListId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }))
        .then(() => getListItems(shoppingListId))
    };

    const uncheckAll = shoppingListId => {
        return getToken()
        .then(token => fetch(`${apiUrl}/uncheck-all/${shoppingListId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }))
        .then(() => getListItems(shoppingListId))
    };

    // Updates a pre-existing listItem object in the database
    const updateListItem = listItem => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${listItem.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(listItem)
        }))
        .then(() => getListItems(listItem.shoppingListId))
    };

    // Deletes a listItem object from the database
    const deleteListItem = listItem => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${listItem.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(() => getListItems(listItem.shoppingListId))
    };

    return (
        <ListItemContext.Provider
            value={{
                getListItems,
                saveListItem,
                toggleListItem,
                checkAll,
                uncheckAll,
                updateListItem,
                deleteListItem
            }}
        >
            {props.children}
        </ListItemContext.Provider>
    );
};