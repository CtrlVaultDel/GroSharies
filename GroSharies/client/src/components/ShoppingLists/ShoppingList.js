import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardFooter, Col, Progress, Row } from "reactstrap";

// Context
import { ListItemContext } from "../../providers/ListItemProvider";

// Components
import EditShoppingListModal from "./EditShoppingListModal";
import DeleteShoppingListModal from "./DeleteShoppingListModal";
// =========================== IMPORTS END ===========================


const ShoppingList = ({ shoppingList, setHouseholdDetail }) => {
    const { getListItems } = useContext(ListItemContext);

    const [listItems, setListItems] = useState([])
    useEffect(() => {
        getListItems(shoppingList.id)
        .then(setListItems)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
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
                        <Progress 
                            animated bar color="success" 
                            value={(percentageComplete).toString()}>
                                {percentageComplete}%
                        </Progress>
                        <Progress 
                            animated bar color="danger" 
                            value={(100-percentageComplete).toString()}>
                                {100-percentageComplete}%
                        </Progress>
                    </Progress>                     
            </CardBody>

            <CardFooter>
                <Row>
                    {/* Edit button for ShoppingList */}
                    <Col className="text-center">
                        <EditShoppingListModal 
                            shoppingList = {shoppingList} 
                            setHouseholdDetail = {setHouseholdDetail}/>               
                    </Col>

                    {/* Delete button for ShoppingList */}
                    <Col className="text-center">               
                        <DeleteShoppingListModal 
                            shoppingList = {shoppingList} 
                            setHouseholdDetail = {setHouseholdDetail}/>
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    );
};

export default ShoppingList;