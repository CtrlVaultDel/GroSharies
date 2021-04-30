import React from "react";
import { Card, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

const ShoppingList = ({ shoppingList }) => {
    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                <Link to={`/shoppingList/${shoppingList.id}`}>{shoppingList.name}</Link>
            </CardHeader>
        </Card>
    );
};

export default ShoppingList;