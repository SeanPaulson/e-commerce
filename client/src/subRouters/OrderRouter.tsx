import { Link, Outlet, useLoaderData } from "react-router-dom";
import { getUserOrderHistory } from "../utils/fetchApi";
import { LoaderData } from "../utils/types";




export default function OrderRouter() {
  const orders = useLoaderData() as LoaderData<typeof getUserOrderHistory>;
  console.log(orders)



  if (orders.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '5rem' }}><b>You have not ordered anything</b></p>
  }
  return (
    <>
      <p>list of orders</p>
      <ul>
        {orders.map((order) => (
          <li key={order.id as number}>
            <Link to={`/orders/${order.id}`}>{`order ${order.id}`}</Link>
          </li>
        ))}
      </ul>
      <p></p>
      <Outlet context={orders} />
    </>
  )
}
