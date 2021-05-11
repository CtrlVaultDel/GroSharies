import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

// Icons
import { FaRegEdit } from "react-icons/fa";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

// =========================== IMPORTS END ===========================

const EditHouseholdModal = ({ household }) => {
    const { updateHousehold } = useContext(HouseholdContext);
    const [isLoading, setIsLoading] = useState(false);

    const initialState = {
        id: household.id,
        name: household.name
    }

    const [editedHousehold, setEditedHousehold] = useState(initialState);
    const [modal, setModal] = useState(false);
    
    // Handles updating the state of newListItem as the user updates the form
    const handleInput = e => {
        const newHousehold = { ...editedHousehold };
        newHousehold[e.target.id] = e.target.value;
        setEditedHousehold(newHousehold);
    };

    // Called when the user submits the new purchase form
    const handleUpdate = () => {
        if(editedHousehold.name === "") return window.alert("Please enter an name");

        // Disables the save button until finished
        setIsLoading(true);

        // Save the purchase object to the database
        updateHousehold({
            id: editedHousehold.id,
            name: editedHousehold.name,
        })
        .then(() => {
            setIsLoading(false);
            toggle();
        })
    };

    const toggle = () => setModal(!modal);

    return (
        <>
            <Button size="sm" color="warning" onClick={toggle} ><FaRegEdit /></Button>
            <Modal isOpen={modal} toggle={toggle} onClosed={() => setEditedHousehold(initialState)}>
                <ModalHeader toggle={toggle}>Edit Household</ModalHeader>
                <ModalBody>
                    <Form className="householdEditForm">

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
                                value={editedHousehold.name}
                            />
                        </FormGroup>

                        {/* Cancel Button */}
                        <Button 
                            color="secondary" 
                            onClick={
                                () =>{
                                toggle();
                                setEditedHousehold(initialState)
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
                            Update Household
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default EditHouseholdModal;