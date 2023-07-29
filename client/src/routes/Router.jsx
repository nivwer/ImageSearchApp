import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { NotFoundPage } from "../pages/NotFoundPage";
import { Navigation } from "../components/Navigation/Navigation";
import ImagesResults from "../components/Results/ImagesResults";

function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* HomePage. */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home/*" element={<Home />}>
          {/* Default images results. */}
          <Route path="" element={<ImagesResults />} />
          {/* Searched images results. */}
          <Route path="results" element={<ImagesResults />} />
        </Route>

        {/* About page. */}
        <Route path="/about" element={<About />} />

        {/* Page 404. */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
