import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

// Icons
import { FaPlusCircle } from "react-icons/fa";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

// =========================== IMPORTS END ===========================

const EditHouseholdModal = () => {
    const { saveHousehold } = useContext(HouseholdContext);
    const [isLoading, setIsLoading] = useState(false);

    const initialState = {name: ""}

    const [household, setHousehold] = useState(initialState);
    const [modal, setModal] = useState(false);
    
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

    const toggle = () => setModal(!modal);

    return (
        <>
            <Button size="lg" style={{padding:"0", border: "none", background:"none", marginLeft:"10px", marginBottom:"10px"}} onClick={toggle} ><FaPlusCircle /></Button>
            <Modal isOpen={modal} toggle={toggle} onClosed={() => setHousehold(initialState)}>
                <ModalHeader toggle={toggle}>Add Household</ModalHeader>
                <ModalBody>
                    <Form className="householdAddForm"onSubmit={(e) => {
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
                                value={household.name}
                            />
                        </FormGroup>

                        {/* Cancel Button */}
                        <Button 
                            color="secondary" 
                            onClick={
                                () =>{
                                toggle();
                                setHousehold(initialState)
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
                            Save Household
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default EditHouseholdModal;