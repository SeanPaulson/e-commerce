import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
// import Card from "react-bootstrap/esm/Card";
import "./_ImgPreviewCircle.scss";
// import CardImageOverlay from "react-bootstrap/CardImgOverlay";
import Image from "react-bootstrap/esm/Image";
import Container from "react-bootstrap/esm/Container";

const ImgPreviewCircle = () => {

  return (
    <Container id="wrapper">
      <Row className="gap-4 justify-content-center" id="hero">
        <Col  >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/computer.webP"></Image>
          <p><a href="/product/category/3" >Electronics</a></p>
        </Col>
        <Col >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/ring.webP"></Image>
          <p><a href="/product/category/2" >Jewelry</a></p>
        </Col>
        <Col >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/shirt.webP"></Image>
          <p><a href="/product/category/0" >Men's Cloths</a></p>
        </Col>
        <Col >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/jacket.webP"></Image>
          <p><a href="/product/category/1" >Women's Cloths</a></p>
        </Col>
      </Row>
    </Container>
  );
};

export default ImgPreviewCircle;
