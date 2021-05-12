import React, { useContext, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Row } from "reactstrap";

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

    // const getAllCosts = (purchaseArray) => {
    //         let sum = purchaseArray.reduce(function(acc, purchase){
    //             acc[purchase.totalCost];
    //             return sum;
    //     })
    // }

    const numHouseholds = () => {
        if(userInfo.households.length === 1) return `You are in 1 household`;
        return `You are in ${userInfo.households.length} households`;
    }

    if(userInfo == null) return null;

    return (
        <>
            {/* Header */}
            <Row className="justify-content-center" id="pageHeader">
                <h1>Your Profile</h1>
            </Row>
                <Card style={{maxWidth:"300px", margin:"auto"}}>
                    {/* User's Full Name */}
                    <CardHeader style={{textAlign:"center"}}>
                        {userInfo.userInfo.firstName} {userInfo.userInfo.lastName}
                    </CardHeader>
                    <CardBody>
                        {/* User's Email */}
                        <Row style={{justifyContent:"center"}}>
                            email: {userInfo.userInfo.email}
                        </Row>

                        {/* # of Households the user is the part of */}
                        <Row style={{justifyContent:"center"}}>
                            {userInfo.households.length ? numHouseholds() : `You are not in any households!`}
                        </Row>

                        {/* Purchases information */}
                        <Row>

                        </Row>
                    </CardBody>
                </Card>
        </>
    );
};

export default UserProfilePage;