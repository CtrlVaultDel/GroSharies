import React from "react";
import { Button, Container } from "reactstrap";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const PurchaseRow = ({ purchaseDetail }) => {
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
                    <Button size="sm" className="mr-2" color="warning">
                        <FaRegEdit />
                    </Button>
                    <Button size="sm" className="ml-2 danger" color="danger">
                        <FaTrashAlt />
                    </Button>
               </Container>
            </td>
       </tr>
    )
};

export default PurchaseRow;
