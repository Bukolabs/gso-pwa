import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
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
import EditRequest from "@domain/purchase-request/edit-request/edit-request";
import Account from "@domain/account/account";
import ListAccount from "@domain/account/list-account/list-account";
import NewAccount from "@domain/account/new-account/new-account";
import EditAccount from "@domain/account/edit-account/edit-account";
import MainShell from "@domain/shell/main-shell/main-shell";
import AuthShell from "@domain/shell/auth-shell/auth-shell";
import Login from "@domain/login/login";
import { ProtectedRoute } from "@core/authentication/protected-route";
import ListOrder from "@domain/purchase-order/list-order/list-order";
import NewOrder from "@domain/purchase-order/new-order/new-order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainShell />,
    children: [
      { path: "login", element: <Login /> },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <AuthShell />
          </ProtectedRoute>
        ),
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
              {
                path: ":requestId",
                element: <EditRequest />,
              },
            ],
          },
          {
            path: "order",
            element: <PurchaseOrder />,
            children: [
              {
                path: "",
                element: <ListOrder />,
              },
              {
                path: "new",
                element: <NewOrder />,
              },
            ],
          },
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
            path: "account",
            element: <Account />,
            children: [
              {
                path: "",
                element: <ListAccount />,
              },
              {
                path: "new",
                element: <NewAccount />,
              },
              {
                path: ":bidderId",
                element: <EditAccount />,
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
    ],
  },
]);

export function AppRoute() {
  return <RouterProvider router={router} />;
}
