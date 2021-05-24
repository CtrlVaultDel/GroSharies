import React, { useContext } from "react";
import { Button } from "reactstrap";

// Icons
import { GiBootKick } from "react-icons/gi";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

const HouseholdUserRow = ({ user, userType }) => {
    const { kickUser } = useContext(HouseholdContext);

    const handleKick = () => {
        const confirmBox = window.confirm(`Do you want to kick ${user.fullName}?`)
        if (confirmBox === true) {
            kickUser(user.householdUserId)
        }
    }

    return(
        <tr>
            <td>{user.fullName}</td>
            <td style={{textAlign:"center"}}>{user.userType}</td>
            {userType === 1 && user.userType !== "Admin" ?
                <td style={{textAlign:"center"}}>
                    <Button 
                        color="danger"
                        size="sm"
                        onClick = {handleKick}>
                        <GiBootKick />
                    </Button>
                </td>
                :
                <></>
            }
        </tr>
    )
}

export default HouseholdUserRow;