import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { PurchaseContext } from "../../providers/PurchaseProvider";

const AddPurchaseModal = ({shoppingList}) => {
    const { savePurchase } = useContext(PurchaseContext);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const currentDate = new Date();

    // Note (UserId will be derived from the server-side)
    const [purchase, setPurchase] = useState({
        shoppingListId: shoppingList.id,
        userId: 0,
        vendor: "",
        purchaseDate: currentDate.toLocaleDateString('en-CA'),
        totalCost: 0
    });

    // Handles updating the state of purchase as the user updates the form
    const handleInput = e => {
        const newPurchase = { ...purchase };
        purchase[e.target.id] = e.target.value;
        setPurchase(newPurchase);
    };

    // Called when the user submits the new purchase form
    const handleSave = () => {
        if(purchase.vendor === "") return window.alert("Please enter a vendor");
        if(purchase.purchaseDate === "") return window.alert("Please enter a purchase date");
        if(purchase.totalCost === 0) return window.alert("Please enter an amount");

        // Disables the save button until finished
        setIsLoading(true);

        // Save the purchase object to the database
        savePurchase({
            shoppingListId: shoppingList.id,
            userId: purchase.userId,
            vendor: purchase.vendor,
            purchaseDate: purchase.purchaseDate,
            totalCost: purchase.totalCost
        });
    };

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="success" onClick={toggle}>New Purchase</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>New Purchase for {shoppingList.name}</ModalHeader>
                <ModalBody>
                    <Form className="purchaseForm">

                        {/* Vendor Input */}
                        <FormGroup>

                            <Label for="vendor">Vendor </Label>
                            <Input
                                type="text"
                                id="vendor"
                                onChange={handleInput}
                                required
                                autoFocus
                                placeholder="Vendor"
                                value={purchase.vendor}
                            />
                        </FormGroup>

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

                        {/* TotalCost Input */}
                        <FormGroup>
                            <Label for="totalCost">Total Cost </Label>
                            <Input
                                type="float"
                                id="totalCost"
                                onChange={handleInput}
                                required
                                placeholder= "0"
                                value={purchase.totalCost}
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
                            handleSave();
                            }}
                        >
                            Add Purchase
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default AddPurchaseModal;