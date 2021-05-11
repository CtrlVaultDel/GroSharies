import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardFooter, Button, Row, Col } from "reactstrap";

// Icons
import { FaTrashAlt } from "react-icons/fa";

// Context
import { ShoppingListContext } from "../../providers/ShoppingListProvider";

// Components
import EditShoppingListModal from "./EditShoppingListModal";
// =========================== IMPORTS END ===========================


const ShoppingList = ({ shoppingList, setHouseholdDetail }) => {
    const { deleteShoppingList } = useContext(ShoppingListContext);

    const deleteWarning = () => {
        const confirmBox = window.confirm(`Are you sure you wish to delete the ${shoppingList.name} shopping list? This action is irreversable.`);
        if (confirmBox){
            deleteShoppingList(shoppingList)
            .then(setHouseholdDetail)
        };
    };

    return (
        <Card style={{minWidth:"220px"}} className="m-2 shadow postCard">

            {/* Header & Link to ShoppingList Detail */}
            <CardHeader className="text-center">
                <Link to={`/shoppingList/${shoppingList.id}`}>{shoppingList.name}</Link>
            </CardHeader>
            <CardFooter>
                <Row>
                    <Col className="text-center">
                        {/* Edit button for ShoppingList */}
                        <EditShoppingListModal shoppingList = {shoppingList} setHouseholdDetail = {setHouseholdDetail}/>               
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