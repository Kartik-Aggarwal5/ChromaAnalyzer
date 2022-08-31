import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {
  CREATE_NOTIFICATION,
  GET_NOTIFICATION,
  UPDATE_NOTIFICATION_STATUS,
} from "../api";

const InventoryHeader = (props) => {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [sent, setSent] = useState("");
  const [message, setMessage] = useState("");
  const [notify, setNotify] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("111111111111", notify);

  const zeroNotification =
    notify && notify.filter((noti) => noti.read_status === 0);

  console.log("zeroNotification", zeroNotification);

  useEffect(() => {
    console.log(localStorage.getItem("email"));
    const email = localStorage.getItem("email");
    // const email = "rishabhsinghal@paintforus.com";
    const fetchData = async () => {
      const result = await axios.get(`${GET_NOTIFICATION}?email=${email}`);
      console.log("notify", result);
      if (result.data) {
        setNotify(result.data);
      }
    };
    fetchData();
  }, []);

  const handleSent = async () => {
    console.log(sent, message);
    const notification = {
      recieved_by: sent,
      sent_by: localStorage.getItem("email") || "",
      msg: message,
      read_status: 0,
    };
    try {
      const data = await axios.post(CREATE_NOTIFICATION, notification);
      if (data) {
        toast.success("Notification Created.");
      }
      console.log(data);
    } catch (err) {
      toast.error("Unable to create Notification. Some error occured.");

      console.log(err);
    }
  };

  const handleLogout = (a, b, c) => {
    console.log("a", a, "b", b, "c", c);
    localStorage.removeItem("email");
    toast.success("Logout Sucessfull.");
    history.push("/");
  };

  const readStatus = async (msg, sent_by, recieved_by) => {
    let update = {
      msg: msg,
      sent_by: sent_by,
      recieved_by: recieved_by,
    };
    const updated = await axios.post(UPDATE_NOTIFICATION_STATUS, update);
    console.log(updated);
    history.push({
      pathname: "/all_notification",
    });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          {" "}
          <Modal.Title>Create Notification</Modal.Title>
          <i class="fa fa-times" aria-hidden="true" onClick={handleClose}></i>
        </Modal.Header>
        <Modal.Body>
          <label> Sent To:</label>
          <input
            type="text"
            name="sent"
            value={sent}
            onChange={(e) => setSent(e.target.value)}
          />
          <label>Message</label>
          <textarea
            type="text"
            name="messgae"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSent();
              handleClose();
            }}
          >
            Sent
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/inventory-dashboard">
            {" "}
            Inventory Manager{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link href="/create_product">Create Product</Nav.Link>
            <Nav className="me-auto">
              <NavDropdown title="Notifications" id="basic-nav-dropdown">
                {notify.map((noti, index) => {
                  if (noti.read_status == 0) {
                    return (
                      <NavDropdown.Item
                        onClick={() =>
                          readStatus(noti.msg, noti.sent_by, noti.recieved_by)
                        }
                        style={{
                          background: "lightblue",
                          border: "solid aliceblue",
                        }}
                        key={index}
                      >
                        {`Sent By - ${
                          noti.sent_by
                        }     (${noti.notif_date.substring(0, 10)})`}{" "}
                      </NavDropdown.Item>
                    );
                  }
                })}
                {zeroNotification.length === 0 ? (
                  <div>No new notification</div>
                ) : null}
              </NavDropdown>

              <Nav.Link onClick={handleShow}> Create Notification </Nav.Link>
              <Nav.Link onClick={handleLogout}> Logout </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default InventoryHeader;
