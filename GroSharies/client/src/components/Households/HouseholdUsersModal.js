import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table} from 'reactstrap';

// Components
import HouseholdUserRow from "./HouseholdUserRow";

// =========================== IMPORTS END ===========================

const HouseholdUsersModal = ({ users, numUsers, userType, householdName }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <>
            <Button 
                color="info" 
                style={{marginRight:"5px"}}
                onClick={toggle}>
                Users: {numUsers}
            </Button>
            
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{householdName} Users</ModalHeader>
                <ModalBody>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <td>User</td>
                                <td>Role</td>
                                {userType === 1 ? 
                                    <td>Kick</td>
                                    :
                                    <></>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {users.forEach(user => {
                                <HouseholdUserRow 
                                    key = {user.householdUserId} 
                                    user = {user}
                                    userType = {userType}/>
                            })}
                        </tbody>
                    </Table>          
                </ModalBody>
            </Modal>
        </>
    );
}

export default HouseholdUsersModal;