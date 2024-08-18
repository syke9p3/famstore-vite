import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import CreateProduct from './pages/CreateProduct';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: '/products/:id',
        element: <ProductPage />,
      },
      {
        path: '/products/create',
        element: <CreateProduct />,
      },
    ]
  },
]);


const App = () => {
  return (
    <Theme>
      <div id="app">
        <RouterProvider router={router} />
      </div>
    </Theme>
  );
}

export default App;
