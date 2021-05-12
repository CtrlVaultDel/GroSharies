import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, UncontrolledTooltip } from 'reactstrap';

// Icons
import { FaRegEdit } from "react-icons/fa";

// Context
import { ShoppingListContext } from "../../providers/ShoppingListProvider";

// =========================== IMPORTS END ===========================

const EditShoppingListModal = ({ shoppingList, setHouseholdDetail }) => {
    const { updateShoppingList } = useContext(ShoppingListContext);
    const [isLoading, setIsLoading] = useState(false);

    const initialState = {
        id: shoppingList.id,
        householdId: shoppingList.householdId,
        name: shoppingList.name,
        dateCreated: shoppingList.dateCreated
    }

    const [editedShoppingList, setEditedShoppingList] = useState(initialState);
    const [modal, setModal] = useState(false);
    
    // Handles updating the state of newListItem as the user updates the form
    const handleInput = e => {
        const newShoppingList = { ...editedShoppingList };
        newShoppingList[e.target.id] = e.target.value;
        setEditedShoppingList(newShoppingList);
    };

    // Called when the user submits the new purchase form
    const handleUpdate = () => {
        if(editedShoppingList.name === "") return window.alert("Please enter an name");

        // Disables the save button until finished
        setIsLoading(true);

        // Save the purchase object to the database
        updateShoppingList({
            id: editedShoppingList.id,
            householdId: editedShoppingList.householdId,
            name: editedShoppingList.name,
            dateCreated: editedShoppingList.dateCreated
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
            <Button 
                id={"editShoppingListButton"+shoppingList.id}
                size="sm" 
                color="warning" 
                onClick={toggle} >
                    <FaRegEdit />
            </Button>
            <UncontrolledTooltip
                placement="bottom"
                target={"editShoppingListButton"+shoppingList.id}
            >
                Edit Shopping List
            </UncontrolledTooltip>
            <Modal isOpen={modal} toggle={toggle} onClosed={() => setEditedShoppingList(initialState)}>
                <ModalHeader toggle={toggle}>Edit Shopping List</ModalHeader>
                <ModalBody>
                    <Form className="shoppingListEditForm" onSubmit={(e) => {
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
                                value={editedShoppingList.name}
                            />
                        </FormGroup>

                        {/* Cancel Button */}
                        <Button 
                            color="secondary" 
                            onClick={
                                () =>{
                                toggle();
                                setEditedShoppingList(initialState)
                            }}>
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
                            Update Shopping List
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default EditShoppingListModal;