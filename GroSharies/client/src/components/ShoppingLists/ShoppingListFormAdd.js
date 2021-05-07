import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

// Context
import { ShoppingListContext } from "../../providers/ShoppingListProvider";
// =========================== IMPORTS END ===========================


const ShoppingListFormAdd = () => {
    const { saveShoppingList } = useContext(ShoppingListContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    // Get the relevant householdId
    const location = useLocation();
    const householdId = location.state.householdId;

    // Set the initial state of the shoppingList
    const [shoppingList, setShoppingList] = useState({
        householdId: householdId,
        name: "",
    });
    
    // Handles updating the state of household as the user updates the form
    const handleInput = e => {
        const newShoppingList = { ...shoppingList };
        newShoppingList[e.target.id] = e.target.value;
        setShoppingList(newShoppingList);
    }

    const handleSave = () => {
        if(shoppingList.name === "") return window.alert("Please enter a shoppingList name");

        // Disables the save button until finished
        setIsLoading(true)
        // Save the household object to the database
        saveShoppingList({
            householdId: shoppingList.householdId,
            name: shoppingList.name
        })
        .then(() => history.push(`/household/${householdId}`));
    }

    return (
        <>
            <form className="shoppingListForm">
                <h2 className="shoppingListForm-title">Add a new shopping list</h2>

                {/* Name Input */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Shopping List Name: </label>
                        <input
                            autoComplete="off"
                            type="text"
                            id="name"
                            onChange={handleInput}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Name"
                            value={shoppingList.name}
                        />
                    </div>
                </fieldset>

                {/* Save Button */}
                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={(event) => {
                    event.preventDefault();
                    handleSave();
                    }}
                >
                    Add Shopping List
                </button>
            </form>
        </>
    );
};

export default ShoppingListFormAdd;