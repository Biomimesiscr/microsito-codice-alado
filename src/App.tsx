import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/layout/Layout";
import { InfographyLayout } from "./components/layout/InfographyLayout";
import { HomePage } from "./routes/HomePage";
import { NotFoundPage } from "./routes/NotFoundPage";
import { MenuPage } from "./routes/MenuPage";
import { SpeciesPage } from "./routes/SpeciesPage";
import { ContactPage } from "./routes/ContactPage";
import { MicroAvispa } from "./components/infographies/MicroAvispa";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route element={<InfographyLayout />}>
          <Route path="/micro-avispa" element={<MicroAvispa />} />
        </Route>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/species" element={<SpeciesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;