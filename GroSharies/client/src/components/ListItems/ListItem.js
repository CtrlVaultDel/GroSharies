import React, { useContext } from "react";
import { Button } from "reactstrap";

// Icons
import { FaCheckCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

// Components
import { ListItemContext } from "../../providers/ListItemProvider";
// =========================== IMPORTS END ===========================


const ListItem = ({ listItem, setListItems, shoppingListId }) => {
    const { toggleListItem, updateListItem, deleteListItem } = useContext(ListItemContext);
    
    return (
        <div>
            <span style ={{textDecoration: listItem.isChecked ? "line-through" : ""}}>{listItem.name}</span>

            {/* toggling, updating or deleting a listItem will also update the parent listItems state */}
            {/* Toggle between complete/incomplete */}
            <Button size="sm" color="success" onClick={() => {
                toggleListItem(listItem)
                .then(setListItems)}}>
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