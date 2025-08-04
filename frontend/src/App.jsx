// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Dashboard from "./pages/Dashboard";
import DataView from "./pages/Dataview";
import LandingPage from "./pages/LandingPage";

function AppWrapper() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <>
      {!isLanding && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data" element={<DataView />} />
      </Routes>
      {!isLanding && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
