// React
import React, { useState, useContext } from 'react';

// Reactstrap
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

// Icons
import { FaMinus } from "react-icons/fa";

// Styles
import "../../styles/household.css";

// =========================== IMPORTS END ===========================

const DeclineInviteModal = ({ household }) => {
    const { declineInvite } = useContext(HouseholdContext);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleDecline = () => {
        declineInvite(household.id);
        toggle();
    };

    return (
        <>
           <Button 
                id={"declineInviteButton"+household.id} 
                onClick={toggle}
                size="sm" 
                color="danger">
                    <FaMinus/>
            </Button>
            <UncontrolledTooltip
                trigger="hover"
                placement="bottom"
                target={"declineInviteButton"+household.id}>
                Decline Invite
            </UncontrolledTooltip>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Decline Invitation</ModalHeader>
                <ModalBody>
                    Decline invite to {household.name}?         
                </ModalBody>
                <ModalFooter id="householdModalFooter">

                    {/* Cancel Button */}
                    <Button 
                        color="secondary"
                        className="float-left" 
                        onClick={toggle}>
                        Cancel
                    </Button>

                    {/* Delete Button */}
                    <Button
                        color="danger"
                        className="float-right"
                        onClick={handleDecline}>
                        Decline Invitation
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeclineInviteModal;