import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, UncontrolledTooltip } from 'reactstrap';

// Icons
import { FaTrashAlt } from "react-icons/fa";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

// =========================== IMPORTS END ===========================

const DeleteHouseholdModal = ({ household }) => {
    const { deleteHousehold } = useContext(HouseholdContext);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <Button 
                id={"deleteHouseholdButton"+household.id} 
                size="sm" 
                color="danger" 
                onClick={toggle}>
                    <FaTrashAlt />
                </Button>
                <UncontrolledTooltip
                    trigger="hover"
                    placement="bottom"
                    target={"deleteHouseholdButton"+household.id}>
                    Delete Household
                </UncontrolledTooltip>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Delete a Household</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete the {household.name} household?            
                    {/* Cancel Button */}
                    <Button 
                        color="secondary" 
                        onClick={toggle}>
                        Cancel
                    </Button>

                    {/* Delete Button */}
                    <Button
                        className="btn btn-danger float-right"
                        disabled={isLoading}
                        onClick={(event) => {
                            event.preventDefault();
                            deleteHousehold(household.id);
                            toggle();
                        }}>
                        Delete "{household.name}" Household
                    </Button>
                </ModalBody>
            </Modal>
        </>
    );
}

export default DeleteHouseholdModal;