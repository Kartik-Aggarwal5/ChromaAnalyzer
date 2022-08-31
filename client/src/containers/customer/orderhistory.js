import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { ORDER_HISTORY } from "../../api";

const OrderHistory = () => {
  const [orderHistory, setorderHistory] = useState(null);
  const [error, setError] = useState(null);
  const email = localStorage.getItem("email");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.post(ORDER_HISTORY, { login_email: email });
        console.log(res.data.data);
        setorderHistory(res.data.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchProducts();
  }, []);

  const renderRows = () => {
    console.log(orderHistory);
    return orderHistory.map((row) => {
      return (
        <tr key={row.sales_id}>
          <td>{row.sales_id}</td>
          <td>{row.sales_date.substring(0, 10)}</td>
          <td>{row.sales_deliv_date.substring(0, 10)}</td>
          <td>{row.sales_ord_status}</td>
          <td>{row.overseen_by}</td>
          <td>{row.placed_by}</td>
        </tr>
      );
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="my-5 px-5">
            {orderHistory && (
              <>
                <h2 className="mb-4"> Sales Order History</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>sales_id</th>
                      <th>sales_date</th>
                      <th>sales_deliv_date</th>
                      <th>sales_ord_status</th>
                      <th>overseen_by</th>
                      <th>placed_by</th>
                    </tr>
                  </thead>
                  <tbody>{renderRows()}</tbody>
                </Table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
