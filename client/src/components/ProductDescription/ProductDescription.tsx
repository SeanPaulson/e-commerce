import Button from "react-bootstrap/esm/Button";
import Accordion from "react-bootstrap/esm/Accordion";
import Image from "react-bootstrap/esm/Image";
import { Product } from "../../utils/types";

type Iprops = {
    product: Product;
}

export default function ProductDescription({ product }: Iprops) {
    return (<div className="app__body mx-4 ">
        <div className="app_header" >
            <span>
                <Button variant="light" className="rounded-circle">
                    <Image src="/heart.svg" alt="favorite button" />
                </Button>
                <b>{product.price}</b>{" "}
            </span>
            <div>
                <h4>{product.name}</h4> <p>{product.description}</p>
            </div>

            <Button
                variant="light"
                className="mx-3 my-3 rounded-pill border border-dark border-2"
            >
                <b>Add to cart</b>
            </Button>
            <Button
                variant="success"
                className="mx-3 my-2 rounded-pill"
            >
                <b>Buy it now</b>
            </Button>
        </div>
        <Accordion alwaysOpen={true} flush >
            <Accordion.Item eventKey="0" className="w-100"></Accordion.Item>
            <Accordion.Header className=" w-100">
                <b>Product Details</b>
            </Accordion.Header>
            <Accordion.Body>{product.description}</Accordion.Body>
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
    </div>)
}