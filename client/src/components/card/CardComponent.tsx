import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import "./CardComponent.scss";
import { Link } from "react-router-dom";

const CardComponent = () => {
  return (
    <Card className="cardComponent card__hover ">
      <Link to="/product">
        <Card.Body className="p-0" id="cardBody">
          <Card.Img src="shirt.webP" alt="product" />
          <Card.ImgOverlay className="d-flex flex-row-reverse p-0 align-items-center">
            <Button variant="light" className="align-self-start rounded-5 p-0 heart__button">
              <Image alt="favorite button" src="/heart.svg"></Image>
            </Button>
            <Card.Title className="bg-light rounded-5 align-self-end flex-grow-1">
              <p
                style={{
                  fontSize: ".6em",
                  height: "2px",
                  textAlign: "center",
                  textOverflow: "ellipsis",
                  color: "black",
                }}
              >
                <span><b>$100</b></span>
              </p>
            </Card.Title>
          </Card.ImgOverlay>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default CardComponent;
