// React
import React, { useContext } from "react";

// Reactstrap
import { Button, Card, CardBody, Row, UncontrolledTooltip } from "reactstrap";

// Icons
import { FaCheckCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

// Components
import AddListItem from "./AddListItem";
import ListItem from "./ListItem";

// Context
import { ListItemContext } from "../../providers/ListItemProvider";

// Styles
import "../../styles/listItem.css";

// =========================== IMPORTS END ===========================


const ListItemSection = ({ shoppingListId, listItems, setListItems }) => {
    const { checkAll, uncheckAll } = useContext(ListItemContext);
    return (
        <>
            {listItems.length ?
                    <Row id="listItemSectionRow">
                        <div>
                            {/* Check all list items */}
                            <Button 
                                size="sm"
                                id="checkAllButton" 
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
                        <CardBody id="listItemCardBody">
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