// React
import React from "react";

// Reactstrap
import { Row } from "reactstrap";

// Components
import EditPurchaseModal from "./EditPurchaseModal";

// Context
import DeletePurchaseModal from "./DeletePurchaseModal";

// =========================== IMPORTS END ===========================

const PurchaseRow = ({ purchaseDetail, shoppingList, setPurchases }) => {
    const date = new Date(purchaseDetail.purchase.purchaseDate)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })

    return(
       <tr>
           <td>{date.toLocaleDateString("en-US")}</td>
           <td>{purchaseDetail.buyer}</td>
           <td>{purchaseDetail.purchase.vendor}</td>
           <td>{formatter.format(purchaseDetail.purchase.totalCost)}</td>
           <td>
               <Row className="justify-content-center" size="sm">
                    <EditPurchaseModal shoppingList = {shoppingList} priorPurchase = {purchaseDetail} setPurchases = {setPurchases} />
                    <DeletePurchaseModal purchase = {purchaseDetail.purchase} setPurchases = {setPurchases} />
               </Row>
            </td>
       </tr>
    )
};

export default PurchaseRow;
