import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Progress, Row, UncontrolledTooltip } from "reactstrap";

// Icons
import { FaTrashAlt } from "react-icons/fa";

// Context
import { ShoppingListContext } from "../../providers/ShoppingListProvider";
import { ListItemContext } from "../../providers/ListItemProvider";

// Components
import EditShoppingListModal from "./EditShoppingListModal";
// =========================== IMPORTS END ===========================


const ShoppingList = ({ shoppingList, setHouseholdDetail }) => {
    const { deleteShoppingList } = useContext(ShoppingListContext);
    const { getListItems } = useContext(ListItemContext);

    const [listItems, setListItems] = useState([])
    useEffect(() => {
        getListItems(shoppingList.id)
        .then(setListItems)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const deleteWarning = () => {
        const confirmBox = window.confirm(`Are you sure you wish to delete the ${shoppingList.name} shopping list? This action is irreversable.`);
        if (confirmBox){
            deleteShoppingList(shoppingList)
            .then(setHouseholdDetail)
        };
    };
    
    let totalItems = 0;
    let completeItems = 0;

    const completionRate = () => {
        if(!listItems.length) return 0
        listItems.forEach((li)=> {
            totalItems++;
            if(li.isChecked){
                completeItems++;
            }
        })
        return Math.round((completeItems/totalItems)*100,2)
    }

    if(!listItems) return null

    let percentageComplete = completionRate();

    return (
        <Card style={{minWidth:"220px"}} className="m-2 shadow postCard">

            {/* Header & Link to ShoppingList Detail */}
            <CardHeader className="text-center">
                <Link to={`/shoppingList/${shoppingList.id}`}>{shoppingList.name}</Link>
            </CardHeader>
            <CardBody>
                <div className="text-center">{completeItems} of {totalItems} complete</div>
                    <Progress multi>
                        <Progress animated bar color="success" value={(percentageComplete).toString()}>{percentageComplete}%</Progress>
                        <Progress animated bar color="danger" value={(100-percentageComplete).toString()}>{100-percentageComplete}%</Progress>
                    </Progress>                     
            </CardBody>
            <CardFooter>
                <Row>
                    <Col className="text-center">

                        {/* Edit button for ShoppingList */}
                        <EditShoppingListModal shoppingList = {shoppingList} setHouseholdDetail = {setHouseholdDetail}/>               
                    </Col>
                    <Col className="text-center">
                        
                        {/* Delete button for ShoppingList */}
                        <Button
                            id={"deleteShoppingListButton"+shoppingList.id} 
                            size="sm" 
                            color="danger" 
                            onClick={() => deleteWarning()}>
                                <FaTrashAlt />
                        </Button>
                        <UncontrolledTooltip
                            trigger="hover"
                            placement="bottom"
                            target={"deleteShoppingListButton"+shoppingList.id}
                        >
                            Delete Shopping List
                        </UncontrolledTooltip>
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    );
};

export default ShoppingList;