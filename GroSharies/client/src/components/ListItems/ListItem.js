import React, { useContext, useState } from "react";
import { Button } from "reactstrap";

// Icons
import { FaCheckCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

// Components
import { ListItemContext } from "../../providers/ListItemProvider";
// =========================== IMPORTS END ===========================


const ListItem = ({ listItem, setListItems }) => {
    const { toggleListItem, updateListItem, deleteListItem } = useContext(ListItemContext);
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div>
            <span style ={{textDecoration: listItem.isChecked ? "line-through" : ""}}>{listItem.name}</span>

            {/* Toggle between complete/incomplete */}
            <Button size="sm" color="success" disabled={isLoading} onClick={() => {
                setIsLoading(true)
                
                // Toggle the listItem complete state
                listItem.isChecked = !listItem.isChecked;
                
                // Save the the updated state to the database
                toggleListItem(listItem)
                .then(setListItems)
                .then(setIsLoading(false))
            }}>
                    <FaCheckCircle />
            </Button>
            
            {/* Update listItem */}
            <Button size="sm" color="warning">
                <FaRegEdit />
            </Button>

            {/* Delete listItem */}
            <Button size="sm" color="danger" onClick={()=>{
                deleteListItem(listItem)
                .then(setListItems)}}>
                    <FaTrashAlt />
            </Button>
        </div>
    );
}

export default ListItem