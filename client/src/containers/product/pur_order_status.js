import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { PURORDERSTATUS, UNDELIVERED_PURCHASE_ORDER } from "../../api";

const OrderDelivered = ({ email }) => {
  // const login_email = localStorage.getItem("email");
  const history = useHistory();
  const [bill_id, setBill_id] = useState("");
  const [err, setError] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchRawMaterial = async () => {
      const res = await axios.get(UNDELIVERED_PURCHASE_ORDER);
      // body res.data
      setOptions(
        res.data.map((row) => ({
          value: String(row.bill_id),
          label: row.bill_id,
        }))
      );
      //   setstate(RawMaterial)
    };
    fetchRawMaterial();
  }, []);

  const setPurOrder = async (e) => {
    e.preventDefault();

    const payload = {
      bill_id: bill_id,
      // HARDCODED EMAIL, needs to be received as props or fetch from state somewhere for live value
    };
    console.log("payload", payload);
    try {
      const res = await axios.post(PURORDERSTATUS, payload);
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
                            setBill_id(e.value);
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

export default OrderDelivered;
