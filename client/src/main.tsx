import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const App = lazy(() => import("./App"));
const Product = lazy(() => import("./pages/product/App"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>todo</div>,
    children: [{}],
  },
  {
    path: "/product/",
    element: <Product />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div style={{fontStyle: 'bold',textAlign: 'center'}}>loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
