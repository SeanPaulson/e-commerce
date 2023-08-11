import "./app.scss";
import ImgPreviewCircle from "./components/imgPreviewCircle/ImgPreviewCircle";
import CardComponent from "./components/card/CardComponent";
import Hero from "./components/hero/Hero";
import { useContext } from "react";
import { ContextApp } from "./components/UserContext";
import { useLoaderData } from "react-router";
import { LoaderData } from "./utils/types";
import { getFeaturedProducts } from "./utils/fetchApi";


function App() {

  const { state } = useContext(ContextApp);
  const featuredProducts = useLoaderData() as LoaderData<typeof getFeaturedProducts>;



  const arr = [0, 1, 2, 3, 4, 5];
  return (
    <>
      {Object.keys(state.userProfile).length != 0
        &&
        <div className="welcome">
          <h3>Welcome back, {state.userProfile.first_name}</h3>
        </div>}
      <Hero />
      <ImgPreviewCircle />
      <div className="cardContainer">
        {arr.map((index) => (
          <CardComponent product={featuredProducts[index]} key={index} />
        ))}
      </div>
    </>
  );
}

export default App;
