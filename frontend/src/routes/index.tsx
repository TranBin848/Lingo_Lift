import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { ROUTES } from "../constants";

// Lazy load pages
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Home = lazy(() => import("../pages/Home"));
const Listening = lazy(() => import("../pages/skills/Listening"));
const Speaking = lazy(() => import("../pages/skills/Speaking"));
const Reading = lazy(() => import("../pages/skills/Reading"));
const Writing = lazy(() => import("../pages/skills/Writing"));

export const routes: RouteObject[] = [
  {
    path: ROUTES.LANDING,
    element: <LandingPage />,
  },
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.LISTENING,
    element: <Listening />,
  },
  {
    path: ROUTES.SPEAKING,
    element: <Speaking />,
  },
  {
    path: ROUTES.READING,
    element: <Reading />,
  },
  {
    path: ROUTES.WRITING,
    element: <Writing />,
  },
];
