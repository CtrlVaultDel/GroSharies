import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { UserProvider } from "./providers/UserProvider";
import { HouseholdProvider } from "./providers/HouseholdProvider";
import { HouseholdUserProvider } from "./providers/HouseholdUserProvider";

function App() {
    return (
        <Router>
            <UserProvider>
                <HouseholdUserProvider>
                    <HouseholdProvider>
                        <Header />
                        <ApplicationViews />
                    </HouseholdProvider>
                </HouseholdUserProvider>
            </UserProvider>
        </Router>
    );
};

export default App;
