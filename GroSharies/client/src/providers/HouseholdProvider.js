import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import "firebase/auth";

export const HouseholdContext = createContext();

export function HouseholdProvider(props) {
    const [households, setHouseholds] = useState([]);
    const { getToken } = useContext(UserContext); 
    const apiUrl = "/api/household";

    // Called to retrieve all households associated with the current user
    const getAllHouseholds = () => {
        return getToken()
        .then(token => fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json())
        .then(setHouseholds)
    };

    // Called to retrieve a single household and the shopping lists associated with it
    const getHousehold = householdId => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${householdId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json())
    };

    // Called when a user saves a new household
    const saveHousehold = (household) => {
        return getToken()
        .then(token => fetch(apiUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(household),
          }))
        .then(resp => resp.json())
    };

    // Called when a user saves an edit to one of their households
    const updateHousehold = household => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${household.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(household),
        }))
    };

    return (
        <HouseholdContext.Provider
            value={{
                households,
                getAllHouseholds,
                getHousehold,
                saveHousehold,
                updateHousehold
            }}
        >
            {props.children}
        </HouseholdContext.Provider>
    );
};