import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, Col, FormGroup, Label, Input } from 'reactstrap';

// Icons
import { FaAddressBook } from "react-icons/fa";

// Components
import { HouseholdContext } from "../../providers/HouseholdProvider";
// =========================== IMPORTS END ===========================


const HouseholdInvite = ({household}) => {
    const { sendInvite } = useContext(HouseholdContext);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    const [invitation, setInvitation] = useState({
        householdId: household.id,
        email: ""
    });

    // Handles updating the state of the invitation as the user updates the form
    const handleInput = e => {
        const newInvitation = { ...invitation };
        newInvitation[e.target.id] = e.target.value;
        setInvitation(newInvitation);
    };

    // Called when the user submits the new purchase form
    const handleInvite = () => {
        if(invitation.email === "") return window.alert("Please enter a user's email");

        // Disables the save button until finished
        setIsLoading(true);

        // Tell the DB to create a new table row in the HouseholdUser Table
        sendInvite({
            householdId: invitation.householdId,
            email: invitation.email
        })
        toggle();
    };

    return (
        <>
            <Col className="text-center">
                <Button size="sm" color="success" onClick={toggle}><FaAddressBook /></Button>
            </Col>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>New Invitation for {household.name} Household</ModalHeader>
                <ModalBody>
                    <Form className="invitationForm">

                        {/* Email Input */}
                        <FormGroup>
                            <Label for="email">Email </Label>
                            <Input
                                autoComplete="off"
                                type="email"
                                id="email"
                                onChange={handleInput}
                                required
                                autoFocus
                                placeholder="User Email"
                                value={invitation.email}
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
                            handleInvite();
                            }}
                        >
                            Invite User
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default HouseholdInvite;