import { Customers } from "./components/Customer/Customers";
import { Products } from "./components/Product/Products";
import { Stores } from "./components/Store/Stores";
import { Sales } from "./components/Sale/Sales";

const AppRoutes = [
  {
    index: true,
    element: <Customers />
  },
  {
    path: '/Customers',
    element: <Customers />
  },
  {
    path: '/Products',
    element: <Products />
  },
  {
    path: '/Stores',
    element: <Stores />
  },
   {
    path: '/Sales',
    element: <Sales/>
  },
];

export default AppRoutes;
