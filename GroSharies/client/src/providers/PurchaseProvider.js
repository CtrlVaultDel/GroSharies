// React
import React, { createContext, useContext } from "react";

// Firebase
import "firebase/auth";

// Context
import { UserContext } from "./UserProvider";

// =========================== IMPORTS END ===========================

export const PurchaseContext = createContext();

export function PurchaseProvider(props) {
    const { getToken } = useContext(UserContext); 
    const apiUrl = "/api/purchase";

    // Retrieves all purchase objects for a particular shoppingList
    const getPurchases = shoppingListId => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${shoppingListId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json())
    };

    // Saves a new purchase object to the database
    const savePurchase = purchase => {
        return getToken()
        .then(token => fetch(apiUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(purchase),
          }))
        .then(() => getPurchases(purchase.shoppingListId))
    };

    // Updates a pre-existing purchase object in the database
    const updatePurchase = purchase => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${purchase.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchase),
        }))
        .then(() => getPurchases(purchase.shoppingListId))
    };

    // Deletes a purchase object from the database
    const deletePurchase = purchase => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${purchase.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(() => getPurchases(purchase.shoppingListId))
    };

    return (
        <PurchaseContext.Provider
            value={{
                getPurchases,
                savePurchase,
                updatePurchase,
                deletePurchase
            }}
        >
            {props.children}
        </PurchaseContext.Provider>
    );
};