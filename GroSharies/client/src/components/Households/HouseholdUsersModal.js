// React
import React, { useState } from 'react';

// Reactstrap
import { Button, Modal, ModalHeader, ModalBody, Table} from 'reactstrap';

// Components
import HouseholdUserRow from "./HouseholdUserRow";

// Styles
import "../../styles/household.css";

// =========================== IMPORTS END ===========================

const HouseholdUsersModal = ({ users, numUsers, userType, householdName }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <>
            <Button 
                color="info" 
                id="householdUserModalButton"
                onClick={toggle}>
                Users: {numUsers}
            </Button>
            
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{householdName} Users</ModalHeader>
                <ModalBody>

                    {/* Invitation Section */}
                    <div>
                        
                    </div>

                    {/* Table of current and invited members */}
                    <div>
                        <Table bordered hover>
                            <thead>
                                <tr id="householdUserModalTable">
                                    <th>User</th>
                                    <th className="text-center">Role</th>
                                    {userType === 1 ? 
                                        <th className="text-center">Kick</th>
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
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

export default HouseholdUsersModal;