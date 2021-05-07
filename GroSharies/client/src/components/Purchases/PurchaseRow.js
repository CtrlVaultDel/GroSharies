import React, { useContext } from "react";
import { Button, Row } from "reactstrap";

// Icons
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
               <Row className="justify-content-center" size="sm">
                    <EditPurchaseModal shoppingList = {shoppingList} priorPurchase = {purchaseDetail} setPurchases = {setPurchases} />
                    <Button size="sm" className="ml-3" color="danger" onClick={deleteWarning}>
                        <FaTrashAlt />
                    </Button>
               </Row>
            </td>
       </tr>
    )
};

export default PurchaseRow;
