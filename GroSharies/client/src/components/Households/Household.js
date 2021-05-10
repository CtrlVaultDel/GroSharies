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
                    {/* Edit button for Household */}
                    <Col className="text-center">
                        <Button size="sm" color="warning" onClick={() => history.push(`/household/edit/${household.id}`)}><FaRegEdit /></Button>
                    </Col>

                    {/* Delete button for Household */}
                    <Col className="text-center">
                        <Button size="sm" color="danger" onClick={() => deleteWarning()}><FaTrashAlt /></Button>
                    </Col>
                </>)
        };
    };

    const checkIfAccepted = () => {
        if(isAccepted){
            return (<HouseholdInvite household={household} />)
        }
        else{
            return (
                <>
                    {/* Accept button for invitation */}
                    <Col Col className="text-center">
                        <Button color="success">Accept Invite</Button>
                    </Col>

                    {/* Decline button for invitation */}
                    <Col Col className="text-center">
                        <Button color="danger">Decline Invite</Button>
                    </Col>
                </>
            )
        }
    }

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
                    {checkIfAccepted()}
                    {checkIfAdmin()}
                </Row>
            </CardFooter>        
        </Card>
    )
};

export default Household;