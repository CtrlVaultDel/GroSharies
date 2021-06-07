// React
import React, { useState, useContext } from 'react';

// Reactstrap
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// Icons
import { FaTrashAlt } from "react-icons/fa";

// Context
import { PurchaseContext } from "../../providers/PurchaseProvider";

// Styles
import "../../styles/purchase.css";

// =========================== IMPORTS END ===========================

const DeletePurchaseModal = ({ purchase, setPurchases }) => {
    const { deletePurchase } = useContext(PurchaseContext);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleDelete = () => {
        deletePurchase(purchase)
        .then(setPurchases)
    };

    return (
        <>
            <Button
                id="deletePurchaseModalButton"
                size="sm" 
                color="danger" 
                onClick={toggle}>
                    <FaTrashAlt />
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Delete a Purchase
                </ModalHeader>
                <ModalBody>
                    Do you want to delete this ${purchase.totalCost} purchase from {purchase.vendor}?
                </ModalBody>
                <ModalFooter id="purchaseModalFooter">

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
                            handleDelete();
                            toggle()}}>
                        Delete Purchase
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeletePurchaseModal;