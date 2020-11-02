/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const currentYear = new Date().getFullYear()

function AdminFooter() {
    return (
      <>
        <Container fluid>
          <footer className="footer pt-0 pr-2 fixed-bottom">
            <Row className="align-items-center justify-content-lg-end">
              <Col>
                <Nav className="nav-footer justify-content-center justify-content-lg-end">
                  <NavItem>
                    <NavLink
                      href="#pablo"
                      target="_blank"
                    >
                      © {currentYear}{" "}Tozme
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </footer>
        </Container>
      </>
    );
}

export default AdminFooter;
