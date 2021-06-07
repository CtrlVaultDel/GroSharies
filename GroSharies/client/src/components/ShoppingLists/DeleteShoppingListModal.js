// React
import React, { useState, useContext } from 'react';

// Reactstrap
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';

// Context
import { ShoppingListContext } from "../../providers/ShoppingListProvider";

// Icons
import { FaTrashAlt } from "react-icons/fa";

import "../../styles/shoppingList.css";

// =========================== IMPORTS END ===========================

const DeleteShoppingListModal = ({ shoppingList, setHouseholdDetail }) => {
    const { deleteShoppingList } = useContext(ShoppingListContext);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleDelete = () => {
        deleteShoppingList(shoppingList)
        .then(setHouseholdDetail);
    };

    return (
        <>
            {/* Delete button that appears below a shoppingList Card */}
            <Button 
                id={"deleteShoppingListButton"+shoppingList.id} 
                size="sm" 
                color="danger" 
                onClick={toggle}>
                    <FaTrashAlt />
            </Button>

            {/* Displays a small tooltip below the button above while hovering over it */}
            <UncontrolledTooltip
                trigger="hover"
                placement="bottom"
                target={"deleteShoppingListButton"+shoppingList.id}>
                Delete ShoppingList
            </UncontrolledTooltip>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Delete a ShoppingList</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete "{shoppingList.name}"? 
                    All "To-Get" Items and Purchases associated with the list will also be deleted.          
                </ModalBody>
                <ModalFooter id="deleteShoppingListModalFooter">

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
                            toggle();
                        }}>
                        Delete "{shoppingList.name}"
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default DeleteShoppingListModal;