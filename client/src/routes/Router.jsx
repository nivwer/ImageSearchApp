import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { NotFoundPage } from "../pages/NotFoundPage";
import { Navigation } from "../components/Navigation/Navigation";
import SearchResults from "../components/Search/SearchResults";

function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home/*" element={<Home />}>
          <Route path="" element={<SearchResults />} />
          <Route path="results" element={<SearchResults />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
