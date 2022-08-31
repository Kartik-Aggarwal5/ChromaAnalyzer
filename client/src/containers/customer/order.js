import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { PLACEORDER, PRODUCTS } from "../../api";
import Customer from "../customer/customer";

const PlaceOrder = ({ email }) => {
  const login_email = localStorage.getItem("email");
  const history = useHistory();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [err, setError] = useState(null);
  const [options, setOptions] = useState([]);

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
      quantity: +quantity,
      login_email: login_email,
      // HARDCODED EMAIL, needs to be received as props or fetch from state somewhere for live value
    };
    console.log("payload", payload);
    try {
      const res = await axios.post(PLACEORDER, payload);
      if (res.data.error) {
        // something went wrong
        console.error(res);
        setError(res.data.message);
      } else {
        console.log(res.data.message);
        setError(null);
        history.push("/order-history");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };
  return (
    <>
      <Customer />
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
                            setProduct(e.value);
                          }}
                          // value={"defaultOption"}
                          placeholder="Select an option"
                        />
                      </div>
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
                  <Button variant="primary" type="button" onClick={setOrder}>
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

export default PlaceOrder;
