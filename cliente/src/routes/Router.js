import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
// const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Clientes = lazy(() => import("../views/ui/Tables"));
const ClientesEncuestados = lazy(() => import("../views/ui/Encuestados"));
const Todos = lazy(() => import("../views/ui/Todos"));
const Agregar = lazy(() => import("../views/ui/Agregar"));
const Encuesta = lazy(() => import("../views/ui/Encuesta"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/seguimiento" /> },
      { path: "/seguimiento", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      // { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/clientes", exact: true, element: <Clientes /> },
      { path: "/todos", exact: true, element: <Todos /> },
      { path: "/clientesEncuestados", exact: true, element: <ClientesEncuestados /> },
      { path: "/agregar", exact: true, element: <Agregar /> },
      { path: "/encuesta", exact: true, element: <Encuesta /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
