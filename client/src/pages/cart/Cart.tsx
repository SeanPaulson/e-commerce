import './_cart.scss';
import CartItems from '../../components/CartItem/CartItems';
import { Button } from 'react-bootstrap';
import { useLoaderData } from 'react-router';
import { CartItem, LoaderData } from '../../utils/types';
import { getUserCart } from '../../utils/fetchApi';
import { useEffect, useState } from 'react';


export default function Cart() {

    const cartData = useLoaderData() as LoaderData<typeof getUserCart>;
    const [cartState, setCartState] = useState<CartItem[]>([]);

    useEffect(() => {
        setCartState(cartData)
    }, [cartData])

    const handleRemove = (id: number) => {
        const newCart = cartState?.filter((item) => item.product_id !== id)
        if (newCart) {
            setCartState(newCart);
        }
    }

    return (
        <>
            <h1>{cartState.length ? cartState.length : 0} items in your cart</h1>
            <div className='cart__wrapper'>

                {cartState.length > 0 && <>
                    <div className='cart__body--flex'>
                        {cartState.map((item, index) => (
                            <CartItems updateCart={handleRemove} cartData={item} key={index} />
                        ))}

                    </div>
                    <div className='checkout'>
                        <h5><b>How you'll pay</b></h5>
                        <Button className='rounded-pill' variant='dark'>Proceed to checkout</Button>
                    </div></>
                }

            </div>
        </>
    )
}