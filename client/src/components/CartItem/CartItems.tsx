import { Button, Form, Image } from 'react-bootstrap';
import { CartItem } from '../../utils/types';
import './_cartItems.scss'
import { useForm } from 'react-hook-form';
import { deleteCartItem } from '../../utils/fetchApi';

type Iprops = {
    cartData: CartItem;
    updateCart: (id: number) => void;
}

export default function CartItem({ cartData, updateCart }: Iprops) {

    const { handleSubmit } = useForm();


    const onSubmit = () => {
        deleteCartItem(cartData.product_id)
            .then(res => { 
                console.log(res) 
                updateCart(cartData.product_id);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='cart__item__wrapper'>
            <Image src={cartData.img_url} alt={`Product Image ${cartData.name}`} />
            <h3 id='name' >{cartData.name}</h3>
            <p id='description' >{cartData.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flex: '0 1 100%' }}>
                <p id='quantity' >Quantity Selected: {cartData.quantity}</p>
                <p id='total' >{cartData.total}</p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)} style={{ alignSelf: 'center' }}>
                <Button variant='light' size='sm' type='submit'>Remove</Button>
            </Form>
        </div>
    )

}