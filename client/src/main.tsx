import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./pages/error/Error";
import { UserProfileType } from "./utils/types";
import ContextProvider from "./components/ContextProvider";

const App = lazy(() => import("./App"));
const Product = lazy(() => import("./pages/product/App"));

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
    path: "/product/",
    element: <Product />,
    errorElement: <ErrorPage />,
    children: [{}],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div style={{ fontStyle: "bold", textAlign: "center" }}>loading...</div>
      }
    >
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </Suspense>
  </React.StrictMode>
);
