import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { ROUTES } from "../constants";
import { PlacementTestPage } from "../components/placement-test";

// Lazy load pages
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Home = lazy(() => import("../pages/Home"));
const Listening = lazy(() => import("../pages/skills/Listening"));
const Speaking = lazy(() => import("../pages/skills/Speaking"));
const Reading = lazy(() => import("../pages/skills/Reading"));
const Writing = lazy(() => import("../pages/skills/Writing"));
const WritingPracticePage = lazy(() => import("../pages/WritingPracticePage"));
const ProgressTest = lazy(() => import("../pages/ProgressTest"));
const FinalTest = lazy(() => import("../pages/FinalTest"));

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
  {
    path: ROUTES.WRITING_PRACTICE,
    element: <WritingPracticePage />,
  },
  {
    path: ROUTES.PLACEMENT_TEST,
    element: <PlacementTestPage />,
  },
  {
    path: ROUTES.PROGRESS_TEST,
    element: <ProgressTest />,
  },
  {
    path: ROUTES.FINAL_TEST,
    element: <FinalTest />,
  },
];
