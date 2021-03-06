// React
import React, { useEffect, useState, useContext } from 'react';

// Reactstrap
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, UncontrolledTooltip } from 'reactstrap';

// Components
import { HouseholdContext } from "../../providers/HouseholdProvider";
import { UserContext } from "../../providers/UserProvider";

// Icons
import { BsPersonPlus } from "react-icons/bs";

// =========================== IMPORTS END ===========================

const HouseholdInvite = ({household}) => {
    const { inviteUser, getEmailsByHousehold } = useContext(HouseholdContext);
    const { getAllEmails } = useContext(UserContext);

    const [householdEmails, setHouseholdEmails] = useState([]);
    const [emails, setEmails] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        getEmailsByHousehold(household.id)
        .then(setHouseholdEmails) 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllEmails()
        .then(setEmails);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initialState = {
        householdId: household.id,
        email: ""
    }

    const [invitation, setInvitation] = useState(initialState);

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

        // Check to see if the user exists
        if(!emails.includes(invitation.email)){
            setIsLoading(false);
            return window.alert("This email does not exist");
        }

        // Check to see if the user is already part of the household (Invitation pending or not)
        if(householdEmails.includes(invitation.email)) {
            setIsLoading(false);
            return window.alert("This user is already invited or part of the household")
        }

        // Tell the DB to create a new table row in the HouseholdUser Table
        inviteUser({
            householdId: invitation.householdId,
            email: invitation.email
        })
        setIsLoading(false);
        window.alert(`Invitation sent to ${invitation.email}`);
        setInvitation(initialState);
        toggle();
    };

    const handleCancel = () => {
        setInvitation(initialState)
        toggle();
    };

    return (
        <>
            <Button id={"inviteToHouseholdButton"+household.id} size="sm" color="success" onClick={toggle}><BsPersonPlus /></Button>
            <UncontrolledTooltip
                trigger="hover"
                placement="bottom"
                target={"inviteToHouseholdButton"+household.id}
            >
                Invite to Household
            </UncontrolledTooltip>
            <Modal isOpen={modal} toggle={toggle} onClosed={() => setInvitation(initialState)}>
                <ModalHeader toggle={toggle}>New Invitation for {household.name} Household</ModalHeader>
                <ModalBody>
                    <Form className="invitationForm" onSubmit={(e) => {
                        e.preventDefault()
                        handleInvite()
                    }}>

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
                            onClick={handleCancel}>
                                Cancel
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