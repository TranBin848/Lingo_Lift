import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import "./App.css";
import NavBar from "./src/components/layout/NavBar";
import Home from "./src/pages/Home";
import Listening from "./src/pages/skills/Listening";
import Speaking from "./src/pages/skills/Speaking";
import Reading from "./src/pages/skills/Reading";
import Writing from "./src/pages/skills/Writing";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import UserPage from "./src/pages/UserPage";
import { AuthProvider } from "./src/context/AuthContext";
import FloatingChatButton from "./src/components/chat/FloatingChatButton";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Auth Routes - No NavBar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main Routes - With NavBar */}
          <Route
            path="/*"
            element={
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
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/listening" element={<Listening />} />
                    <Route path="/speaking" element={<Speaking />} />
                    <Route path="/reading" element={<Reading />} />
                    <Route path="/writing" element={<Writing />} />
                  </Routes>
                </Suspense>
                {/* Floating Chat Button - available on all pages */}
                <FloatingChatButton />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
