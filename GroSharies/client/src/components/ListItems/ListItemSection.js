import React from "react";
import { Row, Container, Input, Card, CardBody } from "reactstrap";

// Components
import AddListItem from "./AddListItem";
import ListItem from "./ListItem";
// =========================== IMPORTS END ===========================


const ListItemSection = ({ shoppingListId, listItems, setListItems }) => {
    return (
    <Container className="text-center">
        <h4 className="text-center">To Get List</h4>
        <AddListItem shoppingListId = {shoppingListId} setListItems = {setListItems}/>
        <div>           
            {listItems.length? listItems.map(i => 
                <Card key={i.id}>
                    <CardBody>
                        <ListItem 
                            listItem = {i} setListItems = {setListItems} shoppingListId = {shoppingListId}
                        />
                    </CardBody>
                </Card>
                ) : 
                <Card>
                    <CardBody>
                        No items yet!
                    </CardBody>
                </Card>
            }
        </div>
    </Container>
    )
}
export default ListItemSection;