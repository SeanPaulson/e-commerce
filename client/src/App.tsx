import "./app.scss";
import NavbarComponent from "./components/navbar/Navbar";
import ImgPreviewCircle from "./components/imgPreviewCircle/ImgPreviewCircle";
import CardComponent from "./components/card/CardComponent";
// import {useEffect} from 'react';

function App () {

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await fetch('/api/product/');
  //     const datajson = await data.json();

  //     console.log(datajson)
  //   }
  //   getData();
  // }, [])

  const arr = [0, 1, 2, 3, 4, 5];
  return (
    <>
      <NavbarComponent />
      <ImgPreviewCircle />
      <div className="cardContainer">
        {arr.map((index) => (
          <CardComponent key={index} />
        ))}
      </div>
    </>
  );
}

export default App;
