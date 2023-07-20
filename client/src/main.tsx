import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./pages/error/Error";

export type Users = {
  email_address: String,
  first_name: String,
  id: Number,
  last_name: String,
  phone: String
}

const App = lazy(() => import("./App"));
const Product = lazy(() => import("./pages/product/App"));

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
