import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "reactstrap";

// Context
import { UserContext } from "../../providers/UserProvider";
// =========================== IMPORTS END ===========================


const UserProfilePage = () => {
    const { getUserInfo } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        getUserInfo()
        .then(setUserInfo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(userInfo)

    // const getAllCosts = (purchaseArray) => {
    //         let sum = purchaseArray.reduce(function(acc, purchase){
    //             acc[purchase.totalCost];
    //             return sum;
    //     })
    // }

    if(userInfo == null) return null;

    return (
        <Container>
            {/* Header */}
            <Row className="justify-content-md-center">
                <h2>Your Profile</h2>
            </Row>

            {/* User's First Name */}
            <Row className="justify-content-md-center">
                {userInfo.userInfo.firstName}
            </Row>

            {/* User's Last Name */}
            <Row className="justify-content-md-center">
                {userInfo.userInfo.lastName}
            </Row>

            {/* User's Email */}
            <Row className="justify-content-md-center">
                {userInfo.userInfo.email}
            </Row>

            {/* # of Households the user is the part of */}
            <Row className="justify-content-md-center">
                {userInfo.households.length ? `Households you are part of: ${userInfo.households.length}` : `You are not in any households!`}
            </Row>
        </Container>
    );
};

export default UserProfilePage;