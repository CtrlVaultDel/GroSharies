import React, { useContext } from "react";
import { Button, Card, CardBody, Row, UncontrolledTooltip } from "reactstrap";

// Styles
import "../../styles/shoppingList.css";

// Icons
import { FaCheckCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

// Components
import AddListItem from "./AddListItem";
import ListItem from "./ListItem";

// Context
import { ListItemContext } from "../../providers/ListItemProvider";
// =========================== IMPORTS END ===========================


const ListItemSection = ({ shoppingListId, listItems, setListItems }) => {
    const { checkAll, uncheckAll } = useContext(ListItemContext);
    return (
        <>
            {listItems.length ?
                    <Row style={{justifyContent:"center", margin:"10px"}}> 
                        <div>
                            {/* Check all list items */}
                            <Button 
                                size="sm"
                                id="checkAllButton" 
                                style={{border:"solid black 1px", marginRight:"10px"}} 
                                color="success"
                                onClick ={() => {
                                    checkAll(shoppingListId)
                                    .then(setListItems)}}>
                                    <FaCheckCircle />
                            </Button>
                            <UncontrolledTooltip
                                trigger="hover"
                                placement="left"
                                target="checkAllButton">
                                Check All
                            </UncontrolledTooltip>
                        </div>

                        <div>
                            <h4 className="text-center">
                                To Get List
                            </h4>
                        </div>  

                        <div>        
                            {/* Uncheck all list items */}
                            <Button 
                                size="sm"
                                id="uncheckAllButton" 
                                style={{border:"solid black 1px", marginLeft:"10px"}} 
                                color="info"
                                onClick ={() => {
                                    uncheckAll(shoppingListId)
                                    .then(setListItems)}}>
                                    <FaCircle />
                            </Button>
                            <UncontrolledTooltip
                                trigger="hover"
                                placement="right"
                                target="uncheckAllButton">
                                Uncheck All
                            </UncontrolledTooltip>
                        </div>
                    </Row>
                    :
                    <h4 className="text-center">
                        To Get List
                    </h4>     
                }
            
            {/* Add listItem button */}
            <AddListItem shoppingListId = {shoppingListId} setListItems = {setListItems}/>
            
            {/* List of all items */}
            <div className="overflow">           
                {listItems.length? listItems.map(i => 

                    // If listItems exist, display them on the DOM
                    <Card key={i.id} style={{backgroundColor: i.isChecked ? "#787878" : "#c2f0c6"}} >
                        <CardBody style={{padding:"1rem"}}>
                            <ListItem 
                                listItem = {i} setListItems = {setListItems}
                            />
                        </CardBody>
                    </Card>
                    ) : 

                    // If no listItems exist, display a default message
                    <Card>
                        <CardBody>
                            No items yet!
                        </CardBody>
                    </Card>
                }
            </div>
        </>
    )
}
export default ListItemSection;