import React, { createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import "firebase/auth";

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
            body: JSON.stringify(listItem),
          }))
        .then(() => getListItems(listItem.shoppingListId))
    };

    // Updates a pre-existing listItem object in the database
    const updateListItem = listItem => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${listItem.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listItem),
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
                updateListItem,
                deleteListItem
            }}
        >
            {props.children}
        </ListItemContext.Provider>
    );
};