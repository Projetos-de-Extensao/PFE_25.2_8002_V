import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import JobsFeedPage from './pages/Student/JobsFeedPage/JobsFeedPage.jsx';
import Myjobs from './pages/Professor/MyJobs/Myjobs.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <JobsFeedPage />,
  },
  {
    path: "/myjobs",
    element: <Myjobs />,
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}