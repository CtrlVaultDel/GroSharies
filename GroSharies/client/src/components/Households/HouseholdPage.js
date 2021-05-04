import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { HouseholdContext } from "../../providers/HouseholdProvider";
import Household from "./Household";

const HouseholdPage = () => {
    const { households, getHouseholds } = useContext(HouseholdContext);

    useEffect(() => {
        getHouseholds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(households);
    return (
    <Container>
        <Row className="justify-content-md-center">
            <Link to="/household/new" className="nav-link">
                New Household
            </Link> 
        </Row>
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
    );
};

export default HouseholdPage;