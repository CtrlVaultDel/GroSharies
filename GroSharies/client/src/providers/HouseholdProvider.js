import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import "firebase/auth";

export const HouseholdContext = createContext();

export function HouseholdProvider(props) {
    const [households, setHouseholds] = useState([]);
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

    return (
        <HouseholdContext.Provider
            value={{
                households,
                getAllHouseholds
            }}
        >
            {props.children}
        </HouseholdContext.Provider>
    );
};