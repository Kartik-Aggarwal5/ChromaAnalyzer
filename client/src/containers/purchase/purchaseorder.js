import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { PURCHASEORDER, PURCHASE_VENDOR_LIST } from "../../api";

const PlaceOrder = ({ email }) => {
  // const login_email = localStorage.getItem("email");
  const history = useHistory();
  const [pur_cost, setPur_cost] = useState("");
  const [pur_date, setPur_date] = useState("");
  const [pur_deliv_date, setPur_deliv_date] = useState("");
  const [v_id, setV_id] = useState("");
  // const [pur_ord_status, setPur_ord_status] = useState("");
  const [emp_id, setEmp_id] = useState("");
  const [rm_exp, setRm_exp] = useState("");
  const [rm_mfg, setRm_mfg] = useState("");
  const [options, setOptions] = useState([]);
  const [err, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      const res = await axios.get(PURCHASE_VENDOR_LIST);
      console.log(res.data);
      // body res.data
      setOptions(
        res.data.map((row) => ({ value: String(row.v_id), label: row.v_name }))
      );
      console.log("v_id");
      console.log(v_id);
      // setstate(products)
    };
    fetchVendors();
  }, []);

  const setOrder = async (e) => {
    e.preventDefault();

    const payload = {
      pur_cost: pur_cost,
      pur_date: pur_date,
      pur_deliv_date: pur_deliv_date,
      v_id: v_id,
      pur_ord_status: 0,
      emp_id: emp_id,
      rm_exp: rm_exp,
      rm_mfg: rm_mfg,
      // HARDCODED EMAIL, needs to be received as props or fetch from state somewhere for live value
    };

    console.log("payload", payload);
    try {
      const res = await axios.post(PURCHASEORDER, payload);
      if (res.data.error) {
        // something went wrong
        console.error(res);
        setError(res.data.message);
      } else {
        console.log(res.data.message);
        setError(null);
        history.push("/purchase_dashboard");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/purchase-dashboard">
            Inventory Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/purchase-order">Place Order</Nav.Link>
              <Nav.Link href="/purchase-history">Order History</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mx-2 pt-2">
        <Form>
          <Row className="mb-3">
            <Col className="pt-4 mx-4">
              {" "}
              <Dropdown
                options={options}
                onChange={(e) => {
                  setV_id(e.value);
                }}
                // value={"defaultOption"}
                placeholder="Select an option"
              />
            </Col>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Total Cost</Form.Label>
              <Form.Control
                value={pur_cost}
                onChange={(e) => setPur_cost(e.target.value)}
                type="Quantity"
                placeholder="2021-11-08"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Purchase Date</Form.Label>{" "}
              <Form.Control
                value={pur_date}
                onChange={(e) => setPur_date(e.target.value)}
                type="Amount"
                placeholder="2021-11-08"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Delivery Date</Form.Label>{" "}
            <Form.Control
              value={pur_deliv_date}
              onChange={(e) => setPur_deliv_date(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Employee ID</Form.Label>{" "}
            <Form.Control
              value={emp_id}
              onChange={(e) => setEmp_id(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Expiry Date</Form.Label>{" "}
            <Form.Control
              value={rm_exp}
              onChange={(e) => setRm_exp(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Manufacturing Date</Form.Label>{" "}
            <Form.Control
              value={rm_mfg}
              onChange={(e) => setRm_mfg(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={setOrder}>
            Submit
          </Button>
          {err && <span style={{ color: "red", font: "bold" }}>{err}</span>}
        </Form>
      </Container>
      <hr />
    </div>
  );
};

export default PlaceOrder;
