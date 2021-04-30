import React from "react";
import { Card, CardHeader, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const Household = ({ household, userType, isAccepted }) => {

    const history = useHistory();
    
    // Determines if the user is an Admin of the related household.
    // If they are, add an edit button to allow them to change its name.
    const checkIfAdmin = () => {
        if(userType === 1) {
            return (<>
                <Button size="sm" onClick={() => history.push(`/household/edit/${household.id}`)}><FaRegEdit /></Button>
                <Button size="sm" onClick={() => history.push(`/household/delete/${household.id}`)}><FaTrashAlt /></Button>
                </>)  
        }
    };
    
    return(
    <Card className="m-2 shadow postCard">
        <CardHeader>
            <Link to={`household/${household.id}`}>{household.name}</Link>
            {checkIfAdmin()}
        </CardHeader>
    </Card>
    )
};

export default Household;