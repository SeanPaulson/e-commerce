import { useState } from "react";
import './Carousel.scss'
import Carousel from "react-bootstrap/esm/Carousel";
import Image from "react-bootstrap/esm/Image";

const CarouselComponent = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (i: number): void => {
        setIndex(i);
    }

  return (
    <Carousel pause="hover" className="my-2 border" variant="dark" activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Image className="carousel__img" alt="product image" src="/card-image.svg" />
        <Carousel.Caption >
            <h3>first image</h3>
            <p>product description</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="carousel__img" alt="product image" src="/card-image.svg" />
        <Carousel.Caption>
            <h3>first image</h3>
            <p>product description</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="carousel__img" alt="product image" src="/card-image.svg" />
        <Carousel.Caption>
            <h3>first image</h3>
            <p>product description</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
