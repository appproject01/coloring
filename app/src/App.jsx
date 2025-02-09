import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SearchPage from "./pages/SearchPage";
import Settings from "./pages/Settings";

export default function App() {
  const defaultProject = "drawing";

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${defaultProject}`} replace />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="/:project" element={<WelcomePage />} />
        <Route path="/:project/search" element={<SearchPage />} />
        <Route path="/:project/:book" element={<WelcomePage />} />
      </Routes>
    </HashRouter>
  );
}

// path="/:project
// path="/:project/:book"
// path="/:project/search
// path="/:project/details/
