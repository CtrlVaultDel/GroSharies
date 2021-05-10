import React, { useContext } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

// Icons
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

// Components
import HouseholdInvite from "./HouseholdInvite";
// =========================== IMPORTS END ===========================


const Household = ({ household, userType, isAccepted, numLists, numUsers }) => {

    const history = useHistory();
    const { deleteHousehold } = useContext(HouseholdContext);

    // Determines if the user is an Admin of the related household.
    // If they are, add an edit button to allow them to change its name.
    const checkIfAdmin = () => {
        if(userType === 1) {
            return (
                <>
                    <Col className="text-center">
                        {/* Edit button for Household */}
                        <Button size="sm" color="warning" onClick={() => history.push(`/household/edit/${household.id}`)}><FaRegEdit /></Button>
                    </Col>
                    <Col className="text-center">
                        {/* Delete button for Household */}
                        <Button size="sm" color="danger" onClick={() => deleteWarning()}><FaTrashAlt /></Button>
                    </Col>
                </>)
        };
    };

    const deleteWarning = () => {
        const confirmBox = window.confirm(`Are you sure you wish to delete the ${household.name} household? This action is irreversable.`);
        if (confirmBox){
            deleteHousehold(household.id);
        };
    };
    
    return(
        <Card className="m-2 shadow postCard">
            <CardHeader className="text-center">
                <Link to={`household/${household.id}`}>{household.name}</Link>
            </CardHeader>
            <CardBody>
                <Row>
                    Users: {numUsers}
                </Row>  
                <Row>
                    Lists: {numLists}       
                </Row>   
            </CardBody>  
            <CardFooter>
                <Row>
                    <HouseholdInvite household={household} />
                    {checkIfAdmin()}
                </Row>
            </CardFooter>        
        </Card>
    )
};

export default Household;