// React
import React, { useState, useContext } from 'react';

// Reactstrap
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, UncontrolledTooltip } from 'reactstrap';

// Context
import { ShoppingListContext } from "../../providers/ShoppingListProvider";

// Icons
import { FaPlusCircle } from "react-icons/fa";

import "../../styles/shoppingList.css";

// =========================== IMPORTS END ===========================

const AddShoppingListModal = ({ householdId, setHouseholdDetail }) => {
    const { saveShoppingList } = useContext(ShoppingListContext);
    const [isLoading, setIsLoading] = useState(false);

    const initialState = {
        householdId: householdId,
        name: ""
    }

    const [shoppingList, setShoppingList] = useState(initialState);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    // Handles updating the state of newListItem as the user updates the form
    const handleInput = e => {
        const newShoppingList = { ...shoppingList };
        newShoppingList[e.target.id] = e.target.value;
        setShoppingList(newShoppingList);
    };

    // Called when the user submits the new purchase form
    const handleSave = () => {
        if(shoppingList.name === "") return window.alert("Please enter an name");

        // Disables the save button until finished
        setIsLoading(true);

        // Save the purchase object to the database
        saveShoppingList({
            householdId: shoppingList.householdId,
            name: shoppingList.name
        })
        .then(setHouseholdDetail)
        .then(() => {
            setIsLoading(false);
            toggle();
        })
    };

    const handleCancel = () => {
        setShoppingList(initialState);
        toggle();
    };

    return (
        <>
            <Button 
                id = "addShoppingListButton"
                size="lg" 
                onClick={toggle} >
                <FaPlusCircle />
            </Button>
            <UncontrolledTooltip
                trigger="hover"
                placement="right"
                target="addShoppingListButton"
            >
                Add a Shopping List
            </UncontrolledTooltip>
            <Modal isOpen={modal} toggle={toggle} onClosed={() => setShoppingList(initialState)}>
                <ModalHeader toggle={toggle}>New Shopping List</ModalHeader>
                <ModalBody>
                    <Form className="shoppingListAddForm" onSubmit={(e) => {
                        e.preventDefault()
                        handleSave()
                    }}>

                        {/* Name Input */}
                        <FormGroup>
                            <Label for="name">Name </Label>
                            <Input
                                autoComplete="off"
                                type="text"
                                id="name"
                                onChange={handleInput}
                                required
                                autoFocus
                                placeholder="Item Name"
                                value={shoppingList.name}
                            />
                        </FormGroup>
                        {/* Cancel Button */}
                        <Button 
                            color="secondary" 
                            onClick={handleCancel}>
                            Cancel
                        </Button>

                        {/* Save Button */}
                        <Button
                            className="btn btn-success float-right"
                            disabled={isLoading}
                            onClick={(event) => {
                            event.preventDefault();
                            handleSave();
                            }}
                        >
                            Save Shopping List
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default AddShoppingListModal;