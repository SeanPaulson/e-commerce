import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./pages/error/Error";
import UserContext from "./components/UserContext";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./components/PrivateRoute";
import NavbarWrapper from "./components/NavbarWrapper";
import { getFeaturedProducts, getProductById, getProductsByCategory, getUserCart } from "./utils/fetchApi";
import Category from "./pages/category/Category";
import Cart from "./pages/cart/Cart";


const App = lazy(() => import("./App"));
const Product = lazy(() => import("./pages/product/App"));
const Settings = lazy(() => import("./pages/settings/Settings"));

const router = createBrowserRouter(
  [
    {
      element: <NavbarWrapper />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <App />,
          errorElement: <ErrorPage />,
          loader: async () => {
            return await getFeaturedProducts();
          }
        },
        {
          path: "/product/:id",
          element: <Product />,
          errorElement: <ErrorPage />,
          loader: async ({ params }) => {
            const id = params.id;
            if (id) {
              return await getProductById(id);
            }
          },
        },
        {
          path: "/product/category/:id",
          element: <Category />,
          errorElement: <ErrorPage />,
          loader: async ({ params }) => {
            const id = params.id;
            if (id) {
              return await getProductsByCategory(id);
            }
          }
        },
        {
          path: "/cart",
          element: <Cart />,
          errorElement: <ErrorPage />,
          loader: async () => {
            const res = await getUserCart();
            return res
          }
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
// loader: async ({ params }) => {
//   const id = params.id;
//   console.log(id)
//   if (id) {
//     const res = await getProductsByCategory(id);
//     console.log(res);
//     return res;
//   }
//   return null
// }