import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

// Components
import ShoppingList from "../ShoppingLists/ShoppingList";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";
// =========================== IMPORTS END ===========================


const HouseholdDetails = () => {
    const { getHouseholdDetail, householdDetail } = useContext(HouseholdContext);
    const { id } = useParams();

    useEffect(() => getHouseholdDetail(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);
    
    if(householdDetail == null) return null;
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                {householdDetail.household.name}
            </Row>
            <Row className="justify-content-md-center">
                <Link to={{pathname:"/shoppingList/new", state:{householdId: id}}}>
                    New Shopping List
                </Link>
            </Row>
            {/* If the household already has lists, display them. Otherwise, show a default message */}
            {householdDetail.shoppingLists.length ?
                <Row>
                {householdDetail.shoppingLists.map(shopList => (
                    <Col key={shopList.id} md="4"><ShoppingList shoppingList={shopList}/></Col>
                ))}
                </Row> : "You don't have any lists yet!"
            }       
        </Container>
    );
};

export default HouseholdDetails;