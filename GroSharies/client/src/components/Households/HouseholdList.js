import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { HouseholdUserContext } from "../../providers/HouseholdUserProvider";
import Household from "./Household";

const HouseholdList = () => {
    const { userHouseholds, getUserHouseholds } = useContext(HouseholdUserContext);

    useEffect(() => {
        getUserHouseholds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <Container>
        <Row className="justify-content-md-center">
            <Link to="/household/new" className="nav-link">
                New Household
            </Link> 
        </Row>
        <Row>
            {userHouseholds.map((uh) => (
                <Col 
                    key={uh.household.id} 
                    md="4">
                        <Household 
                            household = {uh.household} 
                            isAdmin = {uh.relation.userTypeId} 
                            isAccepted = {uh.relation.isAccepted}
                        />
                </Col>
            ))}
        </Row>
    </Container>
    );
};

export default HouseholdList;