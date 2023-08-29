import './_orderRouter.modules.scss';
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { getUserOrderHistory } from "../utils/fetchApi";
import {  LoaderData } from "../utils/types";
import { Button } from 'react-bootstrap';
import { useState } from 'react';


export default function OrderRouter() {
  const orders = useLoaderData() as LoaderData<typeof getUserOrderHistory>;
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const handleClick = (id: number, t: number) => {
    setTotal(t)
    navigate(`/orders/${id}`)
    
  }

  if (orders.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '5rem' }}><b>You have not ordered anything</b></p>
  }

  return (
    <div className='orderRouter'>
      <ul id='orderRouter__tabs'>
        {orders.map((order) => (
          <li key={order.id}>
            <Button key={order.id} onClick={() => handleClick(order.id, order.total)} >{`order ${order.id}`}</Button>
          </li>
        ))}
      </ul>
      <Outlet context={total}/>
    </div>
  )
}