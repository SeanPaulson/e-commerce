import { useLoaderData } from "react-router"
import { LoaderData, ProductCategories } from "../../utils/types";
import { getProductsByCategory } from "../../utils/fetchApi";
import CardComponent from "../../components/card/CardComponent";
import './category.scss';

export default function Category() {
    const products = useLoaderData() as LoaderData<typeof getProductsByCategory>;
    const categoryId = Object.keys(ProductCategories)[products[0].category_id];

    return (
        <>
            <h1 id="category__h1">{categoryId}</h1>
            <div className="cardContainer">
                {products.map((prod, index) => (
                    <CardComponent product={prod} key={index} />
                ))}
            </div>
        </>

    )
}