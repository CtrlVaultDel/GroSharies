import React from "react";
import { Row, Col, Input, ListGroup, ListGroupItem, Button } from "reactstrap";

const ListItemSection = ({listItems, setListItems}) => {
    return (<>
    <h2 className="text-center">To Get List</h2>
        <Row className="justify-content-md-center">
            <input placeholder="New Item" />
            <Button>Add Item</Button>
        </Row>
        <Col>           
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
        </Col>
    </>
    )
}
export default ListItemSection;