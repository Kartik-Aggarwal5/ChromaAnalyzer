import React, { useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";

const Admin = () => {
  const role = ["Sales Manager", "Inventory Manager", "Purchase Manager"];
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <h1>Hi Admin!</h1>
          </div>
        </div>
      </div>
      <Row xs={1} md={3} className="g-4 pt-4 mx-5">
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title> Sales Manager </Card.Title>
              <Card.Text>View Sales Manager Dashboard !</Card.Text>
              <Button className="btn btn-info" href="/sales-dashboard">
                View
              </Button>{" "}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title> Inventory Manager </Card.Title>
              <Card.Text>View Inventory Manager Dashboard !</Card.Text>
              <Button className="btn btn-info" href="/inventory-dashboard">
                View
              </Button>{" "}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title> Purchase Manager</Card.Title>
              <Card.Text>View Purchase Manager Dashboard !</Card.Text>
              <Button className="btn btn-info" href="/purchase-dashboard">
                View
              </Button>{" "}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Employee</Card.Title>
              <Card.Text>View All Employees</Card.Text>
              <Button className="btn btn-info" href="/get-employee">
                View
              </Button>{" "}
              <Button className="btn btn-info ml-4" href="/add-employee">
                Add
              </Button>{" "}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Admin;
