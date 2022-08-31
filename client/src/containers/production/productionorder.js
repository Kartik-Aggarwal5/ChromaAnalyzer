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
import { PRODUCTIONORDER, PRODUCTS } from "../../api";

const PlaceOrder = ({ email }) => {
  // const login_email = localStorage.getItem("email");
  const history = useHistory();
  const [product, setProduct] = useState("");
  const [mfg_date, setMfg_date] = useState("");
  const [exp_date, setExp_date] = useState("");
  const [prod_qty, setProd_qty] = useState("");
  const [signalled_by, setSignalled_by] = useState("");
  const [options, setOptions] = useState([]);
  const [err, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(PRODUCTS);
      // body res.data
      setOptions(
        res.data.map((row) => ({
          value: String(row.prod_id),
          label: row.prod_name,
        }))
      );
      // setstate(products)
    };
    fetchProducts();
  }, []);

  const setOrder = async (e) => {
    e.preventDefault();

    const payload = {
      prod_id: +product,
      mfg_date: mfg_date,
      exp_date: exp_date,
      prod_qty: +prod_qty,
      signalled_by: signalled_by,
      // HARDCODED EMAIL, needs to be received as props or fetch from state somewhere for live value
    };

    console.log("payload", payload);
    try {
      const res = await axios.post(PRODUCTIONORDER, payload);
      if (res.data.error) {
        // something went wrong
        console.error(res);
        setError(res.data.message);
      } else {
        console.log(res.data.message);
        setError(null);
        history.push("/inventory_dashboard");
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
                  setProduct(e.value);
                }}
                // value={"defaultOption"}
                placeholder="Select an option"
              />
            </Col>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Mfg Date</Form.Label>
              <Form.Control
                value={mfg_date}
                onChange={(e) => setMfg_date(e.target.value)}
                type="Quantity"
                placeholder="2021-11-08"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Expiry Date</Form.Label>{" "}
              <Form.Control
                value={exp_date}
                onChange={(e) => setExp_date(e.target.value)}
                type="Amount"
                placeholder="2021-11-08"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Quantity</Form.Label>{" "}
            <Form.Control
              value={prod_qty}
              onChange={(e) => setProd_qty(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Signalled By</Form.Label>{" "}
            <Form.Control
              value={signalled_by}
              onChange={(e) => setSignalled_by(e.target.value)}
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
