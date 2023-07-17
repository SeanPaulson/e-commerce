// import React from "react";
import "./app.scss";
import NavbarComponent from "../../components/navbar/Navbar";
import CarouselComponent from "../../components/carousel/Carousel";
import Button from "react-bootstrap/esm/Button";
import Accordion from "react-bootstrap/esm/Accordion";
import Image from "react-bootstrap/esm/Image";



function App() {

  

  //check if user is signed in via secure client side cookie
  //if not 
    // if registered login
    // store auth cred in cookie and set state
      // else
      // register user and store returned auth state in state and cookies

  return (
    <>
      <NavbarComponent />
      <div className="app__container">
        <CarouselComponent />
        <div className="app__body mx-4 ">
          <div className="app_header" >
          <span>
            <Button variant="light" className="rounded-circle">
              <Image src="/heart.svg" alt="favorite button" />
            </Button>
            <b>$11.22 * * * * * </b>{" "}
          </span>
          <div>
            <h4>description</h4> <p>description from seller about this item</p>
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
          </div>
          <Accordion alwaysOpen={true} flush >
            <Accordion.Item eventKey="0" className="w-100"></Accordion.Item>
            <Accordion.Header className=" w-100">
              <b>Product Details</b>
            </Accordion.Header>
            <Accordion.Body>product details</Accordion.Body>
          </Accordion>
          <Accordion flush>
            <Accordion.Item
              eventKey="0"
              className="text-dark w-100"
            ></Accordion.Item>
            <Accordion.Header className=" w-100">
              <b>FAQs</b>
            </Accordion.Header>
            <Accordion.Body>faqs</Accordion.Body>
          </Accordion>
          <Accordion flush>
            <Accordion.Item
              eventKey="0"
              className="text-dark w-100"
            ></Accordion.Item>
            <Accordion.Header className=" w-100">
              <b>Meet your seller</b>
            </Accordion.Header>
            <Accordion.Body>seller info</Accordion.Body>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default App;
