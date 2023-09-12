import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./pages/error/Error";
import UserContext from "./components/UserContext";
import Footer from "./components/footer/Footer";
import { addItemToCart, getFeaturedProducts, getOrderById, getProductById, getProductsByCategory, getUserCart, getUserOrderHistory, updateUserProfile } from "./utils/fetchApi";
import { UserProfileType } from "./utils/types";


//TODO change scss files to modules *.modules.scss

const App = lazy(() => import("./App"));
const Product = lazy(() => import("./pages/product/App"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Order = lazy(() => import("./pages/order/Order"));
const OrderRouter = lazy(() => import("./subRouters/OrderRouter"));
const PrivateRoute = lazy(() => import("./subRouters/PrivateRoute"));
const Category = lazy(() => import("./pages/category/Category"));
const NavbarWrapper = lazy(() => import("./components/NavbarWrapper"));



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
          id: 'cart',
          action: async ({ request }) => {
            let formData = await request.formData();
            let quantity = Number(formData.get('quantity'));
            const id = Number(formData.get('id'));
            return await addItemToCart(id, quantity);

          },
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
              action: async ({ request }) => {
                let formData: Partial<UserProfileType> = Object.fromEntries(await request.formData());
                return await updateUserProfile(formData);
              },
            },
            {
              path: "/orders",
              element: < OrderRouter />,
              errorElement: <ErrorPage />,
              loader: async () => {
                const res = await getUserOrderHistory();
                return res;
              },
              children: [
                {
                  path: "/orders/:id",
                  element: <Order />,
                  errorElement: <ErrorPage />,
                  loader: async (args) => {
                    const orderItems = await getOrderById(args);
                    return orderItems;
                  },
                  shouldRevalidate: ({
                    currentParams,
                    nextParams,
                    defaultShouldRevalidate
                  }) => {
                    if (currentParams === nextParams) {
                      return false;
                    }
                    return defaultShouldRevalidate;
                  },
                }
              ]
            },

          ]
        }
      ],
    },
  ],
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
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
);