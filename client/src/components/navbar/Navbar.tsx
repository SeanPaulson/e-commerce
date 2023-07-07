import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import "./_navbar.scss";
// import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Offcanvas from "react-bootstrap/esm/Offcanvas";

function NavbarComponent() {
  return (
    <>
      <Navbar>
        <Navbar.Brand href="#home" className="navLogo">
          E-commerce
        </Navbar.Brand>
        <Form className="flex-grow-1 flex-shrink-0">
          <Form.Group>
            <Form.Control className="border-dark rounded-pill" size="sm" type="text" placeholder="Search" />
          </Form.Group>
        </Form>
        <Nav.Item className=" nav-profile-cart d-flex flex-shrink-0 gap-2 ">
          <Nav.Link className="p-1 nav-img-link ">
            <Image
              className="profile-img"
              src="/person.svg"
              alt="profile"
              roundedCircle
            ></Image>
          </Nav.Link>
          <Nav.Link className="p-1 nav-img-link">
            <Image
              className="cart-img"
              src="/cart.svg"
              alt="cart"
              roundedCircle
              fluid
              role="navigation"
            ></Image>
          </Nav.Link>
        </Nav.Item>
      </Navbar>
      <Navbar expand="md">
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-md`}
          className="nav-btn"
        />
        {/* <Image className="menu-img__btn" src="/list.svg"></Image> */}
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
            <Nav className="justify-content-between w-100">
              <Nav.Link>Men's Clothing</Nav.Link>
              <Nav.Link>Women's clothing</Nav.Link>
              <Nav.Link>Jewelry</Nav.Link>
              <Nav.Link>Electronics</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
