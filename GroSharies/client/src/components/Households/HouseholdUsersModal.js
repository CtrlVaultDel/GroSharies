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
                            <tr style={{background:"gray"}}>
                                <th>User</th>
                                <th style={{textAlign:"center"}}>Role</th>
                                {userType === 1 ? 
                                    <th style={{textAlign:"center"}}>Kick</th>
                                    :
                                    <></>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <HouseholdUserRow 
                                    key = {user.householdUserId} 
                                    user = {user}
                                    userType = {userType}/>
                            ))}
                        </tbody>
                    </Table>          
                </ModalBody>
            </Modal>
        </>
    );
}

export default HouseholdUsersModal;