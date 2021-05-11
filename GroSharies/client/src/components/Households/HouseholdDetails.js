import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

// Styles
import "../../styles/index.css";

// Icons
import { FaPlusCircle } from "react-icons/fa";

// Components
import ShoppingList from "../ShoppingLists/ShoppingList";

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
            <Row className="justify-content-md-center" id="pageHeader">
                <h1> Shopping Lists ({householdDetail.household.name})</h1>
                <Link id="mainAddButton" to={{pathname:"/shoppingList/new", state:{householdId: id}}}>
                    <FaPlusCircle />
                </Link>
            </Row>
            <Container>

                {/* If the household already has lists, display them. Otherwise, show a default message */}
                {householdDetail.shoppingLists.length ?
                    <Row>
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