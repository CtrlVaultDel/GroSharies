import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaRegEdit } from "react-icons/fa";

// =========================== IMPORTS END ===========================

const EditListItemModal = ({ updateListItem, listItem, setListItems}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    
    // Note (UserId will be derived from the server-side)
    
    const [newListItem, setNewListItem] = useState (listItem);

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
            isChecked: newListItem.isChecked
        })
        .then(setListItems)
        .then(setIsLoading(false));
    };

    const toggle = () => setModal(!modal);

    return (
        <>
            <Button className="ml-2" color="warning" onClick={toggle}><FaRegEdit /></Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Edit List Item</ModalHeader>
                <ModalBody>
                    <Form className="purchaseForm">

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
                            onClick={toggle}>Cancel
                        </Button>

                        {/* Save Button */}
                        <Button
                            className="btn btn-success float-right"
                            disabled={isLoading}
                            onClick={(event) => {
                            event.preventDefault();
                            handleUpdate();
                            toggle();
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