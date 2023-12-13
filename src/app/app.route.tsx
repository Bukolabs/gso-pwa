import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Shell from "./domain/shell/shell";
import Home from "./domain/home/home";
import PurchaseOrder from "./domain/purchase-order/purchase-order";
import PurchaseRequest from "./domain/purchase-request/purchase-request";
import ListRequest from "./domain/purchase-request/list-request/list-request";
import NewRequest from "./domain/purchase-request/new-request/new-request";
import Bidder from "@domain/bidder/bidder";
import ListBidder from "@domain/bidder/list-bidder/list-bidder";
import NewBidder from "@domain/bidder/new-bidder/new-bidder";
import Item from "@domain/item/item";
import ListItem from "@domain/item/list-item/list-item";
import NewItem from "@domain/item/new-item/new-item";
import EditBidder from "@domain/bidder/edit-bidder/edit-bidder";
import EditItem from "@domain/item/edit-item/edit-item";
import ListUnit from "@domain/item/unit/list-unit/list-unit";
import EditUnit from "@domain/item/unit/edit-unit/edit-unit";
import ListBrand from "@domain/item/brand/list-brand/list-brand";
import EditBrand from "@domain/item/brand/edit-brand/edit-brand";

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
          {
            path: "new",
            element: <NewBidder />,
          },
          {
            path: ":bidderId",
            element: <EditBidder />,
          },
        ],
      },
      {
        path: "item",
        element: <Item />,
        children: [
          {
            path: "",
            element: <ListItem />,
          },
          {
            path: "new",
            element: <NewItem />,
          },
          {
            path: "unit",
            element: <ListUnit />,
          },
          {
            path: "unit/:unitId",
            element: <EditUnit />,
          },
          {
            path: "brand",
            element: <ListBrand />,
          },
          {
            path: "brand/:brandId",
            element: <EditBrand />,
          },
          {
            path: ":itemId",
            element: <EditItem />,
          },
        ],
      },
    ],
  },
]);

export function AppRoute() {
  return <RouterProvider router={router} />;
}
