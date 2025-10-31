import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import JobsFeedPage from './pages/Student/JobsFeedPage/JobsFeedPage.jsx';
import Myjobs from './pages/Professor/MyJobs/Myjobs.jsx';
import Login from './pages/Shared/Login/Login.jsx';
import ErrorPage from "./pages/App/ErrorPage.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/myjobs",
    element: <Myjobs />,
  },
  {
    path:"/feed",
    element: <JobsFeedPage />,
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}