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
      <h3>Happy 4th!</h3>
      <Row className="gap-4 justify-content-center" id="hero">
        <Col className="mw-25">
          <Image roundedCircle alt="image preview" src="/computer.webP"></Image>
          <p>alsdfjdskafj</p>
        </Col>
        <Col id="col-empty"></Col>
        <Col>
          <Image roundedCircle alt="image preview" src="/ring.webP"></Image>
          <p>alsdfjdskafj</p>
        </Col>
        <Col>
          <Image roundedCircle alt="image preview" src="/shirt.webP"></Image>
          <p>alsdfjdskafj</p>
        </Col>
        <Col id="intro-img-static">
          <Image roundedCircle alt="image preview" src="/jacket.webP"></Image>
          <p>alsdfjdskafj</p>
        </Col>
        <Col className="mw-25">
          <Image roundedCircle alt="image preview" src="/backpack.webP"></Image>
          <p>alsdfjdskafj</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ImgPreviewCircle;
