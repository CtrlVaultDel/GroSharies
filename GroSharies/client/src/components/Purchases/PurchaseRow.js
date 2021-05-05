import React from "react";

const PurchaseRow = ({ purchaseDetail }) => {

    return(
       <tr>
           <th scope="row">{purchaseDetail.purchase.date}</th>
           <td>{purchaseDetail.buyer}</td>
           <td>{purchaseDetail.purchase.vendor}</td>
           <td>{purchaseDetail.purchase.totalCost}</td>
       </tr>
    )
};

export default PurchaseRow;