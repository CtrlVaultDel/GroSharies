import React from "react";
import { Button } from "reactstrap";

// Icons
import { GiBootKick } from "react-icons/gi";

const HouseholdUserRow = ({ user, userType }) => {
    return(
        <tr>
            <td>{user.fullName}</td>
            <td>{user.userType}</td>
            {userType === 1 && user.userType !== 1 ?
                <td>
                    <Button 
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