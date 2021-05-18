import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';

// Icons
import { FaMinus } from "react-icons/fa";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

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
                <ModalFooter style={{display:"block"}}>

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