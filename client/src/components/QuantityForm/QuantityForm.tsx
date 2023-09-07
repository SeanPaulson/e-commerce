import { Button, Form as BootstrapForm } from "react-bootstrap";
import { useState } from "react";
import { SubmitTarget } from "react-router-dom/dist/dom";

type Iprops = {
    save: (newQuantity?: number, formData?: SubmitTarget) => void;
    quantity: number;
}

export default function QuantityForm({ quantity, save }: Iprops) {



    const [nanError, setNaNError] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (!nanError) {
            // const formData = new FormData(e.currentTarget)
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

        <BootstrapForm
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
            }}
        >
            <BootstrapForm.Group style={{ display: "flex" }}>
                <BootstrapForm.Control
                    size="sm"
                    min={0}
                    required
                    name="quantity"
                    type="text"
                    defaultValue={quantity}
                    style={{ width: '40px' }}
                    onChange={(e) => { handleChange(e.currentTarget.value) }} />
                <Button type="submit" variant="light">
                    Save
                </Button>

            </BootstrapForm.Group >
            {nanError && <p style={{ color: 'red' }}>you must enter a number over 0</p>}
        </ BootstrapForm>
    )
}