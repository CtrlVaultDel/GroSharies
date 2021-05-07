import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Table } from "reactstrap";

// Components
import ListItemSection from "../ListItems/ListItemSection";
import PurchaseRow from "../Purchases/PurchaseRow";
import AddPurchaseModal from "../Purchases/AddPurchaseModal";

// Context
import {ShoppingListContext} from "../../providers/ShoppingListProvider";
// =========================== IMPORTS END ===========================


const ShoppingListDetails = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [listItems, setListItems] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const { getShoppingList } = useContext(ShoppingListContext);
    const { id } = useParams();

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
            <h2 className="text-center">{shoppingList.name}</h2>

            {/* ================== List Items ================== */}
            <ListItemSection shoppingListId = {shoppingList.id} listItems = {listItems} setListItems = {setListItems}/>

            {/* ==================== PURCHASES ==================== */}
            <h4 className="text-center">Purchases</h4>

            {/* Button that displays the add purchase modal when clicked */}
            <AddPurchaseModal shoppingList = {shoppingList} setPurchases = {setPurchases} />

            {/* Default  */}
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