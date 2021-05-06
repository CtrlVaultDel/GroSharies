import React from "react";
import { Button, Container } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import EditPurchaseModal from "./EditPurchaseModal";

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
           <td >
               <Container className="sm text-center">
                    <EditPurchaseModal shoppingList = {shoppingList} priorPurchase = {purchaseDetail} setPurchases = {setPurchases} />
                    <Button size="sm" className="ml-2" color="danger">
                        <FaTrashAlt />
                    </Button>
               </Container>
            </td>
       </tr>
    )
};

export default PurchaseRow;
