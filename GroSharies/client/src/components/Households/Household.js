import React, { useContext } from "react";
import { Button, Col, Card, CardHeader, CardBody, CardFooter, Row, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";

// Styles
import "../../styles/index.css";

// Icons
import { FaCheck, FaDoorOpen, FaMinus } from "react-icons/fa";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

// Components
import HouseholdInvite from "./HouseholdInvite";
import EditHouseholdModal from "./EditHouseholdModal";
import DeleteHouseholdModal from "./DeleteHouseholdModal";
// =========================== IMPORTS END ===========================


const Household = ({ household, userType, isAccepted, numLists, numUsers }) => {

    const { leaveHousehold, acceptInvite, declineInvite } = useContext(HouseholdContext);

    // Determines if the user is an Admin of the related household.
    // If they are, add an edit button to allow them to change its name.
    const checkIfAdmin = () => {
        if(userType === 1) {
            return (
                <>
                    {/* Edit button for Household */}
                    <Col className="text-center">
                        <EditHouseholdModal household = {household}/>
                    </Col>

                    {/* Delete button for Household */}
                    <Col className="text-center">
                        <DeleteHouseholdModal household={household}/>
                    </Col>
                </>)
        };
    };

    const checkIfAccepted = () => {
        if(isAccepted){
            return (
                <>
                    <Col className="text-center">
                        <HouseholdInvite household={household} />
                    </Col>
                    {userType !== 1 ? 
                        <Col className="text-center">
                            <Button 
                                id={"leaveHouseholdButton"+household.id} 
                                size="sm" 
                                color="danger" 
                                onClick={() => leaveWarning()}><FaDoorOpen />
                            </Button>
                            <UncontrolledTooltip
                                trigger="hover"
                                placement="bottom"
                                target={"leaveHouseholdButton"+household.id}
                            >
                                Leave Household
                            </UncontrolledTooltip>
                        </Col> 
                        : <></>
                    }
                </>
            )
        }
        else{
            return (
                <>
                    {/* Accept button for invitation */}
                    <Col className="text-center">
                        <Button id={"acceptInviteButton"+household.id} size="sm" onClick={() => acceptInvite(household.id)} color="success"><FaCheck/></Button>
                        <UncontrolledTooltip
                            trigger="hover"
                            placement="bottom"
                            target={"acceptInviteButton"+household.id}
                        >
                            Accept Invite
                        </UncontrolledTooltip>
                    </Col>

                    {/* Decline button for invitation */}
                    <Col className="text-center">
                        <Button id={"declineInviteButton"+household.id} onClick={() => declineInvite(household.id)} size="sm" color="danger"><FaMinus/></Button>
                        <UncontrolledTooltip
                            trigger="hover"
                            placement="bottom"
                            target={"declineInviteButton"+household.id}
                        >
                            Decline Invite
                        </UncontrolledTooltip>
                    </Col>
                </>
            )
        }
    }

    const leaveWarning = () => {
        const confirmBox = window.confirm(`Are you sure you wish to leave the ${household.name} household? This action is irreversable.`);
        if (confirmBox){
            leaveHousehold(household.id);
        };
    }
    
    return(
        <Card style={{minWidth:"220px"}} className="m-2 shadow postCard">
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