import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Shell from "./domain/shell/shell";
import Home from "./domain/shell/page/home/home";
import PurchaseOrder from "./domain/purchase-order/purchase-order";
import PurchaseRequest from "./domain/purchase-request/purchase-request";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      { path: "", element: <Home /> },
      { path: "requests", element: <PurchaseRequest /> },
      { path: "orders", element: <PurchaseOrder /> },
    ],
  },
]);

export function AppRoute() {
  return <RouterProvider router={router} />;
}
