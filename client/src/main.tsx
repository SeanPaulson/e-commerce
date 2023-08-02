import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./pages/error/Error";
import { UserProfileType } from "./utils/types";
import ContextProvider from "./components/ContextProvider";
import NavbarComponent from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const App = lazy(() => import("./App"));
const Product = lazy(() => import("./pages/product/App"));
const Settings = lazy(() => import("./pages/settings/Settings"));

const userLoader = async function () {
  const data = await fetch("/api/users/");
  const users: Array<UserProfileType> = await data.json();
  return users;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: userLoader,
    children: [{}],
  },
  {
    path: "/product",
    element: <Product />,
    errorElement: <ErrorPage />,
    children: [{}],
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div style={{ fontStyle: "bold", textAlign: "center" }}>loading...</div>
      }
    >
      <ContextProvider>
        <NavbarComponent />
        <RouterProvider router={router} />
        <Footer />
      </ContextProvider>
    </Suspense>
  </React.StrictMode>
);
