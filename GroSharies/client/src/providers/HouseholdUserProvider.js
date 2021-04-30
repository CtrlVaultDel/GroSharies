import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import "firebase/auth";

export const HouseholdUserContext = createContext();

export function HouseholdUserProvider(props) {
    const [userHouseholds, setUserHouseholds] = useState([]);
    const { getToken } = useContext(UserContext); 
    const apiUrl = "/api/householdUser";

    const getUserHouseholds = () => {
        return getToken()
        .then(token => fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json())
        .then(setUserHouseholds);
    };

    return (
        <HouseholdUserContext.Provider
            value={{
                userHouseholds,
                getUserHouseholds
            }}
        >
            {props.children}
        </HouseholdUserContext.Provider>
    );
};