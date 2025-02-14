import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import SearchPage from "./pages/SearchPage";
import { Settings } from "./pages/Settings";
import { DefaultDetailsPage } from "./pages/DefaultDetailsPage";
import { ApplicationProvider } from "./context/ApplicationContext";

export default function App() {
  const defaultProject = "/drawing/all";

  return (
    <ApplicationProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to={defaultProject} replace />} />
          <Route path="/settings" element={<Settings />} />
          /
          <Route path="/:project/:book" element={<WelcomePage />} />
          <Route path="/:project/:book/:mode" element={<SearchPage />} />
          <Route
            path="/:project/:book/:mode/:id"
            element={<DefaultDetailsPage />}
          />
        </Routes>
      </HashRouter>
    </ApplicationProvider>
  );
}

// path="/:project
// path="/:project/:book"
// path="/:project/search
// path="/:project/details/

// path="/:project/:book/:mode/:id"    <  this is the way
