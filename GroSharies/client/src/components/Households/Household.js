import React from "react";
import { Card, CardHeader, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Household = ({ household }) => {

    // START HERE
    const editButton = (householdId) => {
        let currentUser = JSON.parse(sessionStorage.getItem("user"));
        if (post.userProfile.id === currentUser.id) {
            return <Button type="button" onClick={() => {
                history.push(`/household/edit/${householdId}`)
            }} className="delete-button">
                Edit
            </Button>
        }
    }

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