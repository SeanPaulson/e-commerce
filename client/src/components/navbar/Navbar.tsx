import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
// import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import "./_navbar.scss";

function NavbarComponent() {
  return (
    <Navbar expand="sm">
      <Col>
        <Navbar.Brand href="#home" className="navLogo">
          E-commerce
        </Navbar.Brand>
      </Col>
      <Col sm={{span: 2}}>
        <Image src="/person.svg" alt="profile" roundedCircle></Image>
        <Image src="/cart.svg" alt="shopping cart" roundedCircle></Image>
      </Col>
    </Navbar>
  );
}

export default NavbarComponent;
