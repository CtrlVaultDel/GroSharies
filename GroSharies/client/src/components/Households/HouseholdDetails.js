import React, { useContext, useState, useEffect } from "react";
import { HouseholdContext } from "../../providers/HouseholdProvider";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import ShoppingList from "../ShoppingLists/ShoppingList";

const HouseholdDetails = () => {
    const [ householdDetail, setHouseholdDetail ] = useState();
    const { getHousehold } = useContext(HouseholdContext);
    const { id } = useParams();

    useEffect(() => {
    getHousehold(id)
    .then(setHouseholdDetail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if(householdDetail == null) return null;
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                {householdDetail.household.name}
            </Row>
            <Row className="justify-content-md-center">
                <Link to="/shoppingList/new" className="nav-link">
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