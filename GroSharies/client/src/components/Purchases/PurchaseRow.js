import React from "react";

const PurchaseRow = ({ purchaseDetail }) => {

    return(
       <tr>
           <td>{purchaseDetail.purchase.purchaseDate}</td>
           <td>{purchaseDetail.buyer}</td>
           <td>{purchaseDetail.purchase.vendor}</td>
           <td>{purchaseDetail.purchase.totalCost}</td>
       </tr>
    )
};

export default PurchaseRow;