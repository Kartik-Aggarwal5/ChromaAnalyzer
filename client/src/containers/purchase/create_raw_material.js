import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "react-dropdown/style.css";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { RAWMATERIAL } from "../../api";


const PlaceOrder = ({ email }) => {
  // const login_email = localStorage.getItem("email");
  const history = useHistory();
  const [rm_price, setRm_price] = useState("");
  const [rm_name, setRm_name] = useState("");
  const [cur_rm_stock, setCur_rm_stock] = useState("");
  // const [options, setOptions] = useState([]);
  const [err, setError] = useState(null);

  const setOrder = async (e) => {
    e.preventDefault();

    const payload = {
      rm_price: rm_price,
      rm_name: rm_name,
      cur_rm_stock: cur_rm_stock,
      // HARDCODED EMAIL, needs to be received as props or fetch from state somewhere for live value
    };

    console.log("payload", payload);
    try {
      const res = await axios.post(RAWMATERIAL, payload);
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
    <div>
      <Container className="mx-2 pt-2">
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Raw Material Name</Form.Label>
              <Form.Control
                value={rm_name}
                onChange={(e) => setRm_name(e.target.value)}
                type="Quantity"
                placeholder=""
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Price</Form.Label>{" "}
              <Form.Control
                value={rm_price}
                onChange={(e) => setRm_price(e.target.value)}
                type="Amount"
                placeholder=""
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Opening Stock</Form.Label>{" "}
            <Form.Control
              value={cur_rm_stock}
              onChange={(e) => setCur_rm_stock(e.target.value)}
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
