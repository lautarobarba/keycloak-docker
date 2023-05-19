import React from "react";
import { PublicPage } from "./pages/PublicPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrivatePage } from "./pages/PrivatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicPage />,
  },
  {
    path: "/admin",
    element: <PrivatePage />,
  },
]);

export const App = () => {
  return (
    <div className="App">
      <h1>React APP</h1>
      <RouterProvider router={router} />
    </div>
  );
};
