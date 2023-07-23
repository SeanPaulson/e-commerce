import React, { lazy, Suspense, createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./pages/error/Error";
import { getSessionStatus } from "./utils/fetchApi";

export type Users = {
  email_address: String,
  first_name: String,
  id: Number,
  last_name: String,
  phone: String
}

const App = lazy(() => import("./App"));
const Product = lazy(() => import("./pages/product/App"));


//TODO use getSessionStatus() to check for user session and set userAuthContext
// const userAuthContext = createContext(null);

// const [user, setUser] = useState<Users | null>(null);

(async () => {
  const isLoggedIn = await getSessionStatus().catch(e => {console.log(e)})
console.log(isLoggedIn)
})();

const userLoader = async function () {
  const data = await fetch('/api/users/');
  const users:Array<Users> = await data.json();
  return users;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: userLoader,
    children: [{}],
  },
  {
    path: "/product/",
    element: <Product />,
    errorElement: <ErrorPage />,
    children: [{}],
  },
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div style={{fontStyle: 'bold',textAlign: 'center'}}>loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
