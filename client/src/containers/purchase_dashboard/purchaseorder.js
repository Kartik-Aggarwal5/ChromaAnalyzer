import React, { useEffect, useState } from "react";
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
import { PURCHASEORDER, PRODUCTS } from "../../api";
import "react-data-table-component-extensions/dist/index.css";

const Purchaseorder = () => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [err, setError] = useState("error");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(PRODUCTS);
      // body res.data
      setState(
        res.data.data.map((row) => ({
          value: row.prod_id,
          label: row.prod_name,
        }))
      );
      // setstate(products)
    };
    fetchProducts();
  }, []);

  const setOrder = async () => {
    if (product === "") {
      console.log(err);
    } else {
      const payload = {
        product: product,
        quantity: quantity,
        amount: amount,
        address: address,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
      };
      try {
        const data = await axios.post(PURCHASEORDER, payload);
        console.log(data);
        console.log("hey");
      } catch (err) {
        console.log(err);
      }
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
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="Quantity"
                placeholder="Quantity"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Amount</Form.Label>{" "}
              <Form.Control
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="Amount"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>{" "}
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="1234 Main St"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>{" "}
            <Form.Control
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Apartment, studio, or floor"
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>{" "}
              <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>State</Form.Label>{" "}
              <Form.Control
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit" onClick={setOrder}>
            Submit
          </Button>
        </Form>
      </Container>
      <hr />
    </div>
  );
};

export default Purchaseorder;
