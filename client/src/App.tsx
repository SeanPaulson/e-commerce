import { useState } from "react";
import "./app.scss";
import Button from "react-bootstrap/Button";
import NavbarComponent from "./components/navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarComponent />
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
