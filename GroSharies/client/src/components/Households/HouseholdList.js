import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { HouseholdContext } from "../../providers/HouseholdProvider";
import Household from "./Household";

const HouseholdList = () => {
  const { households, getAllHouseholds } = useContext(HouseholdContext);

  useEffect(() => {
    getAllHouseholds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
        <Link to="/households/add" className="nav-link">
            New Household
        </Link> 
        <Row>
            {households.map((h) => (
                <Col key={h.id} md="4"><Household household={h} /></Col>
            ))}
        </Row>
    </Container>
  );
};

export default HouseholdList;