import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./pages/error/Error";
import UserContext from "./components/UserContext";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./components/PrivateRoute";
import NavbarWrapper from "./components/NavbarWrapper";


const App = lazy(() => import("./App"));
const Product = lazy(() => import("./pages/product/App"));
const Settings = lazy(() => import("./pages/settings/Settings"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <NavbarWrapper />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <App />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/product",
          element: <Product />,
          errorElement: <ErrorPage />,
        },
        {
          element: <PrivateRoute />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: "/settings",
              element: <Settings />,
              errorElement: <ErrorPage />,
            },
          ]
        }
      ],
    },
  ],
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div style={{ fontStyle: "bold", textAlign: "center" }}>loading...</div>
      }
    >
      <UserContext>
        <RouterProvider router={router} />
        <Footer />
      </UserContext>
    </Suspense>
  </React.StrictMode>
);
