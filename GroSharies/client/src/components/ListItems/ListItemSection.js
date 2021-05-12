import React from "react";
import { Card, CardBody } from "reactstrap";

// Styles
import "../../styles/shoppingList.css";


// Components
import AddListItem from "./AddListItem";
import ListItem from "./ListItem";
// =========================== IMPORTS END ===========================


const ListItemSection = ({ shoppingListId, listItems, setListItems }) => {
    return (
        <>
            <h4 className="text-center">To Get List</h4>

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