// React
import React, { useContext, useEffect } from "react";

// Reactstrap
import { Card, Col, Container, Row } from "reactstrap";

// Components
import Household from "./Household";
import AddHouseholdModal from "./AddHouseholdModal";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

// Styles
import "../../styles/household.css";

// =========================== IMPORTS END ===========================


const HouseholdPage = () => {
    const { households, getHouseholds } = useContext(HouseholdContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getHouseholds, [])

    return (
        <>
            <Row className="justify-content-center" id="pageHeader">
                <h1>Your Households</h1>
                <AddHouseholdModal />
            </Row>
            <Container>
                <Row className="justify-content-center">
                    {households.length ? households.map((h) => (
                        <Col 
                            key={h.household.id} 
                            md="4">
                                <Household 
                                    household = {h.household} 
                                    userType = {h.relation.userTypeId} 
                                    isAccepted = {h.relation.isAccepted}
                                    numLists = {h.numLists}
                                    numUsers = {h.numUsers}
                                    users = {h.userDetails}
                                />
                        </Col>
                    ))
                    :
                    <Card id="householdBasicCard" className="shadow postCard">
                        <div>You are not in any households yet!</div>
                        <div>Click the plus button above to create a new one or ask someone to invite you to theirs!</div>
                    </Card>
                }
                </Row>
            </Container>
        </>
    );
};

export default HouseholdPage;