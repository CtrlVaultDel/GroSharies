import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Table, Button } from "reactstrap";
import {ShoppingListContext} from "../../providers/ShoppingListProvider";
import PurchaseRow from "../Purchases/PurchaseRow";
import AddPurchaseModal from "../Purchases/AddPurchaseModal";
import AddListItem from "../ListItems/AddListItem";

const ShoppingListDetails = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [listItems, setListItems] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const { getShoppingList } = useContext(ShoppingListContext);
    const { id } = useParams();

    const checkedItems = 
    useEffect(() => {
        getShoppingList(id)
        .then(resp => {
            setShoppingList(resp.shoppingList);
            setListItems(resp.listItems);
            setPurchases(resp.purchases);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(!shoppingList) return null;
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                {shoppingList.name}
            </Row>
            <Row className="justify-content-md-center">
                <input placeholder="New Item" />
                <Button>Add Item</Button>
            </Row>
            <Row>
                <Table bordered size="sm">
                    <thead className="text-center">
                        <tr>
                            <th>Item Name</th>                            
                        </tr>
                    </thead> 
                    <tbody>
                    {listItems.length? listItems.map(i => 
                        <tr key={i.id}>
                            <td>{i.name}</td>
                        </tr>
                        ) : <tr><td>No items yet!</td></tr>
                    }
                    </tbody>
                </Table>
            </Row>

            {/* ==================== PURCHASES ==================== */}
            <h2 className="text-center">Purchases</h2>
            <AddPurchaseModal shoppingList = {shoppingList} setPurchases = {setPurchases} />
            <Table dark striped bordered hover>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Name</td>
                        <td>Vendor</td>
                        <td>Amount</td>
                        <td>Modify</td>
                    </tr>
                </thead>
                <tbody>
                    {/* If any purchases exist, use the PurchaseRow component to inject them into the table */}
                    {purchases.length? purchases.map(p => (
                        <PurchaseRow key = {p.purchase.id} purchaseDetail = {p} shoppingList = {shoppingList} setPurchases = {setPurchases} />)
                        )
                            : <tr>
                                <td>N/A</td>
                                <td>N/A</td>
                                <td>N/A</td>
                                <td>N/A</td>
                                <td>N/A</td>
                            </tr>
                    }
                </tbody>
            </Table>
        </Container>
    );
};

export default ShoppingListDetails;