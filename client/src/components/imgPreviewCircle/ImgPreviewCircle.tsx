import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
// import Card from "react-bootstrap/esm/Card";
import "./_ImgPreviewCircle.scss";
// import CardImageOverlay from "react-bootstrap/CardImgOverlay";
import Image from "react-bootstrap/esm/Image";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

const ImgPreviewCircle = () => {

  return (
    <Container id="wrapper">
      <Row className="gap-4 justify-content-center" id="hero">
        <Col  >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/computer.webP"></Image>
          <Link to={`/product/category/3`} >Electronics</Link>
        </Col>
        <Col >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/ring.webP"></Image>
          <Link to={`/product/category/3`} >Jewelry</Link>
        </Col>
        <Col >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/shirt.webP"></Image>
          <Link to={`/product/category/0`} >Men's Cloths</Link>
        </Col>
        <Col >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/jacket.webP"></Image>
          <Link to={`/product/category/1`} >Women's Cloths</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ImgPreviewCircle;
