import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

// Context
import { ShoppingListContext } from "../../providers/ShoppingListProvider";
// =========================== IMPORTS END ===========================


const ShoppingListFormEdit = () => {
    const history = useHistory();
    const { id } = useParams();
    const { updateShoppingList, getShoppingList } = useContext(ShoppingListContext);
    const [isLoading, setIsLoading] = useState(false);
    const [shoppingList, setShoppingList] = useState({
        id: id,
        householdId: 0,
        name: "",
        dateCreated: ""
    });

    useEffect(() => {
        getShoppingList(id)
        .then(resp => setShoppingList(resp.shoppingList))
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    // Handles updating the state of household as the user updates the form
    const handleInput = e => {
        const newShoppingList = { ...shoppingList };
        newShoppingList[e.target.id] = e.target.value;
        setShoppingList(newShoppingList);
    }

    const handleSave = () => {
        if(shoppingList.name === "") return window.alert("Please enter a shopping list name");

        // Disables the update button until finished
        setIsLoading(true)

        // Update the existing household in the database
        updateShoppingList({
            id: shoppingList.id,
            householdId: shoppingList.householdId,
            name: shoppingList.name,
            dateCreated: shoppingList.dateCreated
        })
        .then(() => history.push(`/household/${shoppingList.householdId}`));
    }

    return (
        <>
            <form className="shoppingListForm">
                <h2 className="shoppingListForm-title">Update your shopping list</h2>

                {/* Name Input */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Name: </label>
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

                {/* Update Button */}
                <button
                    className="btn btn-secondary"
                    disabled={isLoading}
                    onClick={(event) => {
                    event.preventDefault();
                    handleSave();
                    }}
                >
                    Update Shopping List
                </button>
            </form>
        </>
        );
};

export default ShoppingListFormEdit;