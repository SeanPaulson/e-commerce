import "./app.scss";
import ImgPreviewCircle from "./components/imgPreviewCircle/ImgPreviewCircle";
import CardComponent from "./components/card/CardComponent";

// type Users = any;

function App () {
  console.log('render App')
  // }, [])

  const arr = [0, 1, 2, 3, 4, 5];
  return (
    <>
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
