import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

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