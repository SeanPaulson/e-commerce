import './_orderRouter.modules.scss';
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { getUserOrderHistory } from "../utils/fetchApi";
import {  LoaderData } from "../utils/types";



// type ParamsCustom = {
//   id: Params | undefined
// }


export default function OrderRouter() {
  const orders = useLoaderData() as LoaderData<typeof getUserOrderHistory>;
  //TODO try and order link total to outlet via context



  if (orders.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '5rem' }}><b>You have not ordered anything</b></p>
  }

  return (
    <div className='orderRouter'>
      <ul id='orderRouter__tabs'>
        {orders.map((order) => (
          <li key={order.id}>
            <Link to={`/orders/${order.id}`}>{`order ${order.id}`}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  )
}
