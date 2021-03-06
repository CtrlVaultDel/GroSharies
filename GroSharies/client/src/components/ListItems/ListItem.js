// React
import React, { useContext, useState } from "react";

// Reactstrap
import { Button, Col, Container, Row } from "reactstrap";

// Components
import EditListItemModal from "./EditListItemModal";

// Context
import { ListItemContext } from "../../providers/ListItemProvider";

// Icons
import { FaCheckCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

// Styles
import "../../styles/listItem.css";

// =========================== IMPORTS END ===========================


const ListItem = ({ listItem, setListItems }) => {
    const { toggleListItem, updateListItem, deleteListItem } = useContext(ListItemContext);
    const [isLoading, setIsLoading] = useState(false);

    const toggleEvent = () => {
        setIsLoading(true)

        // Toggle the listItem complete state
        listItem.isChecked = !listItem.isChecked;

        // Save the the updated state to the database
        toggleListItem(listItem)
        .then(setListItems)
        .then(setIsLoading(false))
    };

    return (
        <Row className="listItem">
            <Col id="listItemName">
                <span style ={{textDecoration: listItem.isChecked ? "line-through" : ""}}>{listItem.name}</span>
            </Col>
            <Col className="text-right">
                <Container className="float-right">
                    {/* Change the toggle button based off whether or not the item is already checked off */}
                    {listItem.isChecked ? 
                        <Button color="info" disabled={isLoading} onClick={toggleEvent}><FaCircle /></Button> 
                        :
                        <Button color="success" disabled={isLoading} onClick={toggleEvent}><FaCheckCircle /></Button>
                    }

                    {/* Update listItem */}
                    <EditListItemModal updateListItem={updateListItem} listItem={listItem} setListItems={setListItems} />

                    {/* Delete listItem */}
                    <Button className="ml-2" color="danger" onClick={()=>{
                        deleteListItem(listItem)
                        .then(setListItems)}}>
                            <FaTrashAlt />
                    </Button>
                </Container>
            </Col>
        </Row>
    );
}

export default ListItem