import React from "react";
import "react-dropdown/style.css";
import { Table } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";

const PurchaseHistory = () => {
  return (
    <div className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>bill_id</th>
            <th>pur_cost</th>
            <th>pur_date</th>
            <th>pur_deliv_date</th>
            <th>v_id</th>
            <th>pur_ord_status</th>
            <th>emp_id</th>
            <th>rm_exp</th>
            <th>rm_mfg</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default PurchaseHistory;
