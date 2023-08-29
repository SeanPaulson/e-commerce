import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import "./_navbar.scss";
// import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Offcanvas from "react-bootstrap/esm/Offcanvas";
import LoginOverlay from "../loginOverlay/LoginOverlay";
import Button from "react-bootstrap/esm/Button";
import { Link, useRouteLoaderData } from "react-router-dom";
import { ProductCategories, CartItem } from "../../utils/types";
import { useEffect, useState } from "react";
import Badge from "react-bootstrap/esm/Badge";

function NavbarComponent() {

  const [show, setShow] = useState(false);
  const [toggled, setToggled] = useState(false)
  const cartItems = useRouteLoaderData('cart') as CartItem[];
  const [cartQuantity, setCartQuantity] = useState(0);

  const handleClose = () => {
    if (toggled) {
      setShow(false);
      setToggled(false);
    }
  }

  useEffect(() => {
    if (cartItems && cartItems[0]) {
      setCartQuantity(cartItems.length)
    }
  }, [cartItems])

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
          <Nav.Link as={Link} to="/cart" className="rounded-circle nav-img-link">
            <Button variant="light" className="rounded-circle ">
              <Image
                className="cart-img"
                src="/cart.svg"
                alt="cart"
                roundedCircle
                fluid
                role="navigation"
              ></Image>
            </Button>
            <Badge className="pill__cart" pill bg='success' >{cartQuantity ?? cartQuantity}</Badge>
          </Nav.Link>
        </Nav.Item>
      </Navbar>
      <Navbar collapseOnSelect expand='md' className="navbar__component" id='navbar_categories'>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-md`}
          className="nav-btn"
          onClick={() => {
            setToggled(true)
            setShow(true);
          }}
        />
        <Navbar.Offcanvas
          show={show}
          restoreFocus
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
        >
          <Offcanvas.Header >
            <h1>
              <b>Shop By Category</b>
            </h1>
            <Button onClick={() => {
              setShow(false);
              setToggled(false);
            }} variant="light">X</Button>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-around w-100 " id="nav-categories">
              <Nav.Link onClick={handleClose} as={Link} to={`/product/category/${ProductCategories["MENS CLOTHING"]}`}>Men's Clothing</Nav.Link>
              <Nav.Link onClick={handleClose} as={Link} to={`/product/category/${ProductCategories["WOMENS CLOTHING"]}`}>Women's clothing</Nav.Link>
              <Nav.Link onClick={handleClose} as={Link} to={`/product/category/${ProductCategories.JEWELRY}`}>Jewelry</Nav.Link>
              <Nav.Link onClick={handleClose} as={Link} to={`/product/category/${ProductCategories.ELECTRONICS}`}>Electronics</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar >
    </>
  );
}

export default NavbarComponent;
