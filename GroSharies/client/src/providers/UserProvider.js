// React
import React, { useState, useEffect, createContext } from "react";

// React Router DOM
import { useHistory } from "react-router-dom";

// Reactstrap
import { Spinner } from "reactstrap";

// Firebase
import firebase from "firebase/app";
import "firebase/auth";

// =========================== IMPORTS END ===========================

export const UserContext = createContext();

export function UserProvider(props) {
    const history = useHistory();
    const apiUrl = "/api/user";

    const user = sessionStorage.getItem("user");
    const [isLoggedIn, setIsLoggedIn] = useState(user != null);

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
        setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {
        return firebase
        .auth()
        .signInWithEmailAndPassword(email, pw)
        .then((signInResponse) => getUserProfile(signInResponse.user.uid))
        .then((user) => {
            sessionStorage.setItem("user", JSON.stringify(user));
            setIsLoggedIn(true);
        });
    };

    const logout = () => {
        return firebase
        .auth()
        .signOut()
        .then(() => {
            history.push('/login');
            sessionStorage.clear();
            setIsLoggedIn(false);
        });
    };

    const register = (user, password) => {
        return firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, password)
        .then((createResponse) =>
            saveUser({ ...user, firebaseId: createResponse.user.uid })
        )
        .then((savedUser) => {
            sessionStorage.setItem("user", JSON.stringify(savedUser));
            setIsLoggedIn(true);
        });
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserProfile = (firebaseUserId) => {
        return getToken().then((token) =>
        fetch(`${apiUrl}/${firebaseUserId}`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }).then(res => res.json())
        );
    };

    const saveUser = (user) => {
        return getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then(res => res.json())
        );
    };

    const getUserById = (id) => {
        return getToken()
        .then(token => fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json()))
    };

    const getAllEmails = () => {
        return getToken()
        .then(token => fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json());
    }

    const getUserInfo = () => {
        return getToken()
        .then(token => fetch(`${apiUrl}/userProfile`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(res => res.json())
    }

    return (
        <UserContext.Provider
        value={{
            isLoggedIn,
            login,
            logout,
            register,
            getToken,
            getUserById,
            getAllEmails,
            getUserInfo
        }}
        >
        {isFirebaseReady ? (
            props.children
        ) : (
            <Spinner className="app-spinner dark" />
        )}
        </UserContext.Provider>
    );
}