import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { UserProvider } from "./providers/UserProvider";
import { HouseholdProvider } from "./providers/HouseholdProvider";
import { ShoppingListProvider } from "./providers/ShoppingListProvider";
import { PurchaseProvider } from "./providers/PurchaseProvider";
import { ListItemProvider } from "./providers/ListItemProvider";

function App() {
    return (
        <Router>
            <UserProvider>
                <HouseholdProvider>
                    <ShoppingListProvider>
                        <PurchaseProvider>
                            <ListItemProvider>
                                <Header />
                                <ApplicationViews />
                            </ListItemProvider>
                        </PurchaseProvider>
                    </ShoppingListProvider>
                </HouseholdProvider>
            </UserProvider>
        </Router>
    );
};

export default App;
