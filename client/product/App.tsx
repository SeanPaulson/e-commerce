import React from "react";
import "./app.scss";
import NavbarComponent from "../src/components/navbar/Navbar";
import CarouselComponent from "../src/components/carousel/Carousel";
import Button from "react-bootstrap/esm/Button";
import Accordion from "react-bootstrap/esm/Accordion";

function App() {
  return (
    <>
      <NavbarComponent />
      <CarouselComponent />
      <div className="d-flex mx-2 flex-column">
        <div>
          <span>
            <b>$11.22 * * * * * </b>{" "}
          </span>
          <div>
            <h4>description</h4> <p>description from seller about this item</p>
            <b>reviews</b>
          </div>
        </div>
        <Button
          variant="light"
          className="mx-3 my-3 rounded-pill border border-dark border-2"
        >
          <b>Buy it now</b>
        </Button>
        <Button
          variant="dark"
          className="mx-3 my-2 rounded-pill border border-dark border-2"
        >
          <b>Buy it now</b>
        </Button>
        <Accordion flush>
          <Accordion.Item eventKey="0" className="w-100"></Accordion.Item>
          <Accordion.Header className=" w-100">
            <b>Product Details</b>
          </Accordion.Header>
          <Accordion.Body>
            product details
          </Accordion.Body>
        </Accordion>
        <Accordion flush>
          <Accordion.Item eventKey="0" className="text-dark w-100"></Accordion.Item>
          <Accordion.Header className=" w-100">
            <b>FAQs</b>
          </Accordion.Header>
          <Accordion.Body>
            faqs
          </Accordion.Body>
        </Accordion>
        <Accordion flush>
          <Accordion.Item eventKey="0" className="text-dark w-100"></Accordion.Item>
          <Accordion.Header className=" w-100">
            <b>Meet your seller</b>
          </Accordion.Header>
          <Accordion.Body>
            seller info
          </Accordion.Body>
        </Accordion>
      </div>
    </>
  );
}

export default App;
