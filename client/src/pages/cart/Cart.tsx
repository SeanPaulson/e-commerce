import './_cart.scss';
import CartItems from '../../components/CartItem/CartItems';
import { Button } from 'react-bootstrap';
import { redirect, useLoaderData } from 'react-router';
import { CartItem, LoaderData } from '../../utils/types';
import { checkout, getUserCart } from '../../utils/fetchApi';
import { useContext, useEffect, useState } from 'react';
import useConvertMoneyToNumber from '../../hooks/useConvertMoneyToNumber';
import { ContextApp } from '../../components/UserContext';

export default function Cart() {

    const cartData = useLoaderData() as LoaderData<typeof getUserCart>;
    const { state } = useContext(ContextApp);
    const [cartState, setCartState] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState<string>();

    useEffect(() => {
        if (cartData[0]) {
            setCartState(cartData)
            setCartTotal(useConvertMoneyToNumber(cartData))
        }
    }, [cartData])

    const handleRemove = (id?: number) => {
        const newCart = cartState?.filter((item) => item.product_id !== id)
        if (newCart) {
            setCartState(newCart);
            setCartTotal(useConvertMoneyToNumber(newCart));
        }
    }
    //TODO res is sending entire server Response. need to make a custom response. 
    const handleCheckout = async () => {
        const res = await checkout();
        if (res && res.ok) {
            setCartState([])
            redirect('/orders');
        }
    }

    return (
        <>
            <h1>{cartState.length === 0 ? 0 : cartState.length} items in your cart</h1>
            <div className='cart__wrapper'>

                {cartState[0] &&
                    <>
                        <div className='cart__body--flex'>
                            {cartState.map((item, index) => (
                                <CartItems updateCart={handleRemove} cartItem={item} key={index} />
                            ))}

                        </div>
                        <div className='checkout'>
                            <h5>Payment Info</h5>
                            <div id={'paymentInfo'}>
                                <p style={{ color: 'blue' }}>{state.userProfile.provider}</p>
                                <p>Card ending in {`${state.userProfile.account_number}`.slice(-4)}</p>
                            </div>
                            <br />
                            <p>Total: {cartTotal}</p>
                            <Button onClick={handleCheckout} className='rounded-pill' variant='dark'>Proceed to checkout</Button>
                        </div>
                    </>
                }

            </div>
        </>
    )
}