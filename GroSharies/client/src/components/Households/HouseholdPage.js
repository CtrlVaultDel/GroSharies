import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Card } from "reactstrap";

// Styles
import "../../styles/index.css";

// Components
import Household from "./Household";
import AddHouseholdModal from "./AddHouseholdModal";

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
                                />
                        </Col>
                    ))
                    :
                    <Card style={{padding:"10px", maxWidth:"200px"}} className="shadow postCard">
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