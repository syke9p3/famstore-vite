import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/shared/Navbar";
import ProductPage from "./pages/ProductPage";

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
        element: <Home />,
      },
      {
        path: '/products/:id',
        element: <ProductPage />,
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
