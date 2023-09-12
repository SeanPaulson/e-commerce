import { Button, Form, Image } from 'react-bootstrap';
import { CartItem } from '../../utils/types';
import './_cartItems.scss'
import { useForm } from 'react-hook-form';
import { deleteCartItem } from '../../utils/fetchApi';
import { useState } from 'react';
import QuantityForm from '../QuantityForm/QuantityForm';
import { useSubmit } from 'react-router-dom';

type Iprops = {
    cartItem: CartItem;
    updateCart: (id: number) => void;
}

export default function CartItem({ cartItem, updateCart }: Iprops) {

    const submit = useSubmit();
    const { handleSubmit } = useForm();
    const [edit, setEdit] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity)


    const handleClick = async (newQuantity?: number) => {
        if (newQuantity && newQuantity !== quantity) {
            const data =
            {
                quantity: newQuantity,
                id: cartItem.product_id
            }
            submit(data, {
                method: 'POST',
                encType: 'multipart/form-data',
                action: '/cart'
            });
            setQuantity(newQuantity);
        }
        setEdit(!edit);

    }

    const onSubmit = () => {
        deleteCartItem(cartItem.product_id)
            .then(res => {
                if (res.ok) {
                    updateCart(cartItem.product_id);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='cart__item__wrapper'>
            <Image src={cartItem.img_url} alt={`Product Image ${cartItem.name}`} />
            <div className='cart__item__body' >
                <h3 id='name' >{cartItem.name}</h3>
                <p id='description' >{cartItem.description}</p>
                <div className='cart__item__footer' >
                    <div id='quantity' ><p style={{alignSelf: 'center'}}>Quantity Selected:</p>
                        {
                            edit ?
                                <QuantityForm save={handleClick} quantity={cartItem.quantity} />
                                :
                                <span>{quantity} <Button onClick={(e) => {
                                    e.preventDefault();
                                    handleClick();
                                }} variant='light' >Edit</Button></span>
                        }

                    </div>
                </div>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)} style={{ alignSelf: 'center' }}>
                <Button variant='danger' size='sm' type='submit'>Remove</Button>
            </Form>
        </div>
    )

}