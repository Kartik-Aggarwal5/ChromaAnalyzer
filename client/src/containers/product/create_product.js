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
import { PRODUCT } from "../../api";

const PlaceOrder = ({ email }) => {
  // const login_email = localStorage.getItem("email");
  const history = useHistory();
  const [prod_name, setProd_name] = useState("");
  const [prod_ppu, setProd_ppu] = useState("");
  const [type, setType] = useState("");
  const [cur_prod_stock, setCur_prod_stock] = useState("");
  const [prod_vol, setProd_vol] = useState("");
  const [options, setOptions] = useState([]);
  const [err, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const types = [
        { name: "brush", label: "Brush" },
        { name: "roller", label: "Roller" },
        { name: "paint", label: "Paint" },
      ];
      setOptions(
        types.map((type) => ({
          value: type.name,
          label: type.label,
        }))
      );
    };
    fetchProducts();
  }, []);

  const setOrder = async (e) => {
    e.preventDefault();

    const payload = {
      prod_name: prod_name,
      prod_ppu: prod_ppu,
      cur_prod_stock: cur_prod_stock,
      prod_vol: prod_vol,
      type: type,
      // HARDCODED EMAIL, needs to be received as props or fetch from state somewhere for live value
    };

    console.log("payload", payload);
    try {
      const res = await axios.post(PRODUCT, payload);
      if (res.data.error) {
        // something went wrong
        console.error(res);
        setError(res.data.message);
      } else {
        console.log(res.data.message);
        setError(null);
        history.push("/inventory-dashboard");
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
                    setType(e.value);
                  }}
                  // value={"defaultOption"}
                  placeholder="Select Type"
                />
              </div>
            </Col>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                value={prod_name}
                onChange={(e) => setProd_name(e.target.value)}
                type="Quantity"
                placeholder=""
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Price Per Unit</Form.Label>{" "}
              <Form.Control
                value={prod_ppu}
                onChange={(e) => setProd_ppu(e.target.value)}
                type="Amount"
                placeholder=""
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Opening Stock</Form.Label>{" "}
            <Form.Control
              value={cur_prod_stock}
              onChange={(e) => setCur_prod_stock(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Product Volume</Form.Label>{" "}
            <Form.Control
              value={prod_vol}
              onChange={(e) => setProd_vol(e.target.value)}
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
