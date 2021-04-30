import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import "firebase/auth";

export const HouseholdUserContext = createContext();

export function HouseholdProvider(props) {
    const [householdUsers, setHouseholdUsers] = useState([]);
    const { getToken } = useContext(UserContext); 
    const apiUrl = "/api/household";

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

    const getHousehold = householdId => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${householdId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json())
    }

    const saveHousehold = (household) => {
        return getToken()
        .then((token) => fetch(apiUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(household),
          }))
        .then(resp => resp.json())
    };

    return (
        <HouseholdContext.Provider
            value={{
                households,
                getAllHouseholds,
                getHousehold,
                saveHousehold
            }}
        >
            {props.children}
        </HouseholdContext.Provider>
    );
};