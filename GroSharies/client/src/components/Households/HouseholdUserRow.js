import React from "react";
import { Button } from "reactstrap";

// Icons
import { GiBootKick } from "react-icons/gi";

const HouseholdUserRow = ({ user, userType }) => {
    return(
        <tr>
            <td>{user.fullName}</td>
            <td style={{textAlign:"center"}}>{user.userType}</td>
            {userType === 1 && user.userType !== "Admin" ?
                <td style={{textAlign:"center"}}>
                    <Button 
                        color="danger"
                        size="sm">
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