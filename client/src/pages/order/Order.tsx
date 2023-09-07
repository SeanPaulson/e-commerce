import './_order.modules.scss';
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import CardComponent from "../../components/card/CardComponent";
import { LoaderData, ProductType } from '../../utils/types';
import { useEffect, useState } from 'react';
import { getOrderById, getProductById } from '../../utils/fetchApi';
import { DateTime } from 'luxon';

export default function Order() {

  const orders = useLoaderData() as LoaderData<typeof getOrderById>;
  const [products, setProducts] = useState<ProductType[]>([]);
  const total = useOutletContext<number>();

  useEffect(() => {
    let active = true;
    if (active) {
      setProducts([]);
      orders.forEach((item) => {
        getProductById(item.product_id.toString()).then((res) => {
          setProducts(prev => [...prev, res])
        });
      });
    }
    return () => {
      active = false;
    };
  }, [orders]);
  return (
    <div className="orderDetails__wrapper">
      {products[0] ? <ul>
        {
          products.map((product, index) => (
            <Link to={`/product/${product.id}`}>
              <div className='cardComponent__wrapper'>
                <CardComponent key={index} product={product} />
                <div className='cardComponent__details'>
                  <p id='name'><b>{product.name}</b></p>
                  <p id='total'>Total: {total}</p>
                  <p>order date: {DateTime.fromISO(`${product.modified_at}`).toISODate() ?? DateTime.fromISO(`${product.created}`).toISODate()}</p>
                </div>
              </div >
            </Link>
          ))
        }
      </ul> : null}
    </div>
  )
}

