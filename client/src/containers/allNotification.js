import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { GET_NOTIFICATION } from "../api";


const AllNotification = (props) => {
  console.log("prtopss", props);
  const [notify, setNotify] = useState([]);

  useEffect(() => {
    console.log(localStorage.getItem("email"));
    const email = localStorage.getItem("email");
    const fetchData = async () => {
      const result = await axios.get(`${GET_NOTIFICATION}?email=${email}`);
      console.log("notify", result);
      if (result.data) {
        setNotify(result.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>All Notifications</h3>
          {notify.map((noti, index) => {
            return (
              <div key={index} className="mb-2">
                <Card>
                  <Card.Header
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Sent By ID - {noti.sent_by}</div>
                    <div>Date - {noti.notif_date.substring(0, 10)}</div>
                  </Card.Header>
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Card.Title>Message</Card.Title>
                      <Card.Title>{`Status - ${
                        noti.read_status === 1 ? "Read" : "Unread"
                      }`}</Card.Title>
                    </div>
                    <Card.Text>{noti.msg}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllNotification;
