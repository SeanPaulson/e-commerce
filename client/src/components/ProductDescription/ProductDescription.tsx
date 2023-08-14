import Button from "react-bootstrap/esm/Button";
import Accordion from "react-bootstrap/esm/Accordion";
import Image from "react-bootstrap/esm/Image";
import Form from 'react-bootstrap/Form';
import { Product } from "../../utils/types";
import { useNavigate, useParams } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { addItemToCart } from "../../utils/fetchApi";

type Iprops = {
    product: Product;
}

type InputType = {
    quantity: number
}

export default function ProductDescription({ product }: Iprops) {



    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<InputType>();


    const onSubmit: SubmitHandler<InputType> = ({ quantity }) => {
        if (id) {
            addItemToCart(id, quantity)
            .then(res => {
                console.log(res);
            })
            .then(() => navigate('/cart'))
        }
    }

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

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>

                    <Form.Label>Quantity<b style={{ color: 'red' }}>*</b></Form.Label>
                    <Form.Control
                        size="sm"
                        {...register("quantity", { required: true, min: 1 })}
                        type="number"
                        defaultValue={0}
                    />
                </Form.Group>
                <Button
                    type="submit"
                    variant="light"
                    className="mx-3 my-3 rounded-pill border border-dark border-2"
                >
                    <b>Add to cart</b>
                </Button>
            </Form>
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