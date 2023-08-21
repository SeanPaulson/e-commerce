import './_cart.scss';
import CartItems from '../../components/CartItem/CartItems';
import { Button } from 'react-bootstrap';
import { redirect, useLoaderData } from 'react-router';
import { CartItem, LoaderData } from '../../utils/types';
import { checkout, getUserCart } from '../../utils/fetchApi';
import { useEffect, useState } from 'react';
import useConvertMoneyToNumber from '../../hooks/useConvertMoneyToNumber';


export default function Cart() {

    const cartData = useLoaderData() as LoaderData<typeof getUserCart>;
    const [cartState, setCartState] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState(useConvertMoneyToNumber(cartData));

    useEffect(() => {
        setCartState(cartData)
    }, [])

    const handleRemove = (id?: number) => {
        const newCart = cartState?.filter((item) => item.product_id !== id)
        if (newCart) {
            setCartState(newCart);
            setCartTotal(useConvertMoneyToNumber(newCart));
        }
    }
//TODO !Important!! cannot checkout array of items!
    const handleCheckout = async () => {
        const res = await checkout();
        console.log(res);
        setCartState([])
        redirect('/orders');
    }

    return (
        <>
            <h1>{cartState.length ? cartState.length : 0} items in your cart</h1>
            <div className='cart__wrapper'>

                {cartState.length > 0 && <>
                    <div className='cart__body--flex'>
                        {cartState.map((item, index) => (
                            <CartItems updateCart={handleRemove} cartItem={item} key={index} />
                        ))}

                    </div>
                    <div className='checkout'>
                        <h5><b>How you'll pay: //TODO show credit card</b></h5>
                        <p>total: {cartTotal}</p>
                        <Button onClick={handleCheckout} className='rounded-pill' variant='dark'>Proceed to checkout</Button>
                    </div></>
                }

            </div>
        </>
    )
}