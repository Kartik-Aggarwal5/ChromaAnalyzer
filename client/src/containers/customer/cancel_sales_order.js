import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {
  CUSTOMER_ID,
  CANCELSALESORDER,
  UNDELIVERED_CUSTOMER_ORDER,
} from "../../api";

const CANCELORDER = ({ email }) => {
  const login_email = localStorage.getItem("email");
  const history = useHistory();
  const [sales_id, setSales_id] = useState("");
  const [err, setError] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const customer_id_param = { customer_id: "" };
    const email_param = { c_email: login_email };

    const getcustomerid = async () => {
      // e.preventDefault();
      console.log(email_param);
      const fetchid = await axios.post(CUSTOMER_ID, email_param);
      if (fetchid.data.error) {
        // something went wrong
        console.error(fetchid);
        setError(fetchid.data.message);
      } else {
        customer_id_param.customer_id = fetchid.data[0].c_id;
        console.log("customer Id: ", customer_id_param);

        const fetchUndeliveredSalesOrders = async () => {
          const res = await axios.post(
            UNDELIVERED_CUSTOMER_ORDER,
            customer_id_param
          );
          // body res.data
          setOptions(
            res.data.map((row) => ({
              value: String(row.sales_id),
              label: row.sales_id,
            }))
          );
          //   setstate(RawMaterial)
        };
        fetchUndeliveredSalesOrders();
      }
    };
    getcustomerid();
  }, []);

  const setPurOrder = async (e) => {
    e.preventDefault();

    const payload = {
      sales_id: sales_id,
      // HARDCODED EMAIL, needs to be received as props or fetch from state somewhere for live value
    };
    console.log("payload", payload);
    try {
      const res = await axios.post(CANCELSALESORDER, payload);
      if (res.data.error) {
        // something went wrong
        console.error(res);
        setError(res.data.message);
      } else {
        console.log(res.data.message);
        setError(null);
        history.push("/purchase-dashboard");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };
  return (
    <>
      {/* <Customer /> */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div>
              <Container className="mx-2 pt-2">
                <Form>
                  <Row className="mb-3">
                    <Col className="pt-4 mx-4">
                      {" "}
                      <div
                        style={{
                          marginTop: "7px",
                          marginLeft: "-22px",
                        }}
                      >
                        <Dropdown
                          options={options}
                          onChange={(e) => {
                            setSales_id(e.value);
                          }}
                          // value={"defaultOption"}
                          placeholder="Select an option"
                        />
                      </div>
                    </Col>
                  </Row>

                  <Button variant="primary" type="button" onClick={setPurOrder}>
                    Submit
                  </Button>
                  {err && (
                    <span style={{ color: "red", font: "bold" }}>{err}</span>
                  )}
                </Form>
              </Container>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CANCELORDER;
