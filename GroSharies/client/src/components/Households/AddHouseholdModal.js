import React, { useState, useContext } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, UncontrolledTooltip } from 'reactstrap';

// Icons
import { FaPlusCircle } from "react-icons/fa";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

// Styles
import "../../styles/household.css";

// =========================== IMPORTS END ===========================

const AddHouseholdModal = () => {
    const { saveHousehold } = useContext(HouseholdContext);
    const [isLoading, setIsLoading] = useState(false);

    const initialState = {name: ""}

    const [household, setHousehold] = useState(initialState);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    // Handles updating the state of newListItem as the user updates the form
    const handleInput = e => {
        const newHousehold = { ...household };
        newHousehold[e.target.id] = e.target.value;
        setHousehold(newHousehold);
    };

    // Called when the user submits the new purchase form
    const handleSave = () => {
        if(household.name === "") return window.alert("Please enter an name");

        // Disables the save button until finished
        setIsLoading(true);

        // Save the purchase object to the database
        saveHousehold({
            name: household.name,
        })
        .then(() => {
            setIsLoading(false);
            toggle();
        })
    };

    const handleCancel = () => {
        setHousehold(initialState);
        toggle();
    }

    return (
        <>
            <Button 
                id="addHouseholdButton"
                size="lg"  
                onClick={toggle}>
                <FaPlusCircle />
            </Button>

            <UncontrolledTooltip
                trigger="hover"
                placement="right"
                target="addHouseholdButton"
            >
                Add a Household
            </UncontrolledTooltip>
            <Modal 
                isOpen={modal} 
                toggle={toggle} 
                onClosed={() => setHousehold(initialState)}>
                <ModalHeader toggle={toggle}>Add a Household</ModalHeader>
                <ModalBody>
                    <Form 
                        className="householdAddForm"
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSave()}}>

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
                                placeholder="Household Name"
                                value={household.name}
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
                            Save Household
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default AddHouseholdModal;