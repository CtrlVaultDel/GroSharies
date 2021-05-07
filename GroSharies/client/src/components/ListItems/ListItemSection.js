import React from "react";
import { Row, Container, Input, Card, CardBody } from "reactstrap";

// Components
import AddListItem from "./AddListItem";
// =========================== IMPORTS END ===========================


const ListItemSection = ({ shoppingListId, listItems, setListItems }) => {
    return (
    <Container className="text-center">
        <h4 className="text-center">To Get List</h4>
        <AddListItem shoppingListId = {shoppingListId} setListItems = {setListItems}/>
        <div>           
            {listItems.length? listItems.map(i => 
            <div key={i.id}>
                <Card>
                    <CardBody>
                        {i.name}
                        <Input type="checkbox" id={"checkbox" + i.id} name="completeTask" defaultValue={i.isChecked} />
                    </CardBody>
                </Card>
            </div>
                ) : <Row>No items yet!</Row>
            }
        </div>
    </Container>
    )
}
export default ListItemSection;