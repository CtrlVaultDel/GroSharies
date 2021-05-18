import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';

// Icons
import { FaTrashAlt } from "react-icons/fa";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

// =========================== IMPORTS END ===========================

const DeleteHouseholdModal = ({ household }) => {
    const { deleteHousehold } = useContext(HouseholdContext);
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
                    Are you sure you want to delete "{household.name}"? 
                    All Shopping Lists associated with this household will also be deleted.           
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
                        onClick={() => {
                            deleteHousehold(household.id);
                            toggle()}}>
                        Delete "{household.name}"
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeleteHouseholdModal;