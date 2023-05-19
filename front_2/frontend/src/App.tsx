import React from "react";
import "./normalize.css";
// import { ReactKeycloakProvider } from "@react-keycloak/web";
import { PublicPage } from "./pages/PublicPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrivatePage } from "./pages/PrivatePage";
// import keycloak from "./auth/keycloak";

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

// initOptions={{ onLoad: "login-required" }}
export const App = () => {
  return (
    <div className="App">
      {/* <ReactKeycloakProvider authClient={keycloak}> */}
      <h1>React APP</h1>
      <RouterProvider router={router} />
      {/* </ReactKeycloakProvider> */}
    </div>
  );
};
