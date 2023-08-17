import { Button, Form } from "react-bootstrap";
import { useState } from "react";

type Iprops = {
    save: (newQuantity?: number) => void;
    quantity: number;
}

export default function QuantityForm({ quantity, save }: Iprops) {



    const [nanError, setNaNError] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity)

    const handleSubmit = () => {
        if (!nanError) {
            save(newQuantity)
        }
    }

    const handleChange = (target: string) => {
        const quantityAsNumber = Number(target)
        if (isNaN(quantityAsNumber) || quantityAsNumber <= 0) {
            setNaNError(true);
            return
        }
        setNaNError(false);
        setNewQuantity(quantityAsNumber);
    }

    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <Form.Group style={{ display: "flex" }}>
                <Form.Control
                    size="sm"
                    min={0}
                    required
                    type="text"
                    defaultValue={quantity}
                    style={{ width: '40px' }}
                    onChange={(e) => {handleChange(e.currentTarget.value)}} />
                <Button type="submit" variant="light">
                    Save
                </Button>

            </Form.Group >
            {nanError && <p style={{ color: 'red' }}>you must enter a number over 0</p>}
        </Form>
    )
}