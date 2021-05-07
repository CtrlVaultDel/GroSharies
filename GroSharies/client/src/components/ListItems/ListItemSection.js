import React from "react";
import { Card, CardBody } from "reactstrap";

// Components
import AddListItem from "./AddListItem";
import ListItem from "./ListItem";
// =========================== IMPORTS END ===========================


const ListItemSection = ({ shoppingListId, listItems, setListItems }) => {
    return (
        <div className = "itemList-section">
            <h4 className="text-center">To Get List</h4>
            <AddListItem shoppingListId = {shoppingListId} setListItems = {setListItems}/>
            <div>           
                {listItems.length? listItems.map(i => 

                    // If listItems exist, display them on the DOM
                    <Card key={i.id} style={{backgroundColor: i.isChecked ? "#787878" : "initial"}} >
                        <CardBody>
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
        </div>
    )
}
export default ListItemSection;