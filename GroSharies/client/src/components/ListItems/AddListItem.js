// React
import React, { useContext, useState } from "react";

// Reactstrap
import { Button, Form, Input, InputGroup} from "reactstrap";

// Components
import { ListItemContext } from "../../providers/ListItemProvider";

// =========================== IMPORTS END ===========================

const AddListItem = ({ shoppingListId, setListItems}) => {

    // Initial state of the newListItem (used to initialize and also reset after submitting a new item)
    const initialState = {
        id: 0,
        shoppingList: 0,
        name: "",
        isChecked: false
    };

    const { saveListItem } = useContext(ListItemContext);
    const [isLoading, setIsLoading] = useState(false);
    const [newListItem, setNewListItem] = useState (initialState);

    // Handles updating the state of newListItem as the user updates the form
    const handleInput = e => {
        const toSaveItem = { ...newListItem };
        toSaveItem[e.target.id] = e.target.value;
        setNewListItem(toSaveItem);
    };
    
    // Called when the user submits the new listItem form
    const handleSave = () => {
        if(newListItem.name === "") return window.alert("Please enter a list item");
        
        // Disables the save button until finished
        setIsLoading(true);
        
        // Save the listItem object to the database
        saveListItem({
            id: 0,
            shoppingListId: shoppingListId,
            name: newListItem.name,
            isChecked: newListItem.isChecked
        })
        .then(res => {
            setListItems(res);
            setNewListItem(initialState);
        })
        .then(setIsLoading(false))
    };

    return(
        <Form className="listItemForm" onSubmit={(e) => {
            e.preventDefault()
            handleSave()}}>
            <InputGroup className="text-center">          
                <Input 
                    autoComplete="off"
                    type="text" 
                    id="name" 
                    placeholder="New Item"
                    required
                    autoFocus
                    value = {newListItem.name}
                    onChange = {handleInput}
                />
                <Button 
                    type="submit"
                    color="secondary" 
                    disabled={isLoading}
                    onClick={event => {
                        event.preventDefault();
                        handleSave();
                    }}>
                        Add Item
                </Button>
            </InputGroup>
        </Form>
    );
};

export default AddListItem;