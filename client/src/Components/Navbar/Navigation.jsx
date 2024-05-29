import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import NavbarLogo from "./../../assets/Image/WAU-removebg-preview.png"

const Navigation = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="font-cabin ">
        <Navbar.Brand href="#home"><img src={NavbarLogo} alt="" height={30} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto fs-default ">
            <Nav.Link href="#features" className='text-white'>Home</Nav.Link>
            <Nav.Link href="/login" className='text-white'>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
