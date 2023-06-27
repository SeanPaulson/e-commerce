import "./app.scss";
import NavbarComponent from "./components/navbar/Navbar";
import ImgPreviewCircle from "./components/imgPreviewCircle/ImgPreviewCircle";
import CardComponent from "./components/card/CardComponent";

function App() {
  const arr = [0, 1, 2, 3, 4, 5];
  return (
    <>
      <NavbarComponent />
      <ImgPreviewCircle />
      <div style={{display: 'flex', paddingTop: '2rem', flexWrap: 'wrap'}}>
        {arr.map((index) => (
          <CardComponent key={index} />
        ))}
      </div>
    </>
  );
}

export default App;
