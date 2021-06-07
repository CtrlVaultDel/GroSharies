// React
import React, { useContext } from "react";

// Reactstrap
import { Button } from "reactstrap";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";

// Icons
import { GiBootKick } from "react-icons/gi";

// Styles
import "../../styles/household.css";

// =========================== IMPORTS END ===========================

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
            <td className="text-center">{user.userType}</td>
            {userType === 1 && user.userType !== "Admin" ?
                <td className="text-center">
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