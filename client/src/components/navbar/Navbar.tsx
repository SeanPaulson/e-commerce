import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import "./_navbar.scss";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Offcanvas from "react-bootstrap/esm/Offcanvas";

function NavbarComponent() {
  return (
    <>
      <Navbar>
        <Navbar.Brand href="#home" className="navLogo ">
          E-commerce
        </Navbar.Brand>
        <Form className="flex-grow-1 me-4">
          <Form.Group>
            <Form.Control size="sm" type="text" placeholder="Search" />
          </Form.Group>
        </Form>
        <Nav.Item className="flex-row gap-4 flex-shrink-0">
          <Nav.Link className="p-1 nav-img-link">
            <Image
              className="profile-img"
              src="/person.svg"
              alt="profile"
              roundedCircle
            ></Image>
          </Nav.Link>
          <Nav.Link className="p-1 nav-img-link flex-shrink-0">
            <Image
              className="cart-img"
              src="/cart.svg"
              alt="shopping cart"
              roundedCircle
              fluid
              role="shopping cart"
            ></Image>
          </Nav.Link>
        </Nav.Item>
      </Navbar>
      <Navbar expand="md">
        <Container className="justify-content-start">
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-md`}
            className="nav-btn"
          />
            {/* <Image className="menu-img__btn" src="/list.svg"></Image> */}
            <Navbar.Offcanvas restoreFocus  aria-labelledby={`offcanvasNavbarLabel-expand-md`}>
              <Offcanvas.Header closeButton>
                <h1>
                  <b>Shop By Category</b>
                </h1>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav>
                  {/* <category nav/div> */}
                  <Nav.Item>Men's Clothing</Nav.Item> {/* <category nav/div> */}
                  <Nav.Item>Women's clothing</Nav.Item>{" "}
                  <Nav.Item>jewelry</Nav.Item> {/* <category nav/div> */}
                  <Nav.Item>electronics</Nav.Item> {/* <category nav/div> */}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
