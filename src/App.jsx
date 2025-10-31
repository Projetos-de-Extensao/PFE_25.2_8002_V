import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import JobsFeedPage from './pages/Student/JobsFeedPage/JobsFeedPage.jsx';
import Myjobs from './pages/Professor/MyJobs/Myjobs.jsx';
import Login from './pages/Shared/Login/Login.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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