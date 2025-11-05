import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import JobsFeedPage from './pages/Student/JobsFeedPage/JobsFeedPage.jsx';
import Myjobs from './pages/Professor/MyJobs/Myjobs.jsx';
import Login from './pages/Shared/Login/Login.jsx';
import ErrorPage from "./pages/App/ErrorPage.jsx";
import PasswordReset from "./pages/Shared/PasswordReset/PasswordReset.jsx";
import JobsDetails from "./pages/Shared/JobsDetails/JobsDetails.jsx";
import CreateJobs from "./pages/Coordinator/CreateJobs/CreateJobs.jsx";
import ProfilePage from "./pages/Shared/ProfilePage/ProfilePage.jsx";


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
  },
  {
    path:"/reset",
    element: <PasswordReset/>,
  },
  {
  path:"/details",
  element: <JobsDetails />,
  },
  {
    path:"/create",
    element:<CreateJobs />
  },
  {
    path:"/myprofile",
    element:<ProfilePage />,
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}