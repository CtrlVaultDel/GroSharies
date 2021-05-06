import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import "firebase/auth";

export const HouseholdContext = createContext();

export function HouseholdProvider(props) {
    const [householdDetail, setHouseholdDetail] = useState();
    const [households, setHouseholds] = useState([]);
    const { getToken } = useContext(UserContext); 
    const apiUrl = "/api/household";
    
    // Gets single household by the provided householdId
    const getHouseholdDetail = householdId => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${householdId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json())
        .then(setHouseholdDetail);
    };

    // Gets all households associated with the current user
    const getHouseholds = () => {
        return getToken()
        .then(token => fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json())
        .then(setHouseholds);
    };

    // Saves a new household object to the database
    const saveHousehold = household => {
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

    // Updates a pre-existing household object in the database
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

    // Deletes a household object from the database
    const deleteHousehold = householdId => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${householdId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(getHouseholds)
    };

    return (
        <HouseholdContext.Provider
            value={{
                getHouseholdDetail,
                householdDetail,
                getHouseholds,
                households,
                saveHousehold,
                updateHousehold,
                deleteHousehold
            }}
        >
            {props.children}
        </HouseholdContext.Provider>
    );
};