import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
// import Card from "react-bootstrap/esm/Card";
import "./_ImgPreviewCircle.scss";
// import CardImageOverlay from "react-bootstrap/CardImgOverlay";
import Image from "react-bootstrap/esm/Image";
import Container from "react-bootstrap/esm/Container";

const ImgPreviewCircle = () => {
  return (
    <Container id="intro" fluid>
      <h3>Happy Fathers Day!</h3>
      <Row className="gap-4 justify-content-center ">
        <Col>
          <Image roundedCircle src="/computer.jpg"></Image>
          <p>alsdfjdskafj</p>
        </Col>
        <Col id="col-empty"></Col>
        <Col>
          <Image roundedCircle src="/ring.jpg"></Image>
          <p>alsdfjdskafj</p>
        </Col>
      </Row>
      <Row className="gap-4 justify-content-center">
        <Col>
          <Image roundedCircle src="/shirt.jpeg"></Image>
          <p>alsdfjdskafj</p>
        </Col>
        <Col id="intro-img-static">
          <Image  roundedCircle src="/jacket.jpg"></Image>
          <p>alsdfjdskafj</p>
        </Col>
        <Col>
          <Image roundedCircle src="/backpack.jpg"></Image>
          <p>alsdfjdskafj</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ImgPreviewCircle;
