import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, InputGroup, InputGroupAddon, Label, Input } from 'reactstrap';
import { FaRegEdit } from "react-icons/fa";

// Components
import { PurchaseContext } from "../../providers/PurchaseProvider";
// =========================== IMPORTS END ===========================


const EditPurchaseModal = ({ shoppingList, priorPurchase, setPurchases}) => {
    const { updatePurchase } = useContext(PurchaseContext);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    
    const priorDate = new Date(priorPurchase.purchase.purchaseDate).toLocaleDateString('en-CA');
    
    const initialState = {
        id: priorPurchase.purchase.id,
        shoppingListId: shoppingList.id,
        userId: priorPurchase.purchase.userId,
        vendor: priorPurchase.purchase.vendor,
        purchaseDate: priorDate,
        totalCost: priorPurchase.purchase.totalCost
    }

    // Note (UserId will be derived from the server-side)
    const [purchase, setPurchase] = useState(initialState);

    // Handles updating the state of purchase as the user updates the form
    const handleInput = e => {
        const newPurchase = { ...purchase };
        newPurchase[e.target.id] = e.target.value;
        setPurchase(newPurchase);
    };

    // Called when the user submits the new purchase form
    const handleUpdate = () => {
        if(purchase.vendor === "") return window.alert("Please enter a vendor");
        if(purchase.totalCost === 0) return window.alert("Please enter an amount");

        // Disables the save button until finished
        setIsLoading(true);

        // Save the purchase object to the database
        updatePurchase({
            id: purchase.id,
            shoppingListId: purchase.shoppingListId,
            userId: purchase.userId,
            vendor: purchase.vendor,
            purchaseDate: purchase.purchaseDate,
            totalCost: purchase.totalCost
        })
        .then(setPurchases)
        .then(() => {
            toggle();
            setIsLoading(false);
        })
    };

    const toggle = () => setModal(!modal);

    return (
        <>
            <Button size="sm" color="warning" onClick={toggle}><FaRegEdit /></Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Edit Purchase for {shoppingList.name}</ModalHeader>
                <ModalBody>
                    <Form className="purchaseForm">

                        {/* PurchaseDate Input */}
                        <FormGroup>
                            <Label for="purchaseDate">Purchase Date </Label>
                            <Input
                                type="date"
                                id="purchaseDate"
                                onChange={handleInput}
                                required
                                value={purchase.purchaseDate}
                            />
                        </FormGroup>

                        {/* Vendor Input */}
                        <FormGroup>
                            <Label for="vendor">Vendor </Label>
                            <Input
                                autoComplete="off"
                                type="text"
                                id="vendor"
                                onChange={handleInput}
                                required
                                autoFocus
                                placeholder="Vendor"
                                value={purchase.vendor}
                            />
                        </FormGroup>

                        {/* TotalCost Input */}
                        <FormGroup>
                            <Label for="totalCost">Total Cost </Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                <Input
                                    autoComplete="off"
                                    type="float"
                                    id="totalCost"
                                    onChange={handleInput}
                                    required
                                    value={purchase.totalCost}
                                />
                            </InputGroup>
                        </FormGroup>

                        {/* Cancel Button */}
                        <Button 
                            color="secondary" 
                            onClick={()=>{
                                toggle();
                                setPurchase(initialState);
                            }}>Cancel
                        </Button>

                        {/* Save Button */}
                        <Button
                            className="btn btn-success float-right"
                            disabled={isLoading}
                            onClick={(event) => {
                            event.preventDefault();
                            handleUpdate();
                            }}
                        >
                            Update Purchase
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default EditPurchaseModal;