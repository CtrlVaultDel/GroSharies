// React
import React, { useState } from 'react';

// Reactstrap
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';

// Icons
import { FaRegEdit } from "react-icons/fa";

// =========================== IMPORTS END ===========================

const EditListItemModal = ({ updateListItem, listItem, setListItems}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    const initialState = {
        id: listItem.id,
        shoppingListId: listItem.shoppingListId,
        name: listItem.name,
        isChecked: Boolean
    }

    const [newListItem, setNewListItem] = useState(initialState)

    // Handles updating the state of newListItem as the user updates the form
    const handleInput = e => {
        const item = { ...newListItem };
        item[e.target.id] = e.target.value;
        setNewListItem(item);
    };

    // Called when the user submits the new purchase form
    const handleUpdate = () => {
        if(newListItem.name === "") return window.alert("Please enter an name");
        
        // Disables the save button until finished
        setIsLoading(true);

        // Save the purchase object to the database
        updateListItem({
            id: newListItem.id,
            shoppingListId: newListItem.shoppingListId,
            name: newListItem.name,
            isChecked: listItem.isChecked
        })
        .then(setListItems)
        .then(() => {
            setIsLoading(false);
            toggle();
        })
    };

    return (
        <>
            <Button className="ml-2" color="warning" onClick={toggle} ><FaRegEdit /></Button>
            <Modal isOpen={modal} toggle={toggle} onClosed={() => setNewListItem(initialState)}>
                <ModalHeader toggle={toggle}>Edit List Item</ModalHeader>
                <ModalBody>
                    <Form className="purchaseForm" onSubmit={(e) => {
                        e.preventDefault()
                        handleUpdate()
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
                                value={newListItem.name}
                            />
                        </FormGroup>

                        {/* Cancel Button */}
                        <Button 
                            color="secondary" 
                            onClick={toggle}>
                            Cancel
                        </Button>

                        {/* Save Button */}
                        <Button
                            className="btn btn-success float-right"
                            disabled={isLoading}
                            onClick={(event) => {
                            event.preventDefault();
                            handleUpdate();
                            }}
                        >
                            Update ListItem
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default EditListItemModal;