// React
import React, { useState, useContext } from 'react';

// Reactstrap
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

// Icons
import { FaTrashAlt } from "react-icons/fa";

// Styles
import "../../styles/household.css";

// =========================== IMPORTS END ===========================

const DeleteHouseholdModal = ({ household }) => {
    const { deleteHousehold } = useContext(HouseholdContext);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleDelete = () => {
        deleteHousehold(household.id);
        toggle();
    };

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
                    Are you sure you want to delete "{household.name}"? 
                    All Shopping Lists associated with this household will also be deleted.           
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
                        onClick={handleDelete}>
                        Delete "{household.name}"
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeleteHouseholdModal;