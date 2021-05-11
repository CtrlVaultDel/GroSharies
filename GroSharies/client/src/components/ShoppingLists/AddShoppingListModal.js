import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

// Icons
import { FaPlusCircle } from "react-icons/fa";

// Context
import { ShoppingListContext } from "../../providers/ShoppingListProvider";

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

    const toggle = () => setModal(!modal);

    return (
        <>
            <Button size="lg" style={{padding:"0", border: "none", background:"none"}} onClick={toggle} ><FaPlusCircle /></Button>
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
                            onClick={
                                () =>{
                                toggle();
                                setShoppingList(initialState)
                            }}>
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