import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import "./_navbar.scss";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Offcanvas from "react-bootstrap/esm/Offcanvas";

function NavbarComponent() {
  return (
    <Navbar expand="md">
      <Navbar.Brand href="#home" className="navLogo ">
        E-commerce
      </Navbar.Brand>
      <Nav>
        <Nav.Link>
          <Image
            className="ms-4"
            src="/person.svg"
            alt="profile"
            roundedCircle
          ></Image>
          <Image
            className="ms-4"
            src="/cart.svg"
            alt="shopping cart"
            roundedCircle
          ></Image>
        </Nav.Link>
      </Nav>
      <Container className="justify-content-start">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-btn">
          <Image src="/list.svg"></Image>
          <Navbar.Offcanvas restoreFocus>
            <Offcanvas.Header closeButton>
              <h1>
                <b>Shop By Category</b>
              </h1>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* <category nav/div> */}
              <p>ldkjf</p>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar.Toggle>
        <Form className="flex-grow-1 me-4">
          <Form.Group>
            <Form.Control size="sm" type="text" placeholder="Search" />
          </Form.Group>
        </Form>
      </Container>
      <Container>
      <Navbar.Collapse>
        <Nav>
          <Nav.Item>klsdjf</Nav.Item> {/* <category nav/div> */}
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
