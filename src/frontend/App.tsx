import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Home from "./pages/Home";
import Listening from "./pages/skills/Listening";
import Speaking from "./pages/skills/Speaking";
import Reading from "./pages/skills/Reading";
import Writing from "./pages/skills/Writing";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <NavBar />
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                Đang tải...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listening" element={<Listening />} />
              <Route path="/speaking" element={<Speaking />} />
              <Route path="/reading" element={<Reading />} />
              <Route path="/writing" element={<Writing />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
