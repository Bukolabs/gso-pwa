import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Shell from "./domain/shell/shell";
import Home from "./domain/home/home";
import PurchaseOrder from "./domain/purchase-order/purchase-order";
import PurchaseRequest from "./domain/purchase-request/purchase-request";
import ListRequest from "./domain/purchase-request/list-request/list-request";
import NewRequest from "./domain/purchase-request/new-request/new-request";
import Bidder from "@domain/bidder/bidder";
import ListBidder from "@domain/bidder/list-bidder/list-bidder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "request",
        element: <PurchaseRequest />,
        children: [
          {
            path: "",
            element: <ListRequest />,
          },
          {
            path: "new",
            element: <NewRequest />,
          },
        ],
      },
      { path: "order", element: <PurchaseOrder /> },
      {
        path: "bidder",
        element: <Bidder />,
        children: [
          {
            path: "",
            element: <ListBidder />,
          },
        ],
      },
    ],
  },
]);

export function AppRoute() {
  return <RouterProvider router={router} />;
}
