import React, { useContext } from "react";
import { Card, CardHeader, CardFooter, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { ShoppingListContext } from "../../providers/ShoppingListProvider";

const ShoppingList = ({ shoppingList }) => {
    const { deleteShoppingList } = useContext(ShoppingListContext);

    const deleteWarning = () => {
        const confirmBox = window.confirm(`Are you sure you wish to delete the ${shoppingList.name} shopping list? This action is irreversable.`);
        if (confirmBox){
            deleteShoppingList(shoppingList.id);
        };
    };

    return (
        <Card className="m-2 shadow postCard">

            {/* Header & Link to ShoppingList Detail */}
            <CardHeader className="text-center">
                <Link to={`/shoppingList/${shoppingList.id}`}>{shoppingList.name}</Link>
            </CardHeader>
            <CardFooter>
                <Row>
                    <Col className="text-center">
                        {/* Edit button for ShoppingList */}
                        <Button size="sm">
                            <FaRegEdit>
                                <Link to={{pathname:`/shoppingList/edit/${shoppingList.id}`, state:{householdId: shoppingList.householdId}}} />
                            </FaRegEdit>
                        </Button>
                    </Col>
                    <Col className="text-center">
                        {/* Delete button for ShoppingList */}
                        <Button size="sm" onClick={() => deleteWarning()}><FaTrashAlt /></Button>
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    );
};

export default ShoppingList;