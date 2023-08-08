import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import "./_navbar.scss";
// import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Offcanvas from "react-bootstrap/esm/Offcanvas";
import LoginOverlay from "../loginOverlay/LoginOverlay";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

function NavbarComponent() {
  return (
    <>
      <Navbar className="navbar__component">
        <Nav.Link as={Link} to="/" className="navLogo"> 
          E-commerce
        </Nav.Link>
        <Form className="flex-grow-1 flex-shrink-0">
          <Form.Group>
            <Form.Control
              className="border-dark rounded-pill"
              size="sm"
              type="text"
              placeholder="Search"
            />
          </Form.Group>
        </Form>
        <Nav.Item className="p-1 nav-profile-cart d-flex flex-shrink-0  ">
          <LoginOverlay />
          <Nav.Link className="rounded-circle nav-img-link">
            <Button variant="light" className="rounded-circle">
              <Image
                className="cart-img"
                src="/cart.svg"
                alt="cart"
                roundedCircle
                fluid
                role="navigation"
              ></Image>
            </Button>
          </Nav.Link>
        </Nav.Item>
      </Navbar>
      <Navbar expand="md" className="navbar__component" id='navbar_categories'>
        <Navbar.Toggle
          aria-controls={`offcan>vasNavbar-expand-md`}
          className="nav-btn"
        />
        <Navbar.Offcanvas
          restoreFocus
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
        >
          <Offcanvas.Header closeButton>
            <h1>
              <b>Shop By Category</b>
            </h1>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-around w-100 " id="nav-categories">
              <Nav.Link as={Link} to='#'>Men's Clothing</Nav.Link>
              <Nav.Link as={Link} to='#'>Women's clothing</Nav.Link>
              <Nav.Link as={Link} to='#'>Jewelry</Nav.Link>
              <Nav.Link as={Link} to='#'>Electronics</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
