import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import "react-data-table-component-extensions/dist/index.css";

const Production = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/production">Production</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/production-order">Place Order</Nav.Link>
              <Nav.Link href="/production-history">Order History</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Production;
