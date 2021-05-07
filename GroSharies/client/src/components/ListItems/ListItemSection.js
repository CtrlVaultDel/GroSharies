import React from "react";
import { Row, Col, Container, Input, ListGroup, ListGroupItem } from "reactstrap";
import AddListItem from "./AddListItem";

const ListItemSection = ({ shoppingListId, listItems, setListItems }) => {
    return (
    <Container className="text-center">
        <h4 className="text-center">To Get List</h4>
        <AddListItem shoppingListId = {shoppingListId} setListItems = {setListItems}/>
        <div>           
            {listItems.length? listItems.map(i => 
            <div key={i.id}>
                <ListGroup>
                    <ListGroupItem>
                        {i.name}
                    </ListGroupItem>
                    <ListGroupItem>
                        <Input type="checkbox" id={"checkbox" + i.id} name="completeTask" defaultValue={i.isChecked} />
                    </ListGroupItem>
                </ListGroup>
            </div>
                ) : <Row>No items yet!</Row>
            }
        </div>
    </Container>
    )
}
export default ListItemSection;