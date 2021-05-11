import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

// Styles
import "../../styles/index.css";

// Icons
import { FaPlusCircle } from "react-icons/fa";

// Components
import Household from "./Household";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";
// =========================== IMPORTS END ===========================


const HouseholdPage = () => {
    const { households, getHouseholds } = useContext(HouseholdContext);

    useEffect(() => {
        getHouseholds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row className="justify-content-md-center" id="PageHeader">
                <h1>Your Households</h1>
                <Link id="mainAddButton" to="/household/new">
                    <FaPlusCircle />
                </Link> 
            </Row>
            <Container>
                <Row>
                    {households.map((h) => (
                        <Col 
                            key={h.household.id} 
                            md="4">
                                <Household 
                                    household = {h.household} 
                                    userType = {h.relation.userTypeId} 
                                    isAccepted = {h.relation.isAccepted}
                                    numLists = {h.numLists}
                                    numUsers = {h.numUsers}
                                />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default HouseholdPage;