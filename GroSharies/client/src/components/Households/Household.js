import React from "react";
import { Card, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

const Household = ({ household, isAdmin, isAccepted }) => {
    
    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                <Link to={`household/${household.id}`}>{household.name}</Link>
                <Link to={`household/edit/${household.id}}`}></Link>
            </CardHeader>
        </Card>
    );
};

export default Household;