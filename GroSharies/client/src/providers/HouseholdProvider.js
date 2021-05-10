import React, { useState, createContext, useContext } from "react";
import "firebase/auth";

// Context
import { UserContext } from "./UserProvider";
// =========================== IMPORTS END ===========================


export const HouseholdContext = createContext();

export function HouseholdProvider(props) {
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

    const inviteUser = invitation => {
        return getToken()
        .then(token => fetch("/api/householdUser", {
            medhot: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(getHouseholds)
    }

    return (
        <HouseholdContext.Provider
            value={{
                getHouseholdDetail,
                getHouseholds,
                households,
                saveHousehold,
                updateHousehold,
                deleteHousehold,
                inviteUser
            }}
        >
            {props.children}
        </HouseholdContext.Provider>
    );
};