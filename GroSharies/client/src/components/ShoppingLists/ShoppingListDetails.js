import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Table, Button } from "reactstrap";
import {ShoppingListContext} from "../../providers/ShoppingListProvider";
import PurchaseRow from "../Purchases/PurchaseRow";

const ShoppingListDetails = () => {
    const { getShoppingList } = useContext(ShoppingListContext);

    /*
    shoppingListDetails = {
        shoppingList,
        listItems,
        purchases
    }
    */
    // shopListDet == shoppingListDetails
    const [ shopListDet, setShopListDet] = useState()
    const { id } = useParams();

    useEffect(() => {
        getShoppingList(id)
        .then(setShopListDet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if(shopListDet == null) return null;
    
    // Destructure the ShoppingListDetails object
    const { shoppingList, listItems, purchases } = shopListDet;

    const getCheckedItems = items => items.filter(li => li.isChecked === true);
    const getUncheckedItems = items => items.filter(li => li.isChecked === false);

    const checkedItems = getCheckedItems(listItems);
    const uncheckedItems = getUncheckedItems(listItems);

    const handleChange = item => console.log("Item Changed", item.name, item.isChecked);

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
                    {uncheckedItems.length? uncheckedItems.map(i => 
                        <tbody key={i.id}>
                            <tr>
                                <td>{i.name}</td>
                            </tr>
                        </tbody>                       
                    ) : null
                    }
                    {checkedItems.length? checkedItems.map(i => 
                        <tbody key={i.id}>
                            <tr>
                                <td>{i.name}</td>
                            </tr>
                        </tbody>
                         
                    ) : null
                    }
                </Table>
            </Row>

            <h2>Purchases</h2>

            <Row>
                <input placeholder="New Purchase" />
                <Button>Add Purchase</Button>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <td>Name</td>
                        <td>Vendor</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {/* If any purchases exist, use the PurchaseRow component to inject them into the table */}
                    {purchases.length? purchases.map(p => (
                        <PurchaseRow key = {p.purchase.id} purchaseDetail = {p} />)
                        ) : <tr>
                                <th>N/A</th>
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