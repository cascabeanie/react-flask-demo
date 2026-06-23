import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/home/Home.jsx";
/* import jsonMapData from "./data/uk-county-map.json"; */

// To be deleted
/* console.log(jsonMapData); */

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        /* loader: async () => {
          return jsonMapData;
        }, */
        Component: Home,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
