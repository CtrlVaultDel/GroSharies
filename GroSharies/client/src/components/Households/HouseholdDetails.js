import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row  } from "reactstrap";

// Styles
import "../../styles/index.css";

// Components
import ShoppingList from "../ShoppingLists/ShoppingList";
import AddShoppingListModal from "../ShoppingLists/AddShoppingListModal";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";
// =========================== IMPORTS END ===========================


const HouseholdDetails = () => {
    const { getHouseholdDetail } = useContext(HouseholdContext);
    const [householdDetail, setHouseholdDetail] = useState()
    const { id } = useParams();

    useEffect(() => {
        getHouseholdDetail(id)
        .then(setHouseholdDetail)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);
    
    if(!householdDetail) return null;
    
    return (
        <>
            <Col id="pageHeader">
                <Row className="justify-content-center">
                    <h1> Shopping Lists</h1>
                    <AddShoppingListModal householdId = {householdDetail.household.id} setHouseholdDetail = {setHouseholdDetail}/>
                </Row>
                <Row className="justify-content-center">
                    <h2>({householdDetail.household.name})</h2>
                </Row>
            </Col>
            <Container>

                {/* If the household already has lists, display them. Otherwise, show a default message */}
                {householdDetail.shoppingLists.length ?
                    <Row className="justify-content-center">
                    {householdDetail.shoppingLists.map(shopList => (
                        <Col key={shopList.id} md="4"><ShoppingList shoppingList={shopList} setHouseholdDetail={setHouseholdDetail}/></Col>
                    ))}
                    </Row> 
                    : 
                    "You don't have any lists yet!"
                }       
            </Container>
        </>
    );
};

export default HouseholdDetails;