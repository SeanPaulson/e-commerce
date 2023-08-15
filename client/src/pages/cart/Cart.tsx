import './_cart.scss';
import CartItems from '../../components/CartItem/CartItems';
import { Button } from 'react-bootstrap';
import { useLoaderData } from 'react-router';
import { CartItem, LoaderData } from '../../utils/types';
import { getUserCart } from '../../utils/fetchApi';
import { useState } from 'react';


export default function Cart() {

    const cartData = useLoaderData() as LoaderData<typeof getUserCart>;
    console.log(cartData)
    const [cartState, setCartState] = useState<CartItem[]>([]);
    //TODO handle cart state
    const handleRemove = (id: number) => {
        const newCart = cartState?.filter((item) => item.product_id !== id)
        if (newCart) {
            setCartState(newCart);
            console.log(cartState)
        }
    }

    return (
        <div className='cart__wrapper'>
            <h1>{cartState.length} items in your cart</h1>
            {cartData.length > 0 && <div className='cart__body--flex'>
                {cartData.map((item, index) => (
                    <CartItems updateCart={handleRemove} cartData={item} key={index} />
                ))}
                <div>
                    <p>pay info</p>
                    <Button variant='dark'>Proceed to checkout</Button>
                </div>
            </div>}
        </div>
    )
}