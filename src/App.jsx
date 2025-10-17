import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobsFeedPage from './pages/Student/JobsFeedPage/JobsFeedPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobsFeedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;