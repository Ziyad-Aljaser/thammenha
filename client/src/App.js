import "./App.css";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Estimation from "./pages/Estimation";
import Reports from "./pages/Reports";
import AboutUs from "./pages/AboutUs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";

// import { PrivateWrapper } from "./components/PrivateWrapper"; // Adjust the import if the name is different
import { AuthProvider } from "./contexts/AuthContext";

import './config/i18n';

function App() {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/estimation"
            element={
                <Estimation />
            }
          />
          <Route
            path="/reports"
            element={
                <Reports />
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </AuthProvider>
      <ScrollToTop />
    </>
  );
}

export default App;
