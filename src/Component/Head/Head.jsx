import React from "react";
import "./Head.css";
import logo from "../../Component/Accets/V9.png";
import Canvas from "../Canvas/Canvas";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
function Head({ handleClosee, handleShoww, setShoww, showw }) {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className="navBrand">
            <img src={logo} className="main_logo" alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
            <Nav className="navRescenter">
              <Link to="/" style={{textDecoration:"none"}}>
                <Nav.Link href="/" className="mt-2 text-white">
                  Token STAKING
                </Nav.Link>
              </Link>
              <Link to="/Nft_Staking" style={{textDecoration:"none"}}>
                <Nav.Link href="/Nft_Staking" className="mt-2 text-white">
                  NFT STAKING
                </Nav.Link>
              </Link>
              <Nav.Link eventKey={2} >
                <Canvas
                  handleClosee={handleClosee}
                  handleShoww={handleShoww}
                  setShoww={setShoww}
                  showw={showw}
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Head;
