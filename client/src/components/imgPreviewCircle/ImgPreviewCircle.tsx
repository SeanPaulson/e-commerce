import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
// import Card from "react-bootstrap/esm/Card";
import "./_ImgPreviewCircle.scss";
// import CardImageOverlay from "react-bootstrap/CardImgOverlay";
import Image from "react-bootstrap/esm/Image";
import Container from "react-bootstrap/esm/Container";
import { useContext } from 'react';
import { ContextApp } from "../ContextProvider";

const ImgPreviewCircle = () => {

  const { state } = useContext(ContextApp);

  return (
    <Container id="wrapper">
      {Object.keys(state.userProfile).length != 0 && <h4><i>Welcome back, {state.userProfile.first_name}!</i></h4>}
      <Row className="gap-4 justify-content-center" id="hero">
        <Col  >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/computer.webP"></Image>
          <p>alsdfjdskafj</p>
        </Col>
        <Col >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/ring.webP"></Image>
          <p>alsdfjdskafj</p>
        </Col>
        <Col >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/shirt.webP"></Image>
          <p>alsdfjdskafj</p>
        </Col>
        <Col >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/jacket.webP"></Image>
          <p>alsdfjdskafj</p>
        </Col>
        <Col >
          <Image roundedCircle className="imagePreview" alt="image preview" src="/backpack.webP"></Image>
          <p>alsdfjdskafj</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ImgPreviewCircle;
