import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import "./CardComponent.scss";
import { Link } from "react-router-dom";

const CardComponent = () => {
  return (
    <Card className="m-2 w-50 cardComponent card__hover flex-shrink-0 ">
      <Link to="/product">
        <Card.Body>
          <Card.Img src="card-image.svg" alt="product" />
          <Card.ImgOverlay className="d-flex flex-row-reverse align-items-center">
            <Button variant="light" className="align-self-start rounded-5">
              <Image alt="favorite button" src="/heart.svg"></Image>
            </Button>
            <Card.Title className="bg-light rounded-5 p-1 align-self-end flex-grow-1">
              <p
                style={{
                  fontSize: ".65em",
                  height: "2px",
                  textAlign: "center",
                  textOverflow: "ellipsis",
                }}
              >
                <span>Product Name</span>
              </p>
            </Card.Title>
          </Card.ImgOverlay>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default CardComponent;
