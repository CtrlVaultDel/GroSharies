import React, { useContext } from "react";
import { Button, Container } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";

// Components
import EditPurchaseModal from "./EditPurchaseModal";

// Context
import { PurchaseContext } from "../../providers/PurchaseProvider";
// =========================== IMPORTS END ===========================


const PurchaseRow = ({ purchaseDetail, shoppingList, setPurchases }) => {
    const { deletePurchase } = useContext(PurchaseContext);
    const date = new Date(purchaseDetail.purchase.purchaseDate)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })

      const deleteWarning = () => {
        const confirmBox = window.confirm(`
            Are you sure you wish to delete the $${purchaseDetail.purchase.totalCost} purchase 
            from ${purchaseDetail.purchase.vendor}? This action is irreversable.`
        );
        if (confirmBox){
            deletePurchase(purchaseDetail.purchase)
            .then(setPurchases);
        };
    };

    return(
       <tr>
           <td>{date.toLocaleDateString("en-US")}</td>
           <td>{purchaseDetail.buyer}</td>
           <td>{purchaseDetail.purchase.vendor}</td>
           <td>{formatter.format(purchaseDetail.purchase.totalCost)}</td>
           <td >
               <Container className="sm text-center">
                    <EditPurchaseModal shoppingList = {shoppingList} priorPurchase = {purchaseDetail} setPurchases = {setPurchases} />
                    <Button size="sm" className="ml-2" color="danger" onClick={deleteWarning}>
                        <FaTrashAlt />
                    </Button>
               </Container>
            </td>
       </tr>
    )
};

export default PurchaseRow;
