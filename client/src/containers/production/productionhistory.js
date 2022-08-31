import React from "react";
import "react-dropdown/style.css";
import { Table } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";

const ProductionHistory = () => {
  return (
    <div className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>production_id</th>
            <th>prod_id</th>
            <th>mfg_date</th>
            <th>exp_date</th>
            <th>prod_qty</th>
            <th>signalled_by</th>
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

export default ProductionHistory;
