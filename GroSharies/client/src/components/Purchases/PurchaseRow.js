import React from "react";

const PurchaseRow = ({ purchaseDetail }) => {
    const date = new Date(purchaseDetail.purchase.purchaseDate)


    return(
       <tr>
           <td>{date.toLocaleDateString("en-US")}</td>
           <td>{purchaseDetail.buyer}</td>
           <td>{purchaseDetail.purchase.vendor}</td>
           <td>{purchaseDetail.purchase.totalCost}</td>
       </tr>
    )
};

export default PurchaseRow;