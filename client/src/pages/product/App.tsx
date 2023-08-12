import "./app.scss";
import CarouselComponent from "../../components/carousel/Carousel";
import ProductDescription from "../../components/ProductDescription/ProductDescription";
import { useLoaderData } from "react-router";
import { LoaderData } from "../../utils/types";
import { getProductById } from "../../utils/fetchApi";


function App() {

  const product = useLoaderData() as LoaderData<typeof getProductById>;

  return (
    <div className="app__container">
      <CarouselComponent productImage={product.img_url} />
      <ProductDescription product={product}/>
    </div>
  );
}

export default App;
