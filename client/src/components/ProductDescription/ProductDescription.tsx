import Button from "react-bootstrap/esm/Button";
import Accordion from "react-bootstrap/esm/Accordion";
import Image from "react-bootstrap/esm/Image";
import Form from 'react-bootstrap/Form';
import { ProductType } from "../../utils/types";
import { useNavigate, useParams } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { addItemToCart } from "../../utils/fetchApi";
import { useContext, useEffect } from "react";
import { ContextApp } from "../UserContext";

type Iprops = {
    product: ProductType;
}

type InputType = {
    quantity: number,
    auth: string,
}

export default function ProductDescription({ product }: Iprops) {

    const { state } = useContext(ContextApp);
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, clearErrors, setError, formState: { errors } } = useForm<InputType>();

    useEffect(() => {
        clearErrors('auth');
    }, [state])

    const onSubmit: SubmitHandler<InputType> = ({ quantity }) => {

        if (id && !(state.userProfile instanceof Error)) {
            addItemToCart(Number(id), quantity)
                .then(res => {
                    if(res.ok) {
                        return
                    }
                })
                .then(() => navigate('/cart'))
        } else {
            setError('auth', {
                type: 'manual',
                message: 'You must login'
            });
        }
        // clearErrors('auth');
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

                <Form.Group
                    {...register('auth')}
                >
                    {errors.auth && <p className="errors">{errors.auth.message}</p>}
                    <Form.Label>Quantity<b style={{ color: 'red' }}>*</b></Form.Label>
                    <Form.Control
                        size="sm"
                        min={0}
                        {...register("quantity", { required: true, min: 1 })}
                        type="number"
                        defaultValue={0}
                        onChange={() => clearErrors('auth')}
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
            <span className="d-flex align-items-center">
                <Button
                    variant="success"
                    className="mx-3 my-2 rounded-pill"
                >
                    <b>Buy it now</b>
                </Button>
                <p className="m-0"><span style={{ color: "blue" }}>{state.userProfile.provider} </span>{ state.userProfile.account_number ? `Card ending in ${state.userProfile.account_number.toString().slice(-4)}` : ''}</p>
            </span>
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