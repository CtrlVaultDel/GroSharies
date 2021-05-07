import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, CardHeader, CardFooter, Button, Row, Col } from "reactstrap";

// Icons
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

// Context
import { ShoppingListContext } from "../../providers/ShoppingListProvider";
// =========================== IMPORTS END ===========================


const ShoppingList = ({ shoppingList }) => {
    const { deleteShoppingList } = useContext(ShoppingListContext);
    const history = useHistory();

    const deleteWarning = () => {
        const confirmBox = window.confirm(`Are you sure you wish to delete the ${shoppingList.name} shopping list? This action is irreversable.`);
        if (confirmBox){
            deleteShoppingList(shoppingList)
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
                        <Button size="sm" color="warning" onClick={() => history.push(`/shoppingList/edit/${shoppingList.id}`)}>
                            <FaRegEdit />
                        </Button>                    
                    </Col>
                    <Col className="text-center">
                        {/* Delete button for ShoppingList */}
                        <Button size="sm" color="danger" onClick={() => deleteWarning()}>
                            <FaTrashAlt />
                        </Button>
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    );
};

export default ShoppingList;