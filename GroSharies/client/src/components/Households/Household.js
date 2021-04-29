import React from "react";
import { Card, CardHeader } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Household = ({ household }) => {
    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                <Link to={`household/${household.id}`}>{household.name}</Link>
            </CardHeader>
        </Card>
    );
};

export default Household;