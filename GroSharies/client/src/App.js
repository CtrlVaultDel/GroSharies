import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { UserProvider } from "./providers/UserProvider";
import { HouseholdProvider } from "./providers/HouseholdProvider";

function App() {
    return (
        <Router>
            <UserProvider>
                <HouseholdProvider>
                    <Header />
                    <ApplicationViews />
                </HouseholdProvider>
            </UserProvider>
        </Router>
    );
};

export default App;
